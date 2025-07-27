<template>
  <div class="search-action">
    <div class="ltr:mr-2.5">
      <img :src="require(`@/assets/icons/${icon}`)" alt="" />
    </div>
    <div class="w-full rtl:mr-2.5">
      <input
        class="search-input text-body-2-book"
        type="search"
        :placeholder="$t(placeholder)"
        autocomplete="off"
        @input="$emit('update', $event.target.value)"
        @focus="$emit('focus')" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
    },
    icon: {
      type: String,
      default: "search-icon.svg",
    },
  },
}
</script>

<style lang="scss" scoped>
.search-action {
  @apply md:px-6 px-5 py-4.5 flex items-center w-full;

  .search-input {
    @apply text-base leading-5 focus:outline-none w-full text-tertiary bg-white;

    &::placeholder {
      @apply text-secondary;
    }
  }
}
</style>
