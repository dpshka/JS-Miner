<template>
  <Tippy
    v-bind="$attrs"
    :theme="theme"
    :arrow="arrow"
    @show="changeTippy(true)"
    @hide="changeTippy(false)"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </Tippy>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { Tippy } from "vue-tippy";

defineProps({
  theme: {
    type: String,
    default: "dark",
  },
  arrow: {
    type: [String, Boolean],
    default: true,
  },
});

const emit = defineEmits(["change"]);

function changeTippy(status: boolean) {
  emit("change", status);
}
</script>

<style lang="postcss">
@import "tippy.js/dist/tippy.css";
@import "tippy.js/themes/light.css";
@import "tippy.js/dist/svg-arrow.css";

.tippy-box {
  @apply rounded-lg;
}

[data-theme="unstyled"] {
  &.tippy-box {
    @apply bg-transparent text-neutral-600;
  }

  .tippy-content {
    @apply bg-transparent p-0;
  }
}
</style>
