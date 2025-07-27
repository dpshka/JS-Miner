<template>
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15 26.25C8.7868 26.25 3.75 21.2132 3.75 15V15C3.75 8.7868 8.7868 3.75 15 3.75V3.75C21.2132 3.75 26.25 8.7868 26.25 15V15C26.25 21.2132 21.2132 26.25 15 26.25V26.25Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke="color"
    />
    <path
      d="M15 16.2501V10.7896"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke="color"
    />
    <path
      d="M15 18.9475V19.0133"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke="color"
    />
  </svg>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineProps({
  color: {
    type: String,
    default: "#000",
  },
});

defineComponent({
  name: "WarningIcon",
});
</script>
