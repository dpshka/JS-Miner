import { createGlobalState, useStorage } from "@vueuse/core";
import type { VueI18n } from "vue-i18n";

import type { Toast } from "@/types/toast";
import { useHelpers } from "@/utils/helpers";
import i18n from "@/utils/i18n";

import { useGoogleEvents } from "./useGoogleEvents";

const { isEqual } = useHelpers();
const { t, te } = (i18n.global as unknown as VueI18n) || i18n;
const { gtaEvent } = useGoogleEvents();

export const useToastStore = createGlobalState(() =>
  useStorage<Toast[]>("toasts", [])
);

export function useToast() {
  const toasts = useToastStore();

  function addToast(toast: Toast, timer = 5000) {
    toasts.value = toasts.value.concat(toast);
    setTimeout(() => removeToast(toast), timer);
  }

  function removeToast(toast: Toast) {
    toasts.value = toasts.value.filter((t) => !isEqual(t.id, toast.id));
  }

  function clearToasts() {
    toasts.value = [];
  }

  async function handleErrorAsToast(
    callback: (...args: any[]) => Promise<any>,
    handleSuccess = false,
    actualRoute = ""
  ) {
    try {
      const response = await callback();
      if (
        handleSuccess &&
        response.result?.success &&
        response.result?.message
      ) {
        addToast({
          id: Math.random().toString(),
          message: te(response.result?.message)
            ? t(response.result?.message)
            : response.result?.message,
          type: "success",
        });
      }
      return response;
    } catch (error: any) {
      addToast({
        id: Math.random().toString(),
        message: te(error.body.meta.errorMessage)
          ? t(error.body.meta.errorMessage)
          : error.body.meta.errorMessage,
        type: "error",
      });
      // Google Tag Manager & Analytics Events START
      if (actualRoute === "pay") {
        gtaEvent({
          event: "GAEvent",
          eventCategory: "Error",
          eventAction: "Payment Form",
          eventLabel: te(error.body.meta.errorMessage)
            ? t(error.body.meta.errorMessage)
            : error.body.meta.errorMessage,
        });
        gtaEvent({
          event: "error",
          errorCategory: "Payment Form",
          errorType: te(error.body.meta.errorMessage)
            ? t(error.body.meta.errorMessage)
            : error.body.meta.errorMessage,
        });
      } else {
        gtaEvent({
          event: "GAEvent",
          eventCategory: "Error",
          eventAction: "Network",
          eventLabel: te(error.body.meta.errorMessage)
            ? t(error.body.meta.errorMessage)
            : error.body.meta.errorMessage,
        });
        gtaEvent({
          event: "error",
          errorCategory: "Network",
          errorType: te(error.body.meta.errorMessage)
            ? t(error.body.meta.errorMessage)
            : error.body.meta.errorMessage,
        });
      }
      // Google Tag Manager & Analytics Events END
      return false;
    }
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    handleErrorAsToast,
  };
}
