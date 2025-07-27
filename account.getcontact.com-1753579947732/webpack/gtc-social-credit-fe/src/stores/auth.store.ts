import { defineStore } from "pinia";

import axios from "@/config/axios.config";
import router from "@/router";
import { useAccountStore } from "@/stores/account.store";
import type {
  HashItems,
  LoginData,
  User,
} from "@/stores/types/auth/auth.types";
import { $wait } from "@/wait";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      country: "",
      loggedInWithGtcToken: false,
      loggedIn: false,
      hashItems: {} as HashItems,
      user: {} as User,
      needPolicy: true,
      loginData: {
        fullName: "",
        email: "",
      },
      errorMessage: "",
    };
  },
  persist: true,
  getters: {
    getLoggedIn: (state) => {
      return state.loggedIn;
    },
    getNeedPolicy: (state) => {
      return state.needPolicy;
    },
    getUser: (state) => {
      return state.user;
    },
    getErrorMessage: (state) => state.errorMessage,
    getCanLogout: (state) => {
      if (state.loggedInWithGtcToken) {
        const standalone = (<any>window).navigator.standalone,
          userAgent = window.navigator.userAgent.toLowerCase(),
          safari = /safari/.test(userAgent),
          ios = /iphone|ipod|ipad/.test(userAgent);

        if (ios) {
          //ios uiwebview
          if (!standalone && !safari) {
            return false;
          }

          //android uiwebview
        } else if ((<any>window).Android) {
          return false;
        }

        return false;
      }

      return true;
    },
    getCountry: (state) => state.country,
  },
  actions: {
    updateUser(data: User) {
      Object.assign(this.user, data);
    },
    updateHashItems(data: any) {
      this.hashItems = { ...data };
    },
    setCountry(county: string) {
      this.country = county;
    },
    setErrorMessage(errorMessage = "") {
      this.errorMessage = errorMessage;
    },
    async login(data: LoginData) {
      $wait.start("login");

      this.loginData.email = data.token;
      this.loginData.fullName = data.fullName || "";

      try {
        const response = await axios.post("/auth/login", data);
        const { hash, loginHash, needPolicy } = response.data.result;

        this.hashItems = { hash, loginHash };
        this.needPolicy = needPolicy;

        return true;
      } catch (error: any) {
        const errData = error?.response?.data;

        if (errData?.meta?.httpStatusCode === 400 && errData?.result) {
          this.hashItems = {
            ...this.hashItems,
            loginHash: errData.result.loginHash,
            ...errData.result.verification,
          };
        }

        throw errData;
      } finally {
        $wait.end("login");
      }
    },
    async loginInit() {
      try {
        const response = await axios.get("/auth/login-init");
        const result = response?.data?.result;

        this.setCountry(result?.country);

        return result;
      } catch (error: any) {
        console.log("Login init error: ", error);
        throw error.response.data;
      }
    },
    async loginByGtcToken(token: string, isPayment = false) {
      try {
        const response = await axios.post(`/auth/login-gtctoken/${token}`);
        const result = response?.data?.result;

        if (isPayment) {
          return result;
        }

        const user = result?.user;

        this.user = { ...user };
        this.loggedInWithGtcToken = true;
        this.loggedIn = true;
        this.needPolicy = response.data.result.needPolicy;
        this.hashItems = {
          ...this.hashItems,
          loginHash: result?.loginHash,
        };
        const accountStore = useAccountStore();
        await accountStore.getKycVerificationResult();

        return { user, needPolicy: this.needPolicy };
      } catch (e: any) {
        let responseData = { message: "An error occurred. Please try again." };

        if (e.response) {
          const data = e.response.data;

          if (data.meta) {
            responseData = { message: data.meta.errorCode };
          }
        }

        throw responseData;
      }
    },
    async loginByVerifykit(data: {
      hash: string;
      loginRequestHash: string;
      sessionId: string;
    }) {
      try {
        const response = await axios.post("/auth/login-verifykit", data);
        const user = response?.data?.result?.user;

        this.updateUser(user);
        this.needPolicy = response?.data?.result?.needPolicy;
        this.hashItems.loginHash = response?.data?.result?.loginRequestHash;
        this.loggedIn = true;
        const accountStore = useAccountStore();
        const kycResult = await accountStore.getKycVerificationResult();

        return !!kycResult;
      } catch (e: any) {
        throw e.response;
      }
    },
    async refreshVerifykitToken() {
      try {
        const response = await axios.get("/auth/refresh-verifykit-token");
        const { hash, accessToken } = response.data.result;
        const { loginHash } = this.hashItems;
        const data = { hash, accessToken, loginHash };

        this.updateHashItems(data);
      } catch (error: any) {
        console.log(error);
      }
    },
    async emailVerification(verifyCode: string) {
      const data = {
        verifyCode,
        userHash: this.hashItems.hash,
        loginRequestHash: this.hashItems.loginHash,
      };

      try {
        await axios.post("/auth/mail-verify", data);
      } catch (error: any) {
        const verifyObject = error?.response?.data?.result?.verification;

        if (verifyObject) {
          const { hash, accessToken } = verifyObject;
          const loginHash = error.response.data.result.loginHash;
          const data = {
            hash,
            accessToken,
            loginHash,
          };

          this.updateHashItems(data);

          return { status: true };
        } else {
          return { status: false };
        }
      }
    },
    async logout() {
      try {
        $wait.start("logout");

        const response = await axios.post("/auth/logout");

        if (response) {
          this.removeAuthState();
          router.push({ name: "login" });
          return true;
        }
      } catch (error: any) {
        throw error.response;
      } finally {
        $wait.end("logout");
      }

      localStorage.removeItem("intendedUrl");
    },
    removeAuthState() {
      this.$reset();
    },
    async setNeedPolicy() {
      try {
        const response = await axios.post("/credit/policy-acception");
        const result = response?.data?.result;

        if (result.status === 1) {
          this.needPolicy = false;
        }

        return result;
      } catch (error: any) {
        throw error.response;
      }
    },
  },
});
