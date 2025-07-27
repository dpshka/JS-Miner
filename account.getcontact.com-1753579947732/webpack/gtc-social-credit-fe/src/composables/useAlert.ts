import { createGlobalState, useSessionStorage } from "@vueuse/core";
import type { VueI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import i18n from "@/utils/i18n";

const { t, te } = (i18n.global as unknown as VueI18n) || i18n;

type Alert = {
  display?: string;
  title?: string;
  message?: string;
  type?: "warning" | "error" | "success";
  button?: object;
  page?: any;
  warning?: string;
};

export const useAlertStore = createGlobalState(() =>
  useSessionStorage<Alert>("alert", {})
);

export function useAlert() {
  const route = useRoute();
  const alert = useAlertStore();

  function setAlert(newAlert: Alert) {
    alert.value = newAlert;
    window.scrollTo(0, 0);
  }

  function removeAlert(force = false, routeName: any = "") {
    if (!routeName && route !== undefined) {
      routeName = route.name;
    }

    if (alert.value.page === routeName || force) {
      alert.value = {};
    }
  }

  async function handleErrorAsAlert(
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
        setAlert({
          message: te(response.result?.message)
            ? t(response.result?.message)
            : response.result?.message,
          type: "success",
          page: route.name,
        });
      }
      return response;
    } catch (error: any) {
      setAlert({
        message: te(error.body.meta.errorMessage)
          ? t(error.body.meta.errorMessage)
          : error.body.meta.errorMessage,
        type: "error",
        page: route.name,
      });
      return false;
    }
  }

  return {
    alert,
    setAlert,
    removeAlert,
    handleErrorAsAlert,
  };
}
