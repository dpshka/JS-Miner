import { createGlobalState, useStorage } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";
import { computed } from "vue";

import { callWithToken, Service } from "@/api";
import { useAlert } from "@/composables/useAlert";
import { useGoogleEvents } from "@/composables/useGoogleEvents";
import { useHelpers } from "@/utils/helpers";

const { isEmpty } = useHelpers();
const { gtaEvent } = useGoogleEvents();

type Login = {
  email: string;
  password: string;
};

let loginInterval: any;

// check token every second
const LOGIN_INTERVAL_CHECK = 1000;

export const useLoggedInUser = createGlobalState<any>(() =>
  useStorage("loggedInUser", {})
);

export function useLogin() {
  const { get, set, remove } = useCookies(["token", "companyStatus"]);
  const { removeAlert } = useAlert();

  const loggedInUser = useLoggedInUser();
  const isLoggedIn = computed(
    () => !isEmpty(loggedInUser.value) && get("token")
  );

  function lightLogout() {
    remove("token");
    remove("tokenEndsAt");
    remove("callbackToken");
    remove("callbackForgotPassToken");
    remove("companyStatus");
    loggedInUser.value = null;
  }

  async function logout(callback?: () => void) {
    try {
      if (isTokenStillValid()) await callWithToken(Service.getSignOut);
    } finally {
      lightLogout();
      loggedInUser.value = null;
      removeAlert();

      if (callback) {
        callback();
      }
    }
  }

  function isTokenStillValid() {
    if (!get("token")) {
      return false;
    }
    const tokenEndsAt = get("tokenEndsAt");
    if (!tokenEndsAt) {
      return false;
    }
    const now = new Date();
    return now.getTime() < new Date(tokenEndsAt).getTime();
  }

  async function login(values: Login, force = false) {
    if (isTokenStillValid() && !force) {
      return;
    }
    const res = await Service.postLogin({ body: values });

    const tokenInterval =
      (res.result?.businessLandingApiToken?.expiresAt || 0) * 1000;
    const token = res.result?.businessLandingApiToken?.token;

    if (!token) {
      return;
    }

    loggedInUser.value = res.result?.businessCompany;

    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + tokenInterval);

    set("token", token, {
      expires: expireDate,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    set("tokenEndsAt", expireDate.toISOString(), {
      expires: expireDate,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    set("popupTerms", 1, {
      expires: expireDate,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    // Google Tag Manager & Analytics Events START
    const userPlatform =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? "mobile"
        : "desktop";

    gtaEvent({
      event: "GAEvent",
      eventCategory: "Login",
      eventAction: "Success",
      eventLabel: userPlatform,
    });
    gtaEvent({
      event: "login",
      state: "Success",
      platform: userPlatform,
    });
    // Google Tag Manager & Analytics Events END

    return true;
  }

  function stopTokenTimer() {
    clearInterval(loginInterval);
  }

  function startTokenTimer({ onLogout }: { onLogout?: () => void }) {
    stopTokenTimer();
    loginInterval = setInterval(async () => {
      if (!isTokenStillValid()) {
        stopTokenTimer();
        await logout(onLogout);
      } else {
        console.debug("token is still valid");
      }
    }, LOGIN_INTERVAL_CHECK);
  }

  return {
    login,
    logout,
    lightLogout,
    stopTokenTimer,
    startTokenTimer,
    loggedInUser,
    isLoggedIn,
  };
}
