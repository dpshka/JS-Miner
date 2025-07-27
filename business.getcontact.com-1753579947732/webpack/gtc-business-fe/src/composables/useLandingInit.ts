import { useCookies } from "@vueuse/integrations/useCookies";

import { callWithToken, Service } from "@/api";

export function useLandingInit() {
  const { set, get } = useCookies();
  async function getLandingInit() {
    const data = await callWithToken(Service.getLandingInit);
    return data.result;
  }
  async function getConsentMode() {
    if (typeof get("cookieConsent") == "boolean") {
      return get("cookieConsent");
    } else {
      const data = await callWithToken(Service.getConsentMode);

      set("cookieConsent", data.result.status, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      return data.result.status;
    }
  }

  return {
    getLandingInit,
    getConsentMode,
  };
}
