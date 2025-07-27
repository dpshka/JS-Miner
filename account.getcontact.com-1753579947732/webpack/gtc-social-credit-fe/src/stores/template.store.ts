import { useCookies } from "@vueuse/integrations/useCookies";
import { defineStore } from "pinia";

import axios from "@/config/axios.config";
import router from "@/router";
import type { typeOfProvider } from "@/stores/types/template/template.types";
import i18n from "@/utils/i18n";

export const useTemplateStore = defineStore("templateStore", {
  state: () => {
    return {
      switchActiveTab: 1,
      intendedUrl: "",
      failureCode: null,
      providers: [] as typeOfProvider[],
      selectedProvider: 0,
    };
  },
  persist: true,
  getters: {
    getFailureCode(): any {
      const failureCode = this.failureCode;
      this.failureCode = null;

      return failureCode;
    },

    getIntendedUrl(): string {
      const intendedUrl = this.intendedUrl;
      this.intendedUrl = "";

      return intendedUrl;
    },

    getSelectedProvider(state) {
      return state.selectedProvider;
    },

    getProviders(state) {
      return state.providers;
    },
  },
  actions: {
    /*
    getIntendedUrl() {
      const intendedUrl: any = this.intendedUrl;

      if (!intendedUrl) {
        return null;
      }

      const now = new Date();

      this.intendedUrl = null;

      if (now.getTime() > intendedUrl.expiry) {
        return null;
      }

      try {
        const url = new URL(intendedUrl.url);

        return url.pathname + url.search;
      } catch (e) {
        return intendedUrl.url;
      }
    },
    */

    /*
    setIntendedUrl(url: string | null) {
      if (!url) {
        this.intendedUrl = null;

        return;
      }

      const expiryDate = new Date();
      expiryDate.setSeconds(
        expiryDate.getSeconds() + this.intendedUrlExpirySecond
      );

      const intendedUrl = { url, expiry: expiryDate.getTime() };

      this.intendedUrl = intendedUrl;
    },
    */

    setIntendedUrl(url: string) {
      this.intendedUrl = url;
    },

    setFailureCode(payload: any) {
      this.failureCode = payload;
    },

    async getPurchasePolicy(loginRequestHash = "") {
      try {
        const selectedLang = i18n.global.locale;
        const response = await axios.post("/credit/purchase-policy", {
          lang: selectedLang,
          loginRequestHash,
        });

        return response.data.result;
      } catch (error) {
        console.log("error: ", error);
      }
    },

    async getConsentMode() {
      const { set, get } = useCookies();

      if (typeof get("cookieConsent") == "boolean") {
        return get("cookieConsent");
      } else {
        const response: any = await axios.get("/consent-mode");
        set("cookieConsent", response.data?.result?.status, {
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });

        return response.data?.result?.status;
      }
    },

    async fetchProviders() {
      try {
        const response = await axios.get("/credit/transfer-types");
        const transferTypes = response.data.result["transfer_types"];

        if (transferTypes.length === 1) {
          const selectedTransferType = transferTypes[0];

          this.selectedProvider = selectedTransferType.key;
          router.push({ name: selectedTransferType.name });

          return;
        }

        this.providers = [...transferTypes];

        return {
          status: true,
          transferTypes,
        };
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.errorMessage ||
          "An error occured. Please try again later.";

        return {
          status: false,
          errorMessage,
        };
      }
    },

    setSelectedProvider(providerKey: number) {
      this.selectedProvider =
        this.selectedProvider === providerKey ? 0 : providerKey;
    },
  },
});
