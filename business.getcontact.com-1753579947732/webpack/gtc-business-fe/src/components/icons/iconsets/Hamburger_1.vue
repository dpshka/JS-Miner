<template>
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.884 13.147c0-.601-.488-1.088-1.088-1.088H1.088a1.088 1.088 0 1 0 0 2.176h12.708c.6 0 1.088-.487 1.088-1.088zM13.796 6.03a1.088 1.088 0 0 1 0 2.177H1.088a1.088 1.088 0 0 1 0-2.177h12.707zm0-6.03a1.088 1.088 0 0 1 0 2.177H1.088a1.088 1.088 0 0 1 0-2.176h12.708z"
      :fill="color"
    />
  </svg>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";

defineProps({
  color: {
    type: String,
    default: "white",
  },
});

defineComponent({
  name: "HamburgerIcon",
});
</script>
