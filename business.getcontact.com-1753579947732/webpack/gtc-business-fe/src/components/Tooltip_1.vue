<template>
  <Tippy
    v-bind="$attrs"
    :theme="theme"
    :arrow="arrow"
    @show="emit('show')"
    @hide="emit('hide')"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </Tippy>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { Tippy } from "vue-tippy";

const emit = defineEmits(["show", "hide"]);

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

defineComponent({
  name: "GtcTooltip",
});
</script>

<style>
@import "tippy.js/dist/tippy.css";
@import "tippy.js/themes/light.css";
@import "tippy.js/dist/svg-arrow.css";

[data-theme="unstyled"] {
  &.tippy-box {
    @apply bg-transparent text-neutral-600;
  }

  .tippy-content {
    @apply bg-transparent p-0;
  }
}
</style>
