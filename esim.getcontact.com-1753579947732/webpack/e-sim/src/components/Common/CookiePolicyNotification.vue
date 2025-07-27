<template>
  <transition name="cookie-policy-notification">
    <div class="cookie-policy-notification" v-show="show">
      <button class="cookie-policy-close-btn" @click="show = false">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="11">
          <path
            fill="none"
            stroke="#797c89"
            stroke-linecap="round"
            d="M1.404 10.096L10.596.904m-9.192 0l9.192 9.192" />
        </svg>
      </button>
      <div class="cookie-policy-notification__content">
        <div class="hidden sm:block">
          <p>
            {{ $t("cookiepolicy.description") }}

            <router-link to="" class="underline" target="_blank">
              {{ $t("cookiepolicy.cookiepolicy") }}.
            </router-link>
          </p>
        </div>
        <div class="sm:hidden">
          <i18n-t keypath="cookiepolicy.description2" tag="p">
            <template v-slot:policy>
              <router-link to="" class="underline" target="_blank">
                {{ $t("cookiepolicy.policy") }}
              </router-link>
            </template>
          </i18n-t>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CookiePolicyNotification",
  data() {
    return {
      show: false,
    }
  },
  activated() {
    this.show = false
  },
  mounted() {
    const status = this.$cookies.get("cookie-policy")

    if (status !== "false") {
      setTimeout(() => (this.show = true), 2000)
      this.$cookies.set("cookie-policy", false)
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY >= 150) this.show = false
    })
  },
}
</script>

<style lang="scss" scoped>
.cookie-policy {
  &-notification {
    @apply bg-[#000000b3] rounded object-contain fixed z-[999999999] bottom-[20px] left-[17px] text-center py-[9px] px-[29px] w-[calc(100%-100px)] sm:bottom-[24px] sm:left-[24px] sm:max-w-[380px] sm:text-left sm:py-5 sm:pl-6 sm:pr-12;

    &__content p {
      @apply text-sm mb-0 text-white leading-[1.29];
    }

    &-enter-active {
      transition: all 0.2s ease !important;
    }

    &-enter-from {
      @apply opacity-0 translate-x-[-50px];
    }

    &-enter-to {
      @apply opacity-100 translate-x-[0];
    }

    &-leave-active {
      @apply opacity-0 translate-x-[-50px];
      transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1) !important;
    }
  }

  &-close-btn {
    @apply bg-center bg-no-repeat bg-contain h-2 absolute w-2 top-[12px] right-[14px] sm:top-[16px] sm:right-[16px];
  }
}
</style>
