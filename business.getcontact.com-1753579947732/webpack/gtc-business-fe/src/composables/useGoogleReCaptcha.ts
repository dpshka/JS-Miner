import { useReCaptcha } from "vue-recaptcha-v3";

import json from "../api/recaptcha.json";

export const isRecaptchaActive = !!(json.key && json.pages.length);

export const recaptchaKey = isRecaptchaActive ? json.key : null;

export function useGoogleReCaptcha() {
  const { executeRecaptcha, recaptchaLoaded }: any = isRecaptchaActive
    ? useReCaptcha()
    : {};

  const reCaptcha = async (endpoint: never) => {
    if (isRecaptchaActive && json.pages.includes(endpoint)) {
      await recaptchaLoaded();
      return await executeRecaptcha(endpoint);
    } else return "none";
  };

  return { reCaptcha };
}
