<template>
  <div class="image-title-item">
    <div class="img-box">
      <img :src="img" alt="" :loading="lazyLoad ? 'lazy' : 'auto'" />
    </div>
    <div class="text text-body-1">
      {{ $t(text) }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageTitleItem",
  props: {
    img: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.image-title-item {
  @apply flex items-center;

  &.sm {
    .img-box {
      @apply ltr:mr-2 rtl:ml-2;

      img {
        @apply min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] select-none pointer-events-none;
      }
    }

    .text {
      @apply text-sm;
    }
  }

  .img-box {
    @apply ltr:mr-4 rtl:ml-4;

    img {
      @apply rounded-full min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px];
    }
  }

  .text {
    @apply font-medium capitalize text-left;
  }
}
</style>
