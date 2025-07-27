import { createGlobalState, useSessionStorage } from "@vueuse/core";
import type { VueI18n } from "vue-i18n";
import { RouteRecordName, useRoute } from "vue-router";

import type { Alert, Callback } from "@/types/alert";
import i18n from "@/utils/i18n";

import { useGoogleEvents } from "./useGoogleEvents";

const { t, te } = (i18n.global as unknown as VueI18n) || i18n;
const { gtaEvent } = useGoogleEvents();

// The code block below allows you to use different themes for specific error messages.
const customMessages: Record<string, string>[] = [
  {
    "640070": "success",
  },
];

export const useAlertStore = createGlobalState(() =>
  useSessionStorage<Alert[]>("alerts", [])
);

export function useAlert() {
  const route = useRoute();
  const alerts = useAlertStore();

  function setAlert(newAlert: Alert) {
    alerts.value.push(newAlert);
    window.scrollTo(0, 0);
  }

  function removeAlert(
    force = false,
    routeName: RouteRecordName | null | undefined = ""
  ) {
    if (!routeName && route !== undefined) {
      routeName = route.name;
    }

    if (force || routeName === route.name) {
      alerts.value = [];
    }
  }

  async function handleErrorAsAlert(
    callback: (...args: object[]) => Promise<Callback>,
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
        // Google Tag Manager & Analytics Events START
        if (actualRoute === "callcard") {
          gtaEvent({
            event: "GAEvent",
            eventCategory: "Create Call Card",
            eventAction: "Success",
            eventLabel: "",
          });
          gtaEvent({
            event: "createCallCard",
            state: "Success",
          });
        }
        // Google Tag Manager & Analytics Events END
      }
      return response;
    } catch (error: any) {
      let errorType;
      if (typeof customMessages[0][error.body.meta.errorCode] !== "undefined") {
        errorType = customMessages[0][error.body.meta.errorCode];
      } else {
        errorType = "error";
      }
      setAlert({
        message: te(error.body.meta.errorMessage)
          ? t(error.body.meta.errorMessage)
          : error.body.meta.errorMessage,
        type: errorType,
        page: route.name,
      });
      // Google Tag Manager & Analytics Events START
      if (actualRoute === "login") {
        gtaEvent({
          event: "GAEvent",
          eventCategory: "Error",
          eventAction: "Login",
          eventLabel: te(error.body.meta.errorMessage)
            ? t(error.body.meta.errorMessage)
            : error.body.meta.errorMessage,
        });
        gtaEvent({
          event: "error",
          errorCategory: "Login",
          errorType: te(error.body.meta.errorMessage)
            ? t(error.body.meta.errorMessage)
            : error.body.meta.errorMessage,
        });
      } else if (actualRoute === "callcard") {
        gtaEvent({
          event: "GAEvent",
          eventCategory: "Create Call Card",
          eventAction: "Error",
          eventLabel: "",
        });
        gtaEvent({
          event: "createCallCard",
          state: "Error",
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
    alerts,
    setAlert,
    removeAlert,
    handleErrorAsAlert,
  };
}
