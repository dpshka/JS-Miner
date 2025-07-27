<template>
  <div>
    <GtcNavbar />
    <main>
      <h2
        v-if="title"
        class="text-center md:text-left m-10 mb-8 text-neutral-1000"
      >
        {{ title }}
      </h2>
      <p v-if="description" class="mb-7">{{ description }}</p>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

import GtcNavbar from "@/components/layout/Navbar.vue";

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

defineComponent({
  name: "GtcLoggedOut",
});
</script>

<style>
main {
  @apply flex flex-col items-center border-t-[57px] min-h-screen md:border-0 border-white-100 border-opacity-0 !important;
}
</style>
