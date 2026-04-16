"use client";

import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

let toastCount = 0;

const listeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];

function notifyListeners() {
  listeners.forEach((listener) => listener([...toasts]));
}

export function toast({ title, description, variant = "default" }: Omit<Toast, "id">) {
  const id = String(++toastCount);
  toasts = [...toasts, { id, title, description, variant }];
  notifyListeners();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 4000);
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useState(() => {
    listeners.push(setCurrentToasts);
    return () => {
      const idx = listeners.indexOf(setCurrentToasts);
      if (idx > -1) listeners.splice(idx, 1);
    };
  });

  return { toast, toasts: currentToasts };
}
