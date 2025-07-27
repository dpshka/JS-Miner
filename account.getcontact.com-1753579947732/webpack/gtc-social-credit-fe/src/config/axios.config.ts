import axios from "axios";

import router from "@/router/index";
import { useAuthStore } from "@/stores/auth.store";
import { useTemplateStore } from "@/stores/template.store";
import { ResponseStatusErrorCodes } from "@/types/http.types";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.VUE_APP_API_URL || "",
  // timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  headers: {
    "X-Client-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
};

const instance = axios.create(config);

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  async function (error) {
    const templateStore = useTemplateStore();
    const authStore = useAuthStore();
    const response = error.response;
    if (response) {
      // if (process.env.VUE_APP_GTM_ENABLED) {
      //   const errorCode =
      //     response.data && response.data.meta
      //       ? response.data.meta.errorCode
      //       : "unknown-error";

      //   window.dataLayer = window.dataLayer || [];
      //   window.dataLayer.push({
      //     event: "GAEvent",
      //     eventCategory: "Error",
      //     eventAction: "Network",
      //     eventLabel: errorCode,
      //   });

      //   window.dataLayer = window.dataLayer || [];
      //   window.dataLayer.push({
      //     event: "error",
      //     errorCategory: "Network",
      //     errorType: errorCode,
      //   });
      // }

      if (response.status === ResponseStatusErrorCodes.FORBIDDEN_ERROR) {
        authStore.removeAuthState();

        const errorMessage = response.data.meta?.errorMessage;

        if (errorMessage) {
          authStore.setErrorMessage(errorMessage);
        }

        if (window.location.pathname.indexOf("/login") === -1) {
          templateStore.setIntendedUrl(window.location.pathname);

          router.push({
            name: "login",
            query: {
              type: "auth-error",
            },
          });
        }

        return false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
