import { createEffect } from "effector";
import { toast, ToastOptions } from "react-toastify";

type ToastEffectOptions = string | { content: string; options: ToastOptions };

export const notifyFx = createEffect((params: ToastEffectOptions) => {
  if (typeof params === "string") {
    toast(params);
    return;
  }

  toast(params.content, params.options);
});
