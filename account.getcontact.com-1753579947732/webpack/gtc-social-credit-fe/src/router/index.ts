import {
  createRouter,
  createWebHistory,
  RouteLocation,
  RouteRecordRaw,
} from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import { useTemplateStore } from "@/stores/template.store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/",
    name: "home",
    redirect: { name: "login" },
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/login/:gtcToken?",
    alias: "/provider-callback/:provider",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/login-verifykit",
    name: "loginByVerifykit",
    component: () => import("@/views/VerifykitLogin.vue"),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/email-verification",
    name: "emailVerification",
    component: () => import("@/views/EmailVerification.vue"),
  },
  {
    path: "/balance",
    redirect: { name: "earnedBalance" },
    name: "balance",
    component: () => import("@/views/Balance/index.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "earned",
        name: "earnedBalance",
        component: () => import("@/views/Balance/Earned.vue"),
      },
      {
        path: "earned/:id",
        name: "earnedBalanceDetail",
        component: () => import("@/views/Balance/EarnedDetail.vue"),
      },
      {
        path: "received",
        name: "receivedBalance",
        component: () => import("@/views/Balance/Received.vue"),
      },
      {
        path: "kyc-verification/:url?",
        name: "earnedKycVerification",
        component: () => import("@/views/KycVerification.vue"),
      },
    ],
  },
  {
    path: "/withdrawal",
    component: () => import("@/views/Withdrawal/index.vue"),
    children: [
      {
        path: "methods",
        component: () => import("@/views/Withdrawal/Methods/index.vue"),
        children: [
          {
            path: "",
            name: "transferMethods",
            component: () =>
              import("@/views/Withdrawal/Methods/TransferMethodList.vue"),
          },
          {
            path: "payoneer",
            name: "Payoneer",
            redirect: { name: "PayoneerAccountInfo" },
            component: () =>
              import("@/views/Withdrawal/Methods/Flows/Payoneer/index.vue"),
            children: [
              {
                path: "account-info",
                name: "PayoneerAccountInfo",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Payoneer/AccountInfo.vue"
                  ),
              },
              {
                path: "transfer",
                name: "PayoneerTransfer",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Payoneer/Transfer.vue"
                  ),
              },
              {
                path: "summary",
                name: "PayoneerSummary",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Payoneer/Summary.vue"
                  ),
              },
            ],
          },
          {
            path: "wise",
            name: "Wise",
            redirect: { name: "WiseAccountInfo" },
            component: () =>
              import("@/views/Withdrawal/Methods/Flows/Wise/index.vue"),
            children: [
              {
                path: "account-info",
                name: "WiseAccountInfo",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Wise/AccountInfo.vue"
                  ),
              },
              {
                path: "transfer",
                name: "WiseTransfer",
                component: () =>
                  import("@/views/Withdrawal/Methods/Flows/Wise/Transfer.vue"),
              },
              {
                path: "summary",
                name: "WiseSummary",
                component: () =>
                  import("@/views/Withdrawal/Methods/Flows/Wise/Summary.vue"),
              },
            ],
          },
          {
            path: "bank",
            name: "Bank",
            redirect: { name: "BankAccountInfo-User" },
            component: () =>
              import("@/views/Withdrawal/Methods/Flows/Bank/index.vue"),
            children: [
              {
                path: "user-info",
                name: "BankAccountInfo-User",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Bank/AccountInfo/UserInfo.vue"
                  ),
              },
              {
                path: "bank-info",
                name: "BankAccountInfo-Bank",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Bank/AccountInfo/BankInfo.vue"
                  ),
              },
              {
                path: "address-info",
                name: "BankAccountInfo-Address",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Bank/AccountInfo/AddressInfo.vue"
                  ),
              },
              {
                path: "transfer",
                name: "BankTransfer",
                component: () =>
                  import("@/views/Withdrawal/Methods/Flows/Bank/Transfer.vue"),
              },
              {
                path: "summary",
                name: "BankSummary",
                component: () =>
                  import("@/views/Withdrawal/Methods/Flows/Bank/Summary.vue"),
              },
            ],
          },
          {
            path: "crypto",
            name: "Crypto",
            redirect: { name: "CryptoAccountInfo" },
            component: () =>
              import("@/views/Withdrawal/Methods/Flows/Crypto/index.vue"),
            children: [
              {
                path: "account-info",
                name: "CryptoAccountInfo",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Crypto/AccountInfo.vue"
                  ),
              },
              {
                path: "transfer",
                name: "CryptoTransfer",
                component: () =>
                  import(
                    "@/views/Withdrawal/Methods/Flows/Crypto/Transfer.vue"
                  ),
              },
              {
                path: "summary",
                name: "CryptoSummary",
                component: () =>
                  import("@/views/Withdrawal/Methods/Flows/Crypto/Summary.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "purchase-policy",
        name: "purchasePolicy",
        component: () => import("@/views/Withdrawal/PurchasePolicy.vue"),
      },
      {
        path: "kyc-verification/:url?",
        name: "withDrawalKycVerification",
        component: () => import("@/views/KycVerification.vue"),
      },
      {
        path: "transfer-success",
        name: "transferSuccess",
        component: () => import("@/views/Withdrawal/TransferSuccess.vue"),
      },
      {
        path: "transfer-error",
        name: "transferError",
        component: () => import("@/views/Withdrawal/TransferError.vue"),
      },
    ],
  },
  {
    path: "/terms",
    name: "terms",
    component: () => import("@/views/Terms.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("@/views/Privacy.vue"),
  },
  {
    path: "/return",
    name: "returnToApp",
    component: () => import("@/views/ReturnToApp.vue"),
  },
  {
    path: "/payment",
    children: [
      {
        path: "",
        name: "payment",
        component: () => import("@/views/Payment/index.vue"),
      },
      {
        path: "home",
        alias: "/payment/:packageId/fail",
        name: "paymentHome",
        component: () => import("@/views/Payment/home.vue"),
      },
      {
        path: "result",
        alias: "/payment/:packageId/success",
        name: "paymentResult",
        component: () => import("@/views/Payment/payment.result.vue"),
      },
    ],
  },
  {
    path: "/(.*)",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to: RouteLocation, from: RouteLocation) => {
  const templateStore = useTemplateStore();
  const authStore = useAuthStore();
  const loggedIn = authStore.loggedIn;
  /*
    if user try login when logged in and
    can access to login page with token /login/:gtcToken?
  */
  if (
    to.meta.requiresVisitor &&
    loggedIn &&
    (!to.params.gtcToken || !to.params.gtcToken.length)
  ) {
    return { name: "earnedBalance" };
  }

  if (to.meta.requiresAuth) {
    if (!loggedIn) {
      templateStore.setIntendedUrl(to.path);

      return {
        name: "login",
      };
    }
  }

  // refresh verifykit token
  if (to.name === "loginByVerifykit" && !from.name) {
    await authStore.refreshVerifykitToken();
  }
});

export default router;
