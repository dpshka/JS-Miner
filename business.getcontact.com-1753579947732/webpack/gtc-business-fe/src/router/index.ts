import { useCookies } from "@vueuse/integrations/useCookies";
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";

import { useAlert } from "@/composables/useAlert";
import { useDesk360Chat } from "@/composables/useDesk360Chat";
import Home from "@/views/Home.vue";

import authenticate from "./middleware/authenticate";

const { importChat } = useDesk360Chat();
const { removeAlert } = useAlert();
const { remove } = useCookies(["planSummary"]);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/404.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      public: true,
      freeCompanyStatus: true,
      navbar: {
        title: "home",
        order: 1,
        showWhenLoggedIn: true,
      },
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("@/views/Products.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      public: true,
      navbar: {
        title: "login",
        order: 4,
        showWhenLoggedIn: false,
      },
    },
  },
  {
    path: "/reset-password",
    name: "reset_password",
    component: () => import("@/views/ResetPassword.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/create-password",
    name: "create_password",
    beforeEnter: (to, from, next) => {
      from.path === "/callback" ? next() : next("/");
    },
    component: () => import("@/views/CreatePassword.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/register",
    name: "register",
    // DISABLED: User registration and package upgrade functionality
    // component: () => import("@/views/Register.vue"),
    redirect: "/login",
    meta: {
      public: true,
      // DISABLED: User registration and package upgrade functionality
      // navbar: {
      //   title: "register",
      //   order: 5,
      //   showWhenLoggedIn: false,
      // },
    },
  },
  {
    path: "/upload-company-files",
    name: "upload_company_files",
    component: () => import("@/views/UploadCompanyFiles.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/help",
    name: "help_menu",
    component: () => import("@/views/Help.vue"),
  },
  {
    path: "/faq",
    name: "faq_menu",
    component: () => null,
    beforeEnter() {
      window.open("https://getcontactforbusiness.faq.desk360.com/", "_blank");
    },
    meta: {
      public: true,
      navbar: {
        title: "faq",
        order: 2,
        showWhenLoggedIn: true,
      },
    },
  },
  {
    path: "/pricing",
    name: "pricing_menu",
    // DISABLED: User registration and package upgrade functionality
    // component: () => import("@/views/Pricing.vue"),
    redirect: "/login",
    meta: {
      public: true,
      // DISABLED: User registration and package upgrade functionality
      // navbar: {
      //   title: "pricing",
      //   order: 3,
      //   showWhenLoggedIn: true,
      // },
    },
  },
  {
    path: "/boost-ads-form",
    name: "boots_ads",
    // DISABLED: User registration and package upgrade functionality
    // component: () => import("@/views/BoostAdsForm.vue"),
    redirect: "/login",
    meta: {
      public: true,
    },
  },
  {
    path: "/contact-us",
    name: "contact_menu",
    component: () => import("@/views/ContactUs.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/terms",
    name: "biz-terms",
    component: () => import("@/views/StaticPages.vue"),
    meta: {
      title: "menu.footer.terms",
      public: true,
    },
  },
  {
    path: "/privacy",
    name: "biz-privacy",
    component: () => import("@/views/StaticPages.vue"),
    meta: {
      title: "menu.footer.privacy",
      public: true,
    },
  },
  {
    path: "/purchases-policy",
    name: "biz-purchases-policy",
    component: () => import("@/views/StaticPages.vue"),
    meta: {
      title: "menu.footer.purchase",
      public: true,
    },
  },
  {
    path: "/cookies-policy",
    name: "biz-cookies-policy",
    component: () => import("@/views/StaticPages.vue"),
    meta: {
      title: "menu.footer.cookie",
      public: true,
    },
  },
  {
    path: "/invoices",
    name: "invoice_menu",
    component: () => import("@/views/Invoices.vue"),
  },
  {
    path: "/payment-success",
    name: "payment_success",
    component: Home,
    beforeEnter(to: RouteLocationNormalized) {
      const views = ["user-verify", "tag-viewing", "spam"];
      if (typeof to.query.type === "string" && views.includes(to.query.type))
        remove("userVerifyPlan");

      if (to.query.type === "caller-id") remove("planSummary");
    },
  },
  {
    path: "/caller-id",
    name: "caller_id_menu",
    component: () => import("@/views/CallerId/index.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/views/CallerId/CallerId.vue"),
      },
      {
        path: "call-card-design",
        name: "call_card_design",
        component: () => import("@/views/CallerId/CallCardDesign.vue"),
      },
      {
        path: "number-add",
        name: "caller_id_number_add",
        component: () => import("@/views/CallerId/Init.vue"),
      },
      {
        path: "/plans-init",
        name: "caller_id_plans_init",
        component: () => import("@/views/CallerId/Init.vue"),
      },
      {
        path: "manage-numbers",
        name: "number_management",
        component: () => import("@/views/CallerId/Numbers.vue"),
      },
      {
        path: "upload-number",
        component: () => import("@/views/CallerId/UploadNumber.vue"),
        name: "upload_number",
      },
      {
        path: "plans",
        name: "caller_id_manage_plans",
        component: () => import("@/views/CallerId/Plans.vue"),
      },
    ],
  },
  {
    path: "/user-verify",
    name: "user_verify_menu",
    component: () => import("@/views/UserVerify/index.vue"),
    children: [
      {
        path: "token-create",
        name: "token_create",
        component: () => import("@/views/UserVerify/GenerateToken.vue"),
      },
      {
        path: "token-list",
        name: "token_list",
        component: () => import("@/views/UserVerify/ViewToken.vue"),
      },
      {
        path: "",
        name: "user_verify_index",
        component: () => import("@/views/UserVerify/UserVerify.vue"),
      },
      {
        path: "api-document",
        name: "api_document",
        component: () => import("@/views/UserVerify/APIDocument.vue"),
      },
      {
        path: "plans",
        name: "manage_plans",
        component: () => import("@/views/UserVerify/Plans.vue"),
      },
      {
        path: "plans-init",
        name: "user_verify_plans_init",
        component: () => import("@/views/UserVerify/PlansInit.vue"),
      },
      {
        path: "plan-summary",
        name: "plan_summary",
        component: () => import("@/views/UserVerify/PlanSummary.vue"),
      },
      {
        path: "spam",
        name: "spam",
        component: () => import("@/views/UserVerify/Spam/index.vue"),
        children: [
          {
            path: "api-documents",
            name: "spam_api_document",
            component: () => import("@/views/UserVerify/Spam/APIDocument.vue"),
          },
        ],
      },
      {
        path: "business-api",
        component: () => import("@/views/UserVerify/BusinessApi/index.vue"),
        children: [
          {
            path: "user-verify",
            name: "business_api_user_verify",
            component: () =>
              import("@/views/UserVerify/BusinessApi/UserVerify.vue"),
          },
          {
            path: "tag-view",
            name: "business_api_tag_view",
            component: () =>
              import("@/views/UserVerify/BusinessApi/TagView.vue"),
          },
          {
            path: "spam-check",
            name: "business_api_spam_check",
            component: () =>
              import("@/views/UserVerify/BusinessApi/SpamApi.vue"),
          },
        ],
      },
      {
        path: "tag-view",
        name: "tag_view",
        component: () => import("@/views/UserVerify/TagView/index.vue"),
        children: [
          {
            path: "plans-init",
            name: "tag_view_plans_init",
            component: () => import("@/views/UserVerify/TagView/PlansInit.vue"),
          },
          {
            path: "api-documents",
            name: "tag_view_api_document",
            component: () =>
              import("@/views/UserVerify/TagView/APIDocument.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/reports",
    name: "reports_menu",
    children: [
      {
        path: "user-verify",
        name: "user_verify_reports",
        component: () => import("@/views/UserVerify/Reports.vue"),
      },
      {
        path: "tag-view",
        name: "tag_view_reports",
        component: () => import("@/views/UserVerify/TagView/Reports.vue"),
      },
      {
        path: "caller-id",
        name: "caller_id_reports",
        component: () => import("@/views/CallerId/Reports.vue"),
      },
      {
        path: "spam-api",
        name: "spam_reports",
        component: () => import("@/views/UserVerify/Spam/Reports.vue"),
      },
    ],
  },
  {
    path: "/callback",
    component: () => import("@/views/Callback.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/(.*)",
    component: () => import("@/views/404.vue"),
    meta: {
      public: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(authenticate);

router.afterEach((to: RouteLocationNormalized) => {
  importChat(!!to.meta.public);
  removeAlert(true, to.name);
});

export default router;
