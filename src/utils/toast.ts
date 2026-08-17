import { toast } from "react-toastify";

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    }),

  error: (message: string) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    }),

  warning: (message: string) =>
    toast.warning(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    }),

  info: (message: string) =>
    toast.info(message, {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
    }),
};