<template>
  <Transition name="fade">
    <div v-if="loading" class="loading">
      <img
        src="../../assets/icons/spinner.svg"
        class="animate-spin h-11 w-11 text-white"
        alt="" />
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.loading {
  @apply absolute z-20 rounded-lg inset-0 flex md:items-center justify-center;

  @media (max-width: 768px) {
    @apply pt-40;
  }

  backdrop-filter: blur(2px);
  background-color: rgba(237, 242, 248, 0.5);

  &.bg-full {
    @apply bg-white;
  }
}
</style>
