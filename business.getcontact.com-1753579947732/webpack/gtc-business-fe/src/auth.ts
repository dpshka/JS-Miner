import { useCookies } from "@vueuse/integrations/useCookies";
import axios from "axios";

import router from "@/router";

const { get, remove } = useCookies(["locale", "token"]);

axios.interceptors.request.use(
  (config) => {
    const locale = get("locale");
    if (locale) {
      config.params = {
        ...config.params,
        lang: locale,
      };
    }

    if (get("token")) {
      config.headers = {
        ...config.headers,
        "X-Business-Token": get("token"),
      };
    }

    if (get("locale")) {
      config.headers = {
        ...config.headers,
        "X-Lang": get("locale"),
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      remove("token");
      router.push({
        name: "login",
        query: { redirect: window.location.pathname },
      });
    }
    return Promise.reject(error);
  }
);
