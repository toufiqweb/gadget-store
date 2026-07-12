"use client";

import React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { ToastType } from "../../contexts/ToastContext";

interface ToastProps {
  toast: {
    id: string;
    message: string;
    type: ToastType;
  };
  onClose: () => void;
}

const toastStyles = {
  success: "bg-[var(--primary)] border-l-4 border-green-500 text-white shadow-xl border-y border-r border-[var(--secondary)]",
  error: "bg-[var(--primary)] border-l-4 border-red-500 text-white shadow-xl border-y border-r border-[var(--secondary)]",
  info: "bg-[var(--primary)] border-l-4 border-blue-500 text-white shadow-xl border-y border-r border-[var(--secondary)]",
  warning: "bg-[var(--primary)] border-l-4 border-[var(--ternary)] text-white shadow-xl border-y border-r border-[var(--secondary)]",
};

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-400" />,
  error: <AlertCircle className="w-5 h-5 text-red-400" />,
  info: <Info className="w-5 h-5 text-blue-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-[var(--ternary)]" />,
};

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  return (
    <div
      className={`flex items-center p-4 min-w-[300px] max-w-md rounded-lg ${toastStyles[toast.type]} transition-all duration-300 animate-in slide-in-from-right-4 fade-in`}
      role="alert"
    >
      <div className="flex-shrink-0">{icons[toast.type]}</div>
      <div className="ml-3 text-sm font-medium mr-4 leading-snug">{toast.message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 inline-flex h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
