<template v-if="isLoaded">
  <div class="banner" :class="{ rtl: !isLTR }" ref="bannerBg">
    <div class="banner__content" :class="{ rtl: !isLTR }" :dir="direction">
      <p class="banner__content__text">
        {{ $t(`${banner?.text}`) }}
      </p>
      <a :href="banner?.url || '#'" class="banner__content__button">{{
        $t(`${banner?.buttonText}`)
      }}</a>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity"
import { onMounted } from "vue"

export default {
  name: "banner",
  props: ["data"],
  setup(props) {
    const banner = ref(props.data)
    const bannerBg = ref(null)
    const isLTR = computed(() => {
      return document.body.dir === "ltr"
    })

    const direction = ref(document.body.dir)

    function setBannerBg() {
      if (isLTR.value) {
        // Set LTR images:
        bannerBg.value.style.setProperty(
          "--desktopBg",
          `url(${banner.value?.desktopLTR})`
        )
        bannerBg.value.style.setProperty(
          "--mobileBg",
          `url(${banner.value?.mobileLTR})`
        )
      } else {
        // Set RTL images:
        bannerBg.value.style.setProperty(
          "--desktopBg",
          `url(${banner.value?.desktopRTL})`
        )
        bannerBg.value.style.setProperty(
          "--mobileBg",
          `url(${banner.value?.mobileRTL})`
        )
      }
    }

    onMounted(() => {
      setBannerBg()
    })

    return {
      direction,
      isLTR,
      banner,
      bannerBg,
    }
  },
}
</script>

<style lang="scss" scoped>
.banner {
  --desktopBg: "";
  --mobileBg: "";
  background-image: var(--desktopBg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 85% center;
  background-color: #8c1842;

  border-radius: 8px;

  padding: 44px 30px 27px;
  margin-bottom: 32px;

  @media screen and (max-width: 375px) {
    background-image: var(--mobileBg);
    padding: 38px 16px 16px;
  }

  &.rtl {
    background-position: 15% center;

    @media screen and (max-width: 375px) {
      background-image: var(--mobileBg);
    }
  }

  &__content {
    max-width: 68%;

    &.rtl {
      margin-left: auto;
    }

    &__text {
      margin-bottom: 16px;

      color: #fff;
      font-size: 24px;
      font-weight: 700;

      @media screen and (max-width: 530px) {
        font-size: 18px;
      }

      @media screen and (max-width: 375px) {
        font-size: 16px;
      }
    }

    &__button {
      background-color: #fff;

      display: inline-block;
      width: 100%;
      max-width: 210px;
      border-radius: 4px;
      padding: 10px 32px;
      text-align: center;

      color: #4b547b;
      font-weight: 700;

      @media screen and (max-width: 375px) {
        max-width: 141px;
        padding: 10px 16px;
      }
    }
  }
}
</style>
