import { OAuth2Client } from 'google-auth-library';
import { ENV } from '../config/env.js';

let googleClient = null;

const getGoogleClient = () => {
  if (!googleClient && ENV.GOOGLE_CLIENT_ID) {
    googleClient = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);
  }
  return googleClient;
};

/**
 * Verify Google ID Token received from frontend Google Identity Services
 * @param {string} idToken
 * @returns {Promise<{googleId: string, email: string, name: string, picture: string}>}
 */
export const verifyGoogleIdToken = async (idToken) => {
  if (!ENV.GOOGLE_CLIENT_ID) {
    throw new Error(
      'GOOGLE_CLIENT_ID is not configured on the server. Please set GOOGLE_CLIENT_ID in server/.env to enable Google Authentication.'
    );
  }

  const client = getGoogleClient();
  const ticket = await client.verifyIdToken({
    idToken,
    audience: ENV.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.email) {
    throw new Error('Invalid Google token payload');
  }

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture || '',
  };
};
