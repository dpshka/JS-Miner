<template>
  <router-view />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import i18n from "@/utils/i18n";

const html = document.querySelector("html") as HTMLElement,
  rtlLocales = ["ar"],
  locale = computed(() => i18n.global.locale),
  dir = computed(() => (rtlLocales.includes(locale.value) ? "rtl" : "ltr"));

html.setAttribute("dir", dir.value);
</script>
