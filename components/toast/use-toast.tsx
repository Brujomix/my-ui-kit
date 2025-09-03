import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warn";

type UseToastParams = {
  type: ToastType;
  message: string;
  options?: ToastOptions;
};

export function useToast() {
  const showToast = ({ type, message, options = {} }: UseToastParams) => {

    const toastId = crypto.randomUUID();

    const toastOptions: ToastOptions = {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      toastId,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      case "info":
        toast.info(message, toastOptions);
        break;
      case "warn":
        toast.warn(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  };

  return showToast;
}
