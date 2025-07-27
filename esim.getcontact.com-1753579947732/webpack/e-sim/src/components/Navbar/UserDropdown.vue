<template>
  <div
    class="dropdown"
    v-click-outside="hideDropdownMenu"
    v-if="auth && auth.user">
    <button class="action-btn" @click="toggleDropdownMenu">
      <UserAvatar class="avatar" />
      <span v-if="auth.user.name">
        {{ auth.user.name }}
        {{
          auth.user.surname && auth.user.surname.length
            ? auth.user.surname.charAt(0)
            : ""
        }}.
      </span>
      <span v-else>
        {{ auth.user.email.split("@")[0] }}
      </span>
    </button>

    <DropdownTransition>
      <div v-show="showDropdown" class="dropdown-menu">
        <UserBox />
        <div class="user-action-box">
          <router-link class="item" to="/account-information">
            {{ $t("Account Information") }}
          </router-link>
          <router-link class="item" to="/saved-cards">
            {{ $t("Saved Card") }}
          </router-link>
          <button
            v-if="$store.getters['auth/getCanLogout']"
            @click="logout"
            class="item logout">
            {{ $t("Logout") }}
          </button>
        </div>
      </div>
    </DropdownTransition>
  </div>
</template>

<script>
import DropdownAction from "@/mixins/DropdownAction"
import DropdownTransition from "@/components/Common/DropdownTransition"
import UserBox from "@/components/Navbar/UserBox"
import AuthAction from "@/mixins/AuthAction"
import UserAvatar from "@/components/Common/UserAvatar"

export default {
  name: "UserDropdown",
  components: { UserAvatar, UserBox, DropdownTransition },
  mixins: [DropdownAction, AuthAction],
  data() {
    return {
      show: false,
    }
  },
  watch: {
    $route() {
      this.hideDropdownMenu()
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  @apply relative;

  .action-btn {
    @apply flex items-center text-primary text-15px leading-4 font-black ltr:mr-5 rtl:ml-5;

    .avatar {
      @apply h-4 w-4 ltr:mr-1.5 rtl:ml-1.5;
    }
  }

  .dropdown-menu {
    @apply origin-top-right absolute ltr:right-4 rtl:left-4 top-2 mt-3 bg-white rounded-lg border border-azureish-secondary z-50;

    width: 254px;

    .user-action-box {
      @apply px-5 pt-5 pb-6;

      .item {
        @apply text-15px leading-4.5 text-primary-text block;

        &:not(:last-child) {
          @apply mb-4;
        }

        &.logout {
          @apply text-red;
        }
      }
    }
  }
}
</style>
