<template>
  <aside
    :class="[
      'sidebar',
      {
        'w-[80%] h-full md:h-auto collapsed': menuCollapsed,
      },
    ]"
  >
    <div class="flex md:mb-10 py-2 md:px-5 md:justify-center md:pt-6">
      <button
        type="button"
        class="p-2.5 md:hidden cursor-pointer"
        v-if="!menuCollapsed"
        @click="toggle"
      >
        <Icon name="Hamburger" />
      </button>
      <router-link
        :to="{ name: 'home' }"
        :class="[
          'hover:opacity-100 mx-auto md:left-auto relative',
          { '-left-5': !menuCollapsed },
        ]"
      >
        <img
          src="@/assets/images/svg/gtc-business-logo.svg"
          alt="GetContact Business"
          class="align-middle h-6 sm:h-7 md:h-auto min-h-[35px]"
        />
      </router-link>
    </div>
    <ul
      :class="[
        'flex-1 px-4 md:items-center md:w-auto',
        {
          'hidden md:block': !menuCollapsed,
        },
      ]"
    >
      <li v-for="item in items" :key="item.title" class="pb-1">
        <a
          v-if="item.path !== '/invoices'"
          :class="[
            'menu-item sidebar-menu',
            {
              'bg-secondary-700 rounded-lg menu-item-expanded':
                isExpanded(item),
              disabled: !item.status,
            },
          ]"
          @click="item.status ? toggleMenu($event, item) : ''"
        >
          <img v-if="item.icon" :src="item.icon" alt="" class="pr-2" />
          <span class="flex-1">{{ $t(item.title) }}</span>
          <i v-if="item.children?.length">
            <Icon
              name="Chevron"
              :direction="isExpanded(item) ? 'up' : 'down'"
            />
          </i>
        </a>
        <ul v-show="isExpanded(item)">
          <li
            class="text-secondary-100"
            v-for="child in item.children"
            :key="child.path"
          >
            <router-link
              :class="[
                'p-2.5 pl-12 text-xs block hover:text-white-100 sidebar-menu',
                {
                  'font-bold text-white-100': isExpanded(child),
                  disabled: !child.status,
                },
              ]"
              :to="{ path: child.status ? child.path : '' }"
            >
              {{ $t(child.title) }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul
      :class="[
        'sidebar-menu',
        {
          'hidden md:block': !menuCollapsed,
        },
      ]"
    >
      <li v-if="siteData?.help">
        <router-link
          :to="siteData.help.href"
          :class="[
            'menu-item',
            {
              disabled: status !== 1,
            },
          ]"
        >
          <img src="@/assets/images/svg/icons/help.svg" alt="" class="pr-2" />
          <span>{{ $t(siteData.help.text) }}</span>
        </router-link>
      </li>
      <li v-if="loggedInUser" class="relative">
        <GtcPopover>
          <div class="menu-item !opacity-100 flex relative" href="#">
            <img
              src="@/assets/images/svg/icons/avatar.svg"
              alt=""
              class="pr-2"
              data-test="avatar"
            />
            <span class="flex-1">{{ loggedInUser.accountName }}</span>
            <span class="text-white">
              <Icon name="More" />
            </span>
          </div>
          <template #content>
            <ul class="sidebar-user-menu">
              <li>
                <img
                  src="@/assets/images/svg/icons/avatar-fill.svg"
                  alt="User"
                  class="mr-4"
                />
                <div v-if="siteData?.businessCompany" class="flex flex-col">
                  <div class="text-neutral-1000 font-medium">
                    {{ siteData.businessCompany.accountName }}
                  </div>
                  <div class="text-xs text-neutral-600">
                    {{ siteData.businessCompany.email }}
                    <br />
                    {{ siteData.businessCompany.msisdn }}
                  </div>
                </div>
              </li>
              <li>
                <a
                  class="text-md px-4 py-3 block text-status-red"
                  href="#"
                  @click.prevent="logout(flushSiteData).then(removeAlert)"
                  data-test="logout"
                >
                  {{ $t("common.logout") }}
                </a>
              </li>
            </ul>
          </template>
        </GtcPopover>
      </li>
    </ul>
    <small
      :class="[
        'border-t px-4 py-4 text-center text-secondary-100 opacity-70',
        { 'hidden md:block': !menuCollapsed },
      ]"
    >
      {{ $t("site.title") }}
    </small>
    <p
      :class="[
        'text-center my-4',
        { block: menuCollapsed },
        { hidden: !menuCollapsed },
      ]"
    >
      <LanguageSwitcher dark class="inline" />
    </p>
  </aside>
  <button
    type="button"
    class="fixed top-0 right-0 p-2.5 z-50"
    v-if="menuCollapsed"
    @click="toggle"
  >
    <Icon name="Close" class="w-3" />
  </button>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, Ref, ref } from "vue";
