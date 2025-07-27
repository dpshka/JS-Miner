<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6.992"
      y="6.996"
      width="14.006"
      height="14.006"
      rx="2"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.994 17.002H4.993a2 2 0 0 1-2-2V4.996a2 2 0 0 1 2-2h10.004a2 2 0 0 1 2.001 2v2"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";

defineProps({
  color: {
    type: String,
    default: "#5F7FA3",
  },
});

defineComponent({
  name: "CopyIcon",
});
</script>
