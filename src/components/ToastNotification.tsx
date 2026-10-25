import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 bg-[#2D2326] text-white px-4 py-3 rounded-2xl shadow-xl border border-white/20 text-xs animate-slideUp w-full"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#E8C5C8] shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-[#D89FA9] shrink-0" />
            )}
            <span className="truncate">{toast.message}</span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/60 hover:text-white p-1 shrink-0"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
