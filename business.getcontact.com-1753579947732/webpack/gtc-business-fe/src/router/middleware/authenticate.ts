import { useCookies } from "@vueuse/integrations/useCookies";
import { RouteLocation } from "vue-router";

import i18n from "@/utils/i18n";

const { get, set } = useCookies(["planSummary"]);

export default function authenticate(to: RouteLocation) {
  const checkMeta = (key: string) => {
    return to.matched.some((record) => record.meta[key]);
  };

  const checkName = (name: string) => {
    return to.matched.some((record) => record.name === name);
  };

  if ((!checkMeta("public") || checkName("home")) && get("token")) {
    const companyStatus = get("companyStatus");

    if (companyStatus === 6) {
      return { name: "upload_company_files" };
    }

    if (companyStatus !== 1) {
      if (!checkMeta("freeCompanyStatus")) {
        return { name: "home" };
      }
    }
  }

  if (!checkMeta("public") && !get("token")) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }

  // if page status false from main menu
  if (!checkMeta("public")) {
    const pageStates = get("pageStates");
    if (pageStates[to.path] === false) {
      return { name: "home" };
    }
  }

  if (to.query.lang) {
    const lang = to.query.lang as string;
    if (i18n.global.availableLocales.includes(lang)) {
      set("locale", lang, {
        secure: process.env.NODE_ENV === "production",
      });
      i18n.global.locale = lang;
    }
  }
}
