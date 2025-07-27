<template>
  <button
    data-test="button"
    :class="[`button ${size} ${theme}`, { dense, disabled }]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <GtcSpinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

import GtcSpinner from "./icons/Spinner.vue";

const emit = defineEmits(["click"]);

defineProps({
  theme: {
    type: String,
    default: "primary",
    validator: (prop: string) =>
      [
        "none",
        "primary",
        "primary-outline",
        "danger",
        "danger-outline",
        "secondary",
        "light",
        "white",
        "success",
        "success-outline",
        "default-outline",
        "light-blue",
      ].includes(prop),
  },
  dense: {
    type: Boolean,
  },
  size: {
    type: String,
    default: "small",
    validator: (prop: string) =>
      ["large", "medium", "small", "xs", "xxs"].includes(prop),
  },
  disabled: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
});

defineComponent({
  name: "GtcButton",
});
</script>

<style scoped lang="postcss">
.button {
  @apply font-semibold py-4 px-6 rounded-lg transition-all items-center justify-center;
}

button.disabled {
  @apply select-none pointer-events-none bg-neutral-300 text-white-100;
}

.dense {
  @apply py-2 px-4 text-sm;
}

/* SIZES: */

.large {
  @apply h-[60px];
}

.medium {
  @apply h-[56px];
}

.small {
  @apply h-[48px] py-2;
}

.xs {
  @apply h-[40px] py-2;
}

.xxs {
  @apply h-8 text-xs py-1 font-semibold;
}

/* THEMES: */

.none {
  @apply text-primary-500;
}

.primary {
  @apply text-white-100 bg-primary-500 active:opacity-90 hover:opacity-70;
}

.primary-outline {
  @apply text-primary-500 border border-primary-500 hover:opacity-70;
}

.danger {
  @apply text-white-100 bg-status-red active:opacity-90 hover:opacity-70;
}

.danger-outline {
  @apply text-status-red border border-status-red hover:bg-status-red hover:text-white-100;
}

.secondary {
  @apply text-white-100 bg-secondary-700 active:opacity-90 hover:opacity-70;
}

.light {
  @apply text-neutral-1000 bg-blue-100 active:opacity-90 hover:opacity-50;
}

.white {
  @apply text-neutral-1000 bg-white-100 active:opacity-90 hover:opacity-50;
}

.success {
  @apply text-white-100 bg-green-500 active:opacity-90 hover:opacity-70;
}

.success-outline {
  @apply text-green-500 border border-green-500 hover:bg-green-500 hover:text-white-100;
}

.default-outline {
  @apply text-neutral-700 border border-neutral-200 bg-transparent hover:bg-neutral-100;
}

.light-blue {
  @apply text-primary-500 border border-blue-100 bg-blue-100 hover:opacity-70 active:opacity-90;
}
</style>
