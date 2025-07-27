<template>
  <ImageTitleItem
    :text="`countries.${country.toUpperCase()}`"
    :img="`https://getcontact.com/assets/img/flag/${country.toLowerCase()}.svg`"
    :lazy-load="lazyLoad" />
</template>

<script>
import ImageTitleItem from "@/components/Common/ImageTitleItem"
export default {
  name: "CountryItem",
  components: { ImageTitleItem },
  props: {
    country: {
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

<style scoped></style>
