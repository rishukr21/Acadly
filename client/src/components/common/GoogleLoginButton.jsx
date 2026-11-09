import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Info } from 'lucide-react';
import Modal from './Modal';

export const GoogleLoginButton = ({ text = 'continue_with' }) => {
  const { googleLogin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleCredentialResponse = async (response) => {
    if (!response.credential) return;
    try {
      setLoading(true);
      const user = await googleLogin(response.credential);
      toast.success(`Welcome, ${user.name}!`);
      if (user.onboardingCompleted) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      toast.error(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!googleClientId) return;

    const interval = setInterval(() => {
      if (window.google?.accounts?.id && buttonRef.current) {
        clearInterval(interval);
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleCredentialResponse,
            auto_select: false,
          });

          window.google.accounts.id.renderButton(buttonRef.current, {
            theme: document.documentElement.classList.contains('dark') ? 'filled_black' : 'outline',
            size: 'large',
            width: '100%',
            text,
            shape: 'rectangular',
          });
        } catch (e) {
          console.error('Google button render error:', e);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [googleClientId, text]);

  if (!googleClientId) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowConfigModal(true)}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 font-medium text-sm transition-all duration-200 shadow-subtle group"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 ml-auto">
            Config
          </span>
        </button>

        <Modal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          title="Google OAuth Configuration"
        >
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                Google OAuth is fully integrated in both client and server code, but requires your
                Google Client ID in your local environment.
              </div>
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100 mb-1">
                To enable live Google Sign-In:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <li>Create an OAuth 2.0 Client ID in Google Cloud Console.</li>
                <li>Add <code className="text-brand-600 bg-brand-50 dark:bg-brand-950 px-1 py-0.5 rounded">http://localhost:5173</code> to Authorized JavaScript origins.</li>
                <li>Paste your client ID in <code className="text-brand-600 bg-brand-50 dark:bg-brand-950 px-1 py-0.5 rounded">client/.env</code> as <code className="font-mono">VITE_GOOGLE_CLIENT_ID</code>.</li>
                <li>Paste your client ID & secret in <code className="text-brand-600 bg-brand-50 dark:bg-brand-950 px-1 py-0.5 rounded">server/.env</code>.</li>
              </ol>
            </div>
            <div className="pt-2">
              <p className="text-xs text-slate-500">
                You can currently test registration and login with any email and password!
              </p>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div className="w-full relative min-h-[40px] flex justify-center">
      {loading && (
        <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 flex items-center justify-center z-10 text-xs font-medium">
          Signing in with Google...
        </div>
      )}
      <div ref={buttonRef} className="w-full flex justify-center" />
    </div>
  );
};

export default GoogleLoginButton;
