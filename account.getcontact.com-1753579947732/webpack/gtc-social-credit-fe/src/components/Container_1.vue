<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

defineComponent({
  name: "GtcContainer",
});
</script>

<style lang="postcss">
.container {
  @apply rounded-2xl px-4 pt-4 pb-4 bg-white-100 flex flex-col grow md:mt-20 md:px-[92px] md:py-12 md:w-[712px] md:mb-16 md:grow-0 md:pt-8;
}
</style>
