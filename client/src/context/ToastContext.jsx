import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-start p-3.5 rounded-xl shadow-elevated border text-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
              item.type === 'success'
                ? 'bg-white dark:bg-slate-900 border-emerald-500/30 text-slate-800 dark:text-slate-100'
                : item.type === 'error'
                ? 'bg-white dark:bg-slate-900 border-rose-500/30 text-slate-800 dark:text-slate-100'
                : item.type === 'warning'
                ? 'bg-white dark:bg-slate-900 border-amber-500/30 text-slate-800 dark:text-slate-100'
                : 'bg-white dark:bg-slate-900 border-brand-500/30 text-slate-800 dark:text-slate-100'
            }`}
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500" />}
              {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-brand-500" />}
            </div>
            <div className="flex-1 font-medium leading-tight pt-0.5">{item.message}</div>
            <button
              onClick={() => removeToast(item.id)}
              className="flex-shrink-0 ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
