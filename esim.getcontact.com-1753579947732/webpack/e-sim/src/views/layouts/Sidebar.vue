<template>
  <div
    class="fixed h-screen inset-0 flex z-40 lg:hidden hidden"
    role="dialog"
    aria-modal="true">
    <div class="absolute top-6 ltr:right-4 rtl:left-4 z-10">
      <button
        type="button"
        @click="$emit('hideSidebar')"
        class="ml-1 flex items-center justify-center h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span class="sr-only">Close sidebar</span>
        <img src="../../assets/icons/close-icon.svg" alt="" />
      </button>
    </div>

    <Transition
      class="h-screen"
      v-on:after-leave="afterLeave"
      v-on:before-enter="beforeEnter"
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div
        class="backdrop"
        @click="$emit('hideSidebar')"
        aria-hidden="true"
        v-show="showSidebar"></div>
    </Transition>

    <Transition
      enter-active-class="transition ease-in-out duration-300 transform"
      enter-from-class="ltr:-translate-x-full rtl:translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in-out duration-300 transform"
      leave-from-class="translate-x-0"
      leave-to-class="ltr:-translate-x-full rtl:translate-x-full">
      <div class="sidebar-container" v-show="showSidebar">
        <nav class="sidebar-content">
          <TransitionGroup name="slide-left">
            <div
              v-if="tab === 'main'"
              key="main"
              class="pt-6 pb-7.5 h-full relative">
              <router-link
                :to="{ name: 'Home' }"
                class="flex-shrink-0 flex items-center justify-center px-4 mb-16">
                <img
                  class="h-9 w-auto"
                  src="../../assets/images/logo.svg"
                  alt="" />
              </router-link>
              <router-link
                v-if="auth.loggedIn"
                to="/my-esim"
                active-class="active"
                class="item">
                {{ $t("My eSIM") }}
              </router-link>
              <router-link to="/" active-class="active" class="item">
                {{ $t("Data Plans") }}
              </router-link>
              <a
                href="https://gtcesim.faq.desk360.com"
                target="_blank"
                rel="nofollow"
                class="item">
                {{ $t("Support Center") }}
              </a>
              <router-link
                active-class="active"
                class="item"
                to="/login"
                v-if="!auth.loggedIn">
                {{ $t("Log in / Sign up") }}
              </router-link>
              <UserTitle
                v-if="auth.loggedIn"
                @clicked="tab = 'user'"
                class="px-7.5" />
              <LanguageDropdown
                dropdown-menu-position-class="bottom-10 ltr:left-2 rtl:-right-2"
                class="language-dropdown show-triangle" />
            </div>

            <div v-else-if="auth.loggedIn && tab === 'user'" key="user">
              <div
                class="mb-10 border-b border-anti-flash-secondary py-5 px-3 flex">
                <button @click="tab = 'main'" class="mr-3 min-w-[24px]">
                  <img src="../../assets/icons/back-arrow-icon.svg" alt="" />
                </button>
                <UserBox />
              </div>
              <router-link
                active-class="active"
                class="item"
                to="/account-information">
                {{ $t("Account Information") }}
              </router-link>
              <router-link active-class="active" class="item" to="/saved-cards">
                {{ $t("Saved Card") }}
              </router-link>
              <button
                v-if="$store.getters['auth/getCanLogout']"
                @click="handleLogout"
                class="item">
                <span class="text-red">{{ $t("Logout") }}</span>
              </button>
            </div>
          </TransitionGroup>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script>
import UserTitle from "@/components/Navbar/UserTitle"
import UserBox from "@/components/Navbar/UserBox"
import AuthAction from "@/mixins/AuthAction"
import LanguageDropdown from "@/components/Common/LanguageDropdown"
export default {
  name: "Sidebar",
  mixins: [AuthAction],
  components: {
    LanguageDropdown,
    UserBox,
    UserTitle,
  },
  props: {
    showSidebar: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tab: "main",
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.parentElement.classList.remove("hidden")
    },
    afterLeave(el) {
      el.parentElement.classList.add("hidden")

      this.tab = "main"
    },
    handleLogout() {
      this.logout()

      this.$emit("hideSidebar")
    },
  },
  watch: {
    $route() {
      if (this.showSidebar) {
        this.$emit("hideSidebar")
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  @apply relative flex-1 flex flex-col w-full bg-white;
  max-width: 280px;

  .sidebar-content {
    @apply flex-shrink-0 h-full;

    .item {
      @apply block text-xl leading-6 text-primary-text px-7.5;

      &:not(:last-child) {
        @apply mb-10;
      }

      &.active {
        @apply font-bold;
      }

      &.user {
        @apply flex items-center font-bold text-primary;

        .avatar {
          @apply mr-2.5 w-6 h-6 rounded-full;
        }
      }

      &.language-title {
        @apply px-0;
      }
    }

    .language-dropdown {
      @apply fixed bottom-8 ltr:left-7.5 rtl:right-7.5;

      .dropdown-menu {
        @apply left-2;

        top: -180px;
      }
    }
  }
}

.backdrop {
  @apply fixed inset-0 bg-dark-charcoal bg-opacity-80;
}

.slide-left-enter-to,
.slide-left-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 500ms ease-in-out;

  position: absolute;
  left: 0;
  right: 0;
}
</style>
