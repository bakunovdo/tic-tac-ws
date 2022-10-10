import { createEffect } from "effector";
import { toast, ToastOptions } from "react-toastify";

type ToastEffectOptions = string | { content: string; options: ToastOptions };

const baseOptions: ToastOptions = {
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  autoClose: 1500,
};

export const notifyFx = createEffect((params: ToastEffectOptions) => {
  if (typeof params === "string") {
    toast(params, baseOptions);
    return;
  }

  toast(params.content, { ...baseOptions, ...params.options });
});
