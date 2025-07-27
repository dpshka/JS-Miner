<template>
  <Tooltip
    v-bind="$attrs"
    :trigger="trigger"
    :theme="theme"
    :arrow="arrow"
    role="tooltip"
    allow-html
    interactive
    @show="emit('show')"
    @hide="emit('hide')"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </Tooltip>
</template>

<script setup lang="ts">
import { defineComponent, defineEmits, defineProps } from "vue";

import Tooltip from "@/components/Tooltip.vue";

const emit = defineEmits(["show", "hide"]);

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

defineComponent({
  name: "GtcPopover",
});
</script>
