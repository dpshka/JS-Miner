<template>
  <nav
    :class="[
      'nav',
      {
        'h-full lg:h-auto collapsed border-transparent border-neutral-200':
          isMenuExpanded,
      },
    ]"
  >
    <div
      :class="[
        'nav-inside',
        { 'flex-col !justify-start': isMenuExpanded },
        { 'lg:!py-0': isMenuFull },
      ]"
    >
      <router-link
        :to="{ name: 'home' }"
        :class="[
          'hover:opacity-100 relative lg:mx-0 w-fit',
          {
            'mb-6': isMenuExpanded,
          },
        ]"
      >
        <img
          src="@/assets/images/svg/gtc-logo.svg"
          alt="Getcontact"
          class="h-6"
        />
      </router-link>

      <!-- Main Menu -->
      <div
        v-if="isMenuFull"
        :class="[
          'main-menu',
          {
            hidden: !isMenuExpanded,
          },
        ]"
      >
        <a
          href="#"
          @click.prevent="withdraw()"
          :class="{
            'router-link-active': route.path.includes('withdrawal'),
          }"
        >
          {{ $t("menu.top.withdraw") }}
          <img
            src="@/assets/images/svg/arrow-right.svg"
            alt="Menu item arrow"
          />
        </a>
        <router-link :to="{ name: 'balance' }">
          {{ $t("menu.top.acquisitions") }}
          <img
            src="@/assets/images/svg/arrow-right.svg"
            alt="Menu item arrow"
          />
        </router-link>
      </div>
      <!-- Main Menu End -->

      <!-- User and Language Menu: -->
      <div :class="['user-and-lang-menu', { grow: isMenuExpanded }]">
        <div
          v-if="isMenuFull"
          :class="['user-menu', { '!hidden !lg:flex': !isMenuExpanded }]"
        >
          <a href="#" class="flex items-center">
            <div class="w-8 h-8 rounded-2xl overflow-hidden mr-2">
              <img
                v-if="getUser.profileImage"
                :src="(getUser.profileImage as any)"
                class="object-cover"
              />
              <img
                v-else
                src="@/assets/images/png/user-default.jpg"
                class="object-cover"
              />
            </div>
            <span class="text-primary-500 font-bold">
              {{ getUser.name }} {{ getUser.surname }}
            </span>
          </a>

          <a href="#" @click.prevent="onLogout()" v-if="!isAndroid">
            <GtcSpinner v-if="isWaitingLogout" />
            <template v-else>
              <img src="@/assets/images/svg/logout.svg" />
            </template>
          </a>
        </div>
        <GtcPopover theme="light" :arrow="true" class="hidden lg:block order-2">
          <template v-if="isMenuFull && !isAndroid">
            <a href="#" class="flex items-center">
              <div class="w-8 h-8 rounded-2xl overflow-hidden mr-2">
                <img
                  v-if="getUser.profileImage"
                  :src="(getUser.profileImage as any)"
                  class="object-cover"
                />
                <img
                  v-else
                  src="@/assets/images/png/user-default.jpg"
                  class="object-cover"
                />
              </div>
              <span class="text-primary-500 font-bold">
                {{ getUser.name }} {{ getUser.surname }}
              </span>
            </a>
          </template>
          <template #content>
            <a href="#" @click.prevent="onLogout()" class="logout-link">
              <span>{{ $t("menu.top.logout") }}</span>
              <GtcSpinner v-if="isWaitingLogout" class="w-[20px] h-[20px]" />
              <template v-else>
                <img src="@/assets/images/svg/logout-black.svg" />
              </template>
            </a>
          </template>
        </GtcPopover>
        <LanguageSwitcher
          :class="[
            'inline h-5 lg:order-1 lg:mx-6',
            {
              'hidden lg:inline': isMenuFull && !isMenuExpanded,
            },
          ]"
        />
      </div>

      <!-- User and Language Menu End -->
    </div>

    <!-- Hamburger Button: -->
    <button
      type="button"
      class="hamb-button"
      aria-label="Hamburger menu"
      v-if="!isMenuExpanded && isMenuFull"
      @click="toggle"
    >
      <img src="@/assets/images/svg/hamburger.svg" alt="Hamburger menu" />
    </button>
    <!-- Hamburger Button End -->

    <!-- Close Button: -->
    <button
      type="button"
      class="close-button"
      v-if="isMenuExpanded && isMenuFull"
      @click="toggle"
    >
      <CloseIcon class="w-3" :color="primary[500]" />
    </button>
    <!-- Close Button End -->
  </nav>
  <div
    v-if="alert?.message"
    :class="[
      { 'container max-w-full mt-10 !mb-0': alert?.display !== 'modal' },
    ]"
  >
    <GtcAlert
      :title="alert.title"
      :message="alert.message"
      :type="alert.type"
      :display="alert.display"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

