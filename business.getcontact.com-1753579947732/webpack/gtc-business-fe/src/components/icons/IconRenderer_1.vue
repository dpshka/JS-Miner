<template>
  <getIconComponent v-bind="$props" />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "Danger",
  },
});

const getIconComponent = defineAsyncComponent(
  () => import(`@/components/icons/iconsets/${props.name}.vue`)
);
</script>
