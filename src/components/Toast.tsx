import React, { useEffect } from 'react';
import { CheckCircle2, Heart, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'favorite';
  text: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#171714] text-[#F5F1E8] border border-[#2A2A24] shadow-2xl max-w-sm">
        {toast.type === 'cart' ? (
          <CheckCircle2 className="w-5 h-5 text-[#D9A928] shrink-0" />
        ) : (
          <Heart className="w-5 h-5 text-[#A94D32] fill-[#A94D32] shrink-0" />
        )}
        <p className="text-xs sm:text-sm font-medium font-sans flex-1">
          {toast.text}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
