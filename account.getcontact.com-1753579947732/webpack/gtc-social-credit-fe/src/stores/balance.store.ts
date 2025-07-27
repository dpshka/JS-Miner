import { defineStore } from "pinia";

import axios from "@/config/axios.config";
import type {
  typeOfPagination,
  typeOfWithdrawSettings,
  typeOfAcqParams,
} from "@/stores/types/balance/balance.types";

export const useBalanceStore = defineStore("balanceStore", {
  state: () => {
    return {
      selectedEarned: {},
      paginateOfEarned: {
        maxVisibleButtons: 3,
        totalPages: 0,
        totalCount: 0,
        limit: 10,
        page: 1,
      } as typeOfPagination,
      paginateOfReceived: {
        maxVisibleButtons: 3,
        totalPages: 0,
        totalCount: 0,
        limit: 10,
        page: 1,
      } as typeOfPagination,
      withdrawSettings: {
        minCreditAmount: {
          currency: "",
          price: "",
          priceInt: 0,
        },
        maxCreditAmount: {
          currency: "",
          price: "",
          priceInt: 0,
        },
        currency: "",
        transactionFeeBetween100and300: 0,
        transactionFeeBetween300and500: 0,
      },
      paymentAbleBalance: {
        currency: "",
        price: "",
        priceInt: 0,
      },
      pendingBalance: {
        currency: "",
        price: "",
        priceInt: 0,
      },
      refundedBalance: {
        currency: "",
        price: "",
        priceInt: 0,
      },
      totalAmount: 0,
      kycUrl: "",
    };
  },
  persist: {
    paths: [
      "selectedEarned",
      "paginateOfEarned",
      "paginateOfReceived",
      "withdrawSettings",
    ],
  },
  getters: {
    getWithDrawSettings(state) {
      return state.withdrawSettings;
    },
    getPaymentableBalance(state) {
      return state.paymentAbleBalance;
    },
    getPendingBalance(state) {
      return state.pendingBalance;
    },
    getRefundedBalance(state) {
      return state.refundedBalance;
    },
    getPaginateOfEarned(state) {
      return state.paginateOfEarned;
    },
    getPaginateOfReceived(state) {
      return state.paginateOfReceived;
    },
  },
  actions: {
    setKycUrl(url: string) {
      this.kycUrl = url;
    },
    async getWithdraws(page: number) {
      try {
        const response: any = await axios.get(`/credit/withdraws?page=${page}`);
        const { paginate, items } = response.data.result;

        this.paginateOfReceived = { ...this.paginateOfReceived, ...paginate };

        return items;
      } catch (error) {
        console.log(error);
      }
    },
    async getAcquisitions(acqParams: typeOfAcqParams) {
      const { page, ...params } = acqParams;
      const keys = Object.keys(params) as Array<keyof typeof params>;
      let path = `/credit/acquisitions?page=${page}`;

      if (keys.length) {
        keys.forEach((key) => {
          path += `&${key}=${params[key]}`;
        });
      }

      try {
        const response: any = await axios.get(path);
        const {
          paginate,
          acquisitions,
          paymentAbleBalance,
          pendingBalance,
          refundedTransactionsTotalCreditAmount,
          withdrawSettings,
          totalCredit,
        } = response.data.result;
        this.paginateOfEarned = { ...this.paginateOfEarned, ...paginate };
        this.paymentAbleBalance = paymentAbleBalance;
        this.pendingBalance = pendingBalance;
        this.refundedBalance = refundedTransactionsTotalCreditAmount;
        this.totalAmount = totalCredit;
        this.updateWithdrawSettings(withdrawSettings);

        return {
          acquisitions,
          withdrawSettings,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getKycUrl() {
      try {
        const response: any = await axios.get("/credit/init-kyc");
        const kycUrl = response?.data?.result?.kycUrl;

        if (kycUrl) {
          this.kycUrl = kycUrl;
        }

        return kycUrl;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getAcquisitionDetail(id: number) {
      if (Object.keys(this.selectedEarned).length === 0) {
        try {
          // const response: any = await axios.get(`/credit/acquisitions/${id}`);
          return "response";
        } catch (error) {
          console.log(error);
          throw error;
        }
      } else {
        return this.selectedEarned;
      }
    },
    setSelectedEarned(data: any) {
      Object.assign(this.selectedEarned, data);
    },
    async setWithdrawSettings() {
      const response = await axios.get("/credit/withdraw-settings");

      if (response.status === 200) {
        const { result } = response.data;

        this.updateWithdrawSettings(result);
      }
    },
    updateWithdrawSettings(data: typeOfWithdrawSettings) {
      this.withdrawSettings = {
        ...data,
        minCreditAmount: {
          ...this.withdrawSettings.minCreditAmount,
          ...data.minCreditAmount,
        },
        maxCreditAmount: {
          ...this.withdrawSettings.maxCreditAmount,
          ...data.maxCreditAmount,
        },
      };
    },
  },
});
