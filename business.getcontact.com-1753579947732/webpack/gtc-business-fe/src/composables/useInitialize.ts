import { createGlobalState, useStorage } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";

import { callWithToken, Service } from "@/api";
import { useGoogleEvents } from "@/composables/useGoogleEvents";

export const useSiteData = createGlobalState<any>(() =>
  useStorage("siteData", {})
);

const pathToIconMap: any = {
  caller_id_menu: require("@/assets/images/svg/icons/identity.svg"),
  user_verify_menu: require("@/assets/images/svg/icons/user-verify.svg"),
  reports_menu: require("@/assets/images/svg/icons/reports.svg"),
  invoice_menu: require("@/assets/images/svg/icons/invoice.svg"),
};

export function convertMainMenuToSidebarMenu(mainMenu: any[]): any[] {
  return (
    mainMenu?.map((item) => {
      return {
        title: item.text,
        path: item.href,
        icon: pathToIconMap[item.key],
        children: convertMainMenuToSidebarMenu(item.items),
        status: item.status,
      };
    }) ?? []
  );
}

const getStatus = (arr: any) => {
  const obj = {} as any;

  for (const key in arr) {
    const page = arr[key];
    obj[page.href] = page.status;

    if (page.items.length) {
      for (const sub_key in page.items) {
        const sub_page = page.items[sub_key];
        obj[sub_page.href] = sub_page.status;
      }
    }
  }

  return obj;
};

export function useInitialize() {
  const siteData = useSiteData();
  const { set } = useCookies(["companyStatus", "mainMenu"]);
  const { gtaEvent } = useGoogleEvents();

  async function fetchSiteData() {
    const data = await callWithToken(Service.getInit);
    siteData.value = data.result;

    const comp = data.result.businessCompany;

    if (comp.documentApprovalIndicator !== null) {
      const approvalState = comp.documentApprovalIndicator
        ? "Approved"
        : "Not Approved";

      gtaEvent({
        event: "GAEvent",
        eventCategory: "Document",
        eventAction: approvalState,
        eventLabel: comp.country,
      });
      gtaEvent({
        event: "document",
        state: approvalState,
        clickName: comp.country,
      });
    }

    set("pageStates", getStatus(data.result.mainMenu), {
      path: "/",
      secure: process.env.NODE_ENV == "production" ? true : false,
    });
    set("companyStatus", comp.status, {
      path: "/",
      secure: process.env.NODE_ENV == "production" ? true : false,
    });
  }

  function flushSiteData() {
    siteData.value = null;
  }

  return {
    flushSiteData,
    fetchSiteData,
    siteData,
  };
}
