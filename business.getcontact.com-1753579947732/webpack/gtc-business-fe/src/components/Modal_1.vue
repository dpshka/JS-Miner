<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="modelValue"
        :dir="dir"
        class="fixed inset-0 bg-neutral-1000 bg-opacity-50 overflow-y-auto scrollbar scrollbar-thin h-screen w-screen z-50 flex items-center justify-center"
        data-test="modal-teleport"
      >
        <div
          v-bind="$attrs"
          :class="['modal-wrap', className, { 'modal-closed': modelValue }]"
          data-test="modal"
        >
          <button
            class="absolute top-4 right-4 h-4 w-4 hover:opacity-50"
            @click="close"
            v-if="closable"
            data-test="close-modal-button"
          >
            <Icon name="Close" class="w-4 h-4 rounded-full" alt="close" />
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

import Icon from "@/components/icons/IconRenderer.vue";
import { useDir } from "@/composables/useDir";

const emit = defineEmits(["update:modelValue", "modalCloseEvent"]);

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: "",
  },
});

const { dir } = useDir();

const close = () => {
  emit("update:modelValue", false);
  emit("modalCloseEvent", true);
};

defineComponent({
  name: "GtcModal",
});
</script>

<style>
.modal-wrap {
  @apply p-[5%] transform mx-auto xl:mx-0 bg-white-100 p-6 rounded-md max-w-[88%] max-h-[90%] overflow-y-auto;
}
.modal-enter-active {
  animation: modal-in 0.3s;
}
.modal-leave-active {
  animation: modal-in 0.1s reverse;
}

@keyframes modal-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
