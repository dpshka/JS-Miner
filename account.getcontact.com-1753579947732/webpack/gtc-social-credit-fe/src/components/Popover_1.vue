<template>
  <Tooltip
    v-bind="$attrs"
    @change="changeTooltip"
    :trigger="trigger"
    :theme="theme"
    :arrow="arrow"
    role="tooltip"
    allow-html
    interactive
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

import Tooltip from "@/components/Tooltip.vue";

defineProps({
  theme: {
    type: String,
    default: "unstyled",
  },
  trigger: {
    type: String,
    default: "click",
  },
  arrow: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);

function changeTooltip(status: boolean) {
  emit("change", status);
}
</script>