import { useRoute } from "vue-router";

import Icon from "@/components/icons/IconRenderer.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import GtcPopover from "@/components/Popover.vue";
import { useAlert } from "@/composables/useAlert";
import { useInitialize } from "@/composables/useInitialize";
import { useLogin } from "@/composables/useLogin";
import router from "@/router";

const { loggedInUser, logout } = useLogin();
const { removeAlert } = useAlert();
const { flushSiteData } = useInitialize();

const { siteData } = useInitialize();
const route = useRoute();

const expanded: Ref<string[]> = ref([]);
const menuCollapsed = ref(false);

function toggleMenu(e: Event, item) {
  e.preventDefault();
  e.stopPropagation();

  // The following report section has to stay unless there is an initialization screen for reports.
  if (item.path !== "/reports") router.push(item.path);

  if (!item.children.length) {
    return;
  }

  expanded.value = isExpanded(item)
    ? expanded.value.filter((i) => i !== item.title)
    : [...expanded.value, item.title];
}

function splitter(item: string, term: string, position: number) {
  return item.split(term)[position];
}

function isExpanded(item) {
  if (item.children.length) {
    // This effects only items with children.
    if (splitter(route.path, "/", 1) === splitter(item.path, "/", 1))
      return true;
  } else {
    if (route.path.includes(item.path)) return true;
  }
  return expanded.value.includes(item.title);
}

const toggle = () => {
  menuCollapsed.value = !menuCollapsed.value;
};

onMounted(() => {
  window.addEventListener("resize", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("resize", closeDropdown);
});

const closeDropdown = () => {
  menuCollapsed.value = false;
};

defineProps({
  items: {
    type: Array,
    required: true,
  },
  status: {},
});

defineComponent({
  name: "GtcContainer",
});
</script>

<style>
.sidebar {
  @apply fixed top-0 z-50 flex flex-col w-full md:w-72 bg-secondary-1000 text-white-100 md:h-screen scrollbar-thumb-secondary-700 scrollbar-thin;
}
.sidebar-user-menu {
  @apply bg-white-100 text-neutral-600 pt-1 rounded-lg shadow-lg max-h-60 min-w-[260px];
}
.sidebar-user-menu > li:first-child {
  @apply border-b border-b-gray-100 flex p-4 min-w-full w-max;
}
.menu-item {
  @apply px-4 py-3 text-sm border-t border-t-transparent font-medium flex items-center cursor-pointer select-none text-white-100 hover:opacity-80;
}

.menu-item.disabled *,
.sidebar-menu.disabled {
  @apply opacity-30 border-opacity-0;
}

.menu-item.disabled,
.sidebar-menu.disabled {
  @apply pointer-events-none cursor-default;
}

.menu-item.menu-item-expanded {
  @apply border-t-secondary-700;
}

.sidebar-menu .menu-item {
  @apply px-7 border-t border-t-secondary-700;
}

aside.collapsed {
  box-shadow: 200px 0px 0px 0px rgba(0, 0, 0, 0.75);
}
</style>
