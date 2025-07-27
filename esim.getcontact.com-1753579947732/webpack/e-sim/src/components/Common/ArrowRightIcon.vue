<template>
  <svg
    :class="strokeColor"
    class="transform rtl:rotate-180"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.75 9h10.5M9 3.75 14.25 9 9 14.25"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: "ArrowRightIcon",
  props: {
    strokeColor: {
      type: String,
      default: "stroke-secondary-text",
    },
  },
}
</script>

<style scoped></style>
