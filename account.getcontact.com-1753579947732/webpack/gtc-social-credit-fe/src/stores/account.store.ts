import { defineStore } from "pinia";

import axios from "@/config/axios.config";
import type { Account } from "@/stores/types/account/account.types";
import { $wait } from "@/wait";

export const useAccountStore = defineStore("accountStore", {
  state: () => {
    return {
      account: {
        fullName: "",
        iban: "",
        email: "",
        country: "",
        creditCardNumber: "",
        city: "",
        address: "",
        postCode: "",
        swiftCode: "",
        bankName: "",
        accountNumber: "",
        creditAmount: 0,
        wallet: "",
        agreement: false,
      },
      isCountryEnabled: false,
    };
  },
  persist: {
    paths: ["isCountryEnabled"],
  },
  getters: {
    getAccount(state): any {
      return state.account;
    },
  },
  actions: {
    setAccount(data: any) {
      this.account = { ...this.account, ...data };
    },
    async withdrawMoney(data: Account) {
      $wait.start("withdraw");

      try {
        const response = await axios.post("/credit/withdraw", data);

        return response.data;
      } catch (error: any) {
        return error.response.data.meta;
      } finally {
        $wait.end("withdraw");
      }
    },
    async getBanks(countryCode: string) {
      return await axios.post("/credit/bank-list", { countryCode });
    },
    async getCities(countryCode: string) {
      try {
        return await axios.post("/credit/city-list", { countryCode });
      } catch (error: any) {
        return error.response.data.meta;
      }
    },
    async getCountries() {
      try {
        return await axios.get("/credit/country-list");
      } catch (error: any) {
        return error.response.data.meta;
      }
    },
    async getKycVerificationResult() {
      try {
        const response = await axios.get("/credit/user-info");
        const result = response?.data?.result;

        this.account.country = result?.user?.country || "";
        this.account.fullName = result?.user?.username || "";
        this.isCountryEnabled = result?.withdrawInfo.countryEnabled;

        return response;
      } catch (error: any) {
        return error.response.data.meta;
      }
    },
  },
});