import { primary } from "@/colors";
import GtcAlert from "@/components/Alert.vue";
import CloseIcon from "@/components/icons/Close.vue";
import GtcSpinner from "@/components/icons/Spinner.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import GtcPopover from "@/components/Popover.vue";
import { useAlert } from "@/composables/useAlert";
import { useHelpers } from "@/helpers/useHelpers";
import withdraw from "@/helpers/useWithdraw";
import { useAuthStore } from "@/stores/auth.store";
import { $wait } from "@/wait";

const authStore = useAuthStore();
const { getLoggedIn, getUser, getNeedPolicy } = storeToRefs(authStore);

const isMenuExpanded = ref(false);

const isMenuFull = computed(() => {
  return getLoggedIn.value && !getNeedPolicy.value;
});

const route = useRoute();
const { alert } = useAlert();
const { isAndroid } = useHelpers();

onMounted(() => {
  window.addEventListener("resize", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeDropdown);
});

const closeDropdown = () => {
  isMenuExpanded.value = false;
};

const toggle = () => {
  isMenuExpanded.value = !isMenuExpanded.value;
};

const isWaitingLogout = computed(() => {
  return $wait.is("logout");
});

const onLogout = () => {
  if (!isWaitingLogout.value) {
    authStore.logout();
  }
};

defineComponent({
  name: "GtcNavbar",
});
</script>

<style lang="postcss">
.nav {
  @apply flex bg-white-100 top-0 left-0 fixed z-50 w-full border-b lg:px-20 lg:relative lg:py-0 lg:border-transparent;

  .nav-inside {
    @apply lg:container lg:mx-auto w-full h-full lg:h-auto sm:px-5 px-4 py-3 flex justify-between lg:items-center flex-wrap lg:flex-row;
  }

  .main-menu {
    @apply w-full lg:flex lg:items-center lg:w-auto text-base sm:text-sm lg:text-base;

    a {
      @apply p-4 lg:px-0 lg:border-b-2 lg:border-transparent lg:bg-transparent lg:rounded-none rounded-lg bg-gray-100 flex justify-between text-neutral-700 font-medium w-full mb-4 lg:mb-0 whitespace-nowrap lg:mx-4;

      &.router-link-active {
        @apply text-primary-500 font-semibold lg:border-primary-500;
      }

      &.disabled {
        @apply pointer-events-none text-gray-500;
      }

      img {
        @apply pr-1 lg:hidden;
      }
    }
  }

  .user-and-lang-menu {
    @apply flex flex-col justify-between lg:grow-0 lg:items-center lg:flex-row;

    .user-menu {
      @apply lg:hidden bg-gray-100 rounded-lg flex justify-between items-center px-4 py-3;
    }

    .logout-link {
      @apply text-sm font-semibold text-neutral-700 flex items-center justify-between min-w-[162px] p-2;
    }
  }

  .hamb-button {
    @apply p-2.5 lg:hidden cursor-pointer;
  }

  .close-button {
    @apply fixed top-[14px] right-2 z-50 border border-neutral-200 w-[56px] h-[36px] flex items-center justify-center rounded-3xl;
  }
}
</style>
