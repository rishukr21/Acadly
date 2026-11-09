import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  withCredentials: true, // Send and receive HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent response data handling and error parsing
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorData = error.response?.data;
    const message =
      errorData?.message || error.message || 'An unexpected error occurred. Please try again.';

    // Create normalized error
    const customError = new Error(message);
    customError.statusCode = error.response?.status;
    customError.errors = errorData?.errors;
    customError.raw = errorData;

    return Promise.reject(customError);
  }
);

export default api;
