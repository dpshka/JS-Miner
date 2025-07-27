<template>
  <div class="navbar-container">
    <button
      class="absolute top-0 bottom-0 ltr:left-6 rtl:right-6 my-3 w-8 h-8 md:hidden flex items-center z-10"
      @click="$emit('showSidebar')">
      <img src="../../assets/icons/menu-icon.svg" class="mx-auto" alt="" />
    </button>
    <nav class="navbar">
      <div
        class="flex md:justify-start justify-center items-center md:w-auto w-full">
        <button
          @click="$router.push({ name: 'Home' })"
          :disabled="disableNavbarLogoLink"
          class="md:w-auto md:mr-5 lg:mr-0">
          <img src="../../assets/images/logo.svg" class="logo" alt="" />
        </button>
        <router-link
          v-if="auth.loggedIn"
          to="/my-esim"
          class="nav-item md:block hidden ltr:mr-15 rtl:ml-15">
          {{ $t("My eSIM") }}
          <span class="rectangle"></span>
        </router-link>
        <router-link class="nav-item ltr:mr-15 rtl:ml-15" to="/">
          {{ $t("Data Plans") }}
          <span class="rectangle"></span>
        </router-link>
        <a
          href="https://gtcesim.faq.desk360.com"
          target="_blank"
          rel="nofollow"
          class="nav-item">
          {{ $t("Support Center") }}
          <span class="rectangle"></span>
        </a>
      </div>
      <div class="flex items-center">
        <router-link
          v-if="!auth.loggedIn"
          to="/login"
          class="nav-item login ltr:mr-5 rtl:ml-5">
          {{ $t("Login") }}
        </router-link>

        <UserDropdown v-else class="md:flex hidden" />

        <LanguageDropdown class="md:flex hidden" />
      </div>
    </nav>
  </div>
</template>

<script>
import LanguageDropdown from "@/components/Common/LanguageDropdown"
import UserDropdown from "@/components/Navbar/UserDropdown"
export default {
  name: "Navbar",
  components: { UserDropdown, LanguageDropdown },
  data() {
    return {
      disableNavbarLogoLink: false,
    }
  },
  watch: {
    $route(to) {
      this.disableNavbarLogoLink = to.name === "Home"
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar-container {
  @apply relative bg-white md:border-b md:border-baby-blue-eyes md:h-13 h-14 md:px-10;

  .navbar {
    @apply relative mx-auto flex items-center justify-between max-w-navbar h-full;

    .nav-item {
      @apply text-15px leading-6 md:block hidden;

      .rectangle {
        @apply hidden h-1 mx-auto rounded-100px;

        width: 15px;
      }

      &.router-link-exact-active,
      &.login {
        @apply text-primary font-bold;

        .rectangle {
          @apply block bg-primary;
        }
      }
    }

    .logo {
      @apply md:mx-0 mx-auto;

      @media (min-width: 1024px) {
        margin-right: 106px;

        [dir="rtl"] & {
          @apply mr-0;
          margin-left: 106px;
        }
      }
    }
  }
}
</style>
