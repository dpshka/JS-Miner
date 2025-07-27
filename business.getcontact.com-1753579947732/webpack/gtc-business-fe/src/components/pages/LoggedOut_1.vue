<template>
  <GtcNavbar :items="itemsWithRoutes" />
  <main class="flex flex-col justify-center items-center">
    <template v-for="alert in alerts" :key="alert.page">
      <div
        v-if="
          alert?.message &&
          (!alert?.page || (alert?.page && alert?.page === route.name))
        "
        class="w-[942px] max-w-full mt-5"
      >
        <GtcAlert
          :title="alert.title"
          :message="alert.message"
          :type="alert.type"
        />
      </div>
    </template>
    <h2
      v-if="title"
      class="text-center md:text-left m-10 mb-8 text-neutral-1000"
    >
      {{ title }}
    </h2>
    <p v-if="description" class="mb-7">{{ description }}</p>
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from "vue";
import { RouteMeta, useRoute, useRouter } from "vue-router";

import GtcAlert from "@/components/Alert.vue";
import { useAlert } from "@/composables/useAlert";
import { useLogin } from "@/composables/useLogin";

import GtcNavbar from "../layout/Navbar.vue";

const router = useRouter();
const route = useRoute();

const { alerts } = useAlert();
const { isLoggedIn } = useLogin();

const routerNavs = computed(() => {
  return router.options.routes
    .filter((route) => route.meta?.navbar)
    .filter((route) => {
      if (isLoggedIn.value) {
        return (route.meta as RouteMeta).navbar.showWhenLoggedIn;
      }
      return true;
    })
    .map((route) => ({
      name: route.meta?.navbar?.title,
      order: route.meta?.navbar?.order || 0,
      to: { name: route.name },
      active: router.currentRoute.value.name === route.name,
    }))
    .sort((a, b) => a.order - b.order);
});

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  items: {
    type: Array,
    default: () => [],
  },
});

defineComponent({
  name: "GtcLoggedOut",
  components: {
    GtcNavbar,
  },
});

const itemsWithRoutes = computed(() => {
  return props.items.concat(routerNavs.value);
});
</script>
