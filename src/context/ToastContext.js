import { createContext, useState, useContext } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setMessage(message);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <Toast open={open} message={message} handleClose={handleClose} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
