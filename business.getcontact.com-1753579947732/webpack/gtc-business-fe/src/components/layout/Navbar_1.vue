<template>
  <nav
    :class="[
      'bg-secondary-1000 py-2 text-white-100 top-0 fixed md:relative z-50 w-full',
      {
        'w-[80%] h-full md:h-auto collapsed': menuCollapsed,
      },
    ]"
  >
    <div
      class="lg:container mx-auto lg:px-20 h-full md:h-auto sm:px-5 flex items-center flex-wrap content-start justify-between"
    >
      <button
        type="button"
        class="hamb-button p-2.5 md:invisible cursor-pointer md:px-0 md:w-0"
        aria-label="Hamburger menu"
        v-if="!menuCollapsed"
        @click="toggle"
      >
        <Icon name="Hamburger" />
      </button>
      <router-link
        :to="{ name: 'home' }"
        class="hover:opacity-100 mx-auto md:left-auto relative"
        data-test="logo"
      >
        <img
          src="@/assets/images/svg/gtc-business-logo.svg"
          alt="Getcontact Business"
          class="h-9"
        />
      </router-link>
      <ul
        :class="[
          'w-full md:flex md:items-center md:w-auto md:p-0 h-[calc(100%-55px)] text-base sm:text-sm lg:text-base',
          {
            'flex flex-col': menuCollapsed,
          },
          {
            hidden: !menuCollapsed,
          },
        ]"
      >
        <li
          v-for="item in items"
          :key="item.name"
          class="ml-6 sm:ml-2 xl:ml-6 whitespace-nowrap md:my-0"
        >
          <router-link
            :class="['block w-full py-5 md:py-0', { 'font-bold': item.active }]"
            :to="item.to"
          >
            {{ $t(`menu.top.${item.name}`) }}
          </router-link>
        </li>
        <li class="ml-6 sm:ml-2 xl:ml-6" v-if="isLoggedIn">
          <a href="#" @click.prevent="onLogout">
            {{ $t("common.logout") }}
          </a>
        </li>
        <li
          class="ml-6 sm:ml-2 xl:ml-6 pl-6 sm:pl-2 xl:pl-6 mt-auto border-l-2 border-l-secondary-700 whitespace-nowrap"
          v-if="!menuCollapsed"
        >
          <router-link :to="{ name: 'contact_menu' }" class="mr-5">
            {{ $t("menu.top.contactUs") }}
          </router-link>
        </li>
        <li v-if="!menuCollapsed">
          <LanguageSwitcher dark />
        </li>
        <li class="mt-auto text-center" v-if="menuCollapsed">
          <router-link :to="{ name: 'contact_menu' }" class="mr-5">
            {{ $t("menu.top.contactUs") }}
          </router-link>
          <LanguageSwitcher dark class="inline" />
        </li>
      </ul>
    </div>
  </nav>
  <button
    type="button"
    class="fixed top-0 right-0 p-4 z-50"
    v-if="menuCollapsed"
    @click="toggle"
  >
    <Icon name="Close" class="w-3" />
  </button>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Icon from "@/components/icons/IconRenderer.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useInitialize } from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";
import router from "@/router";

const { flushSiteData } = useInitialize();
const { logout, isLoggedIn } = useLogin();
const menuCollapsed = ref(false);

onMounted(() => {
  window.addEventListener("resize", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeDropdown);
});

const closeDropdown = () => {
  menuCollapsed.value = false;
};

const toggle = () => {
  menuCollapsed.value = !menuCollapsed.value;
};

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

defineComponent({
  name: "GtcNavbar",
  components: {
    LanguageSwitcher,
  },
});

const onLogout = () => {
  logout(flushSiteData).then(() => router.push({ name: "login" }));
};
</script>

<style scoped>
nav.collapsed {
  box-shadow: 200px 0px 0px 0px rgba(0, 0, 0, 0.75);

  .hamb-button {
    @apply invisible px-0 w-0;
  }
}
</style>
