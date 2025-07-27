<template>
  <div class="scroll-box">
    <div
      v-for="(item, index) in languages"
      :key="index"
      @click="setLanguage(item)"
      class="item">
      <div class="img-box">
        <img
          :src="`https://web.cdngtc.com/assets/img/lang/${item.id}.svg`"
          class="rounded-full"
          alt="" />
      </div>
      <div class="title" :class="{ 'font-medium': $i18n.locale === item.id }">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryLanguageList",
  data() {
    return {
      languages: this.$store.state.languages,
    }
  },
  methods: {
    setLanguage(item) {
      localStorage.setItem("language", item.id)

      if (this.$route.name === "Home" && this.$route.params.locale) {
        window.location.href = "/"
      } else {
        window.location.reload()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll-box {
  @apply overflow-y-auto;

  &::-webkit-scrollbar {
    @apply w-1 bg-anti-flash;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    @apply bg-primary rounded-lg;
  }

  height: 122px;

  .item {
    @apply flex items-center cursor-pointer;

    &:not(:last-child) {
      @apply mb-2.5;
    }

    .img-box {
      @apply ltr:mr-2.5 rtl:ml-2.5 rounded-full;

      img {
        min-width: 20px;
        max-width: 20px;
      }
    }

    .title {
      @apply text-xs leading-3 text-primary-text text-left;
    }
  }
}
</style>
