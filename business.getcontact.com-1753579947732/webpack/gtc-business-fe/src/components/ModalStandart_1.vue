<template>
  <GtcModal
    v-model="val"
    class="w-[600px] text-center"
    :key="String(val)"
    @modalCloseEvent="onClose"
  >
    <img :src="image" class="mx-auto mb-4" />
    <p
      class="text-[28px] font-bold text-center text-neutral-1000 mb-4 leading-[1.14]"
      v-text="title"
      data-test="modalstandart-title"
    />
    <p
      class="text-base leading-[1.38] text-center text-secondary-1000 mb-6 max-w-[450px] mx-auto"
      v-text="description"
      data-test="modalstandart-desc"
    />
    <slot />
    <GtcButton
      :disabled="!button.status"
      :theme="button.theme"
      class="w-[320px] max-w-full mb-3"
      :loading="button.loading"
      data-test="modalstandart-button"
      @click="emit('clickButton')"
      >{{ button.text }}</GtcButton
    >
  </GtcModal>
</template>

<script lang="ts" setup>
import { defineComponent, Ref, ref, watch } from "vue";

import GtcButton from "@/components/Button.vue";
import GtcModal from "@/components/Modal.vue";

const emit = defineEmits(["update:modelValue", "clickButton", "onCloseModal"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: require("@/assets/images/svg/icons/tick-circle.svg"),
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  button: {
    type: Object,
    default: () => ({}),
  },
});

const val: Ref<boolean> = ref(props.modelValue);

const onClose = () => {
  emit("onCloseModal");
};

watch(
  () => props.modelValue,
  (e) => {
    val.value = e;
    emit("update:modelValue", e);
  }
);

watch(
  () => val.value,
  (e) => {
    emit("update:modelValue", e);
  }
);

defineComponent({
  name: "GtcModalStandart",
});
</script>
