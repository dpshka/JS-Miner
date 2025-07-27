<template>
  <article
    :class="[
      'px-4 py-6 bg-white-100 flex-1 md:px-14 md:py-12',
      { 'pt-4': wizardPage },
      { 'hide-elements': !visible },
    ]"
  >
    <GtcButton
      v-if="Object.keys(backTo).length"
      :class="[
        'flex items-center pt-0 !pl-0 transform mb-4',
        { '-mt-10 md:-mt-14': !alerts.length },
      ]"
      theme="none"
      @click="$router.push(backTo)"
    >
      <img :src="require('../../assets/images/svg/arrow-left.svg')" />
      <span class="text-xs text-primary-500 font-normal ml-1 mt-px">
        {{ $t("common.back") }}
      </span>
    </GtcButton>

    <template v-if="title">
      <h2 class="mb-5 text-neutral-1000 text-center md:text-left">
        {{ title }}
      </h2>
    </template>
    <template v-if="title === null">
      <h2 class="mb-5 text-neutral-1000">
        <div
          class="animate-pulse rounded-full bg-secondary-100 h-10 w-60 opacity-50"
        ></div>
      </h2>
    </template>
    <p class="mb-12">
      <template v-if="description">
        <span class="block text-center md:text-left">{{ description }}</span>
      </template>
      <template v-if="description === null">
        <span
          class="block animate-pulse rounded-full bg-secondary-100 h-6 w-[50rem] opacity-50"
        />
      </template>
      <template v-if="alerts.length && alertMin">
        <span
          v-for="(alert, index) in alerts"
          :key="index"
          class="block mt-3 text-base font-medium text-[#f9a221]"
        >
          {{ alert.message }}
        </span>
      </template>
    </p>

    <div class="relative">
      <slot />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

import GtcButton from "@/components/Button.vue";

defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  backTo: {
    type: Object,
    default: () => ({}),
  },
  wizardPage: {
    type: Boolean,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  alerts: {
    type: Array,
    default: () => [],
  },
  alertMin: {
    type: Boolean,
    default: false,
  },
});

defineComponent({
  name: "GtcPage",
});
</script>
<style>
article.hide-elements * {
  @apply opacity-0;
}
</style>
