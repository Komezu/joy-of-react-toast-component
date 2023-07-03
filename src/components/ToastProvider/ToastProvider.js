import React from 'react';

import useKeydown from '../../hooks/use-keydown.hook';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(
    (message, variant) => {
      const newToast = {
        id: Math.random(),
        message,
        variant,
      };

      setToasts([...toasts, newToast]);
    },
    [toasts]
  );

  const dismissToast = React.useCallback(
    (id) => {
      const nextToasts = toasts.filter((element) => {
        return element.id !== id;
      });

      setToasts(nextToasts);
    },
    [toasts]
  );

  const clearAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown('Escape', clearAllToasts);

  const value = React.useMemo(() => {
    return { toasts, addToast, dismissToast };
  }, [toasts, addToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
