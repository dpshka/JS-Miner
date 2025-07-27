<template>
  <teleport to="body">
    <transition name="modal" @click="cancel">
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-neutral-1000 bg-opacity-50 overflow-y-auto scrollbar-thin h-screen w-screen z-50"
        data-test="modal-teleport"
      ></div>
    </transition>
    <transition name="modal">
      <div
        v-if="modelValue"
        v-bind="$attrs"
        class="modal-wrap"
        :class="{ 'modal-closed': modelValue }"
        data-test="modal"
      >
        <div class="modal-icon mb-4">
          <slot name="icon">
            <img src="@/assets/images/svg/info.svg" class="mb-2 mx-auto" />
          </slot>
        </div>
        <div
          v-if="title"
          class="modal-title text-xl font-bold mb-2"
          v-html="$t(title)"
        />
        <p
          v-if="message"
          class="modal-message text-sm text-neutral-600"
          v-html="$t(message)"
        />
        <p
          v-if="warning"
          class="modal-warning text-sm text-red-200"
          v-html="$t(warning)"
        />
        <div class="modal-content text-sm text-neutral-600">
          <slot name="content"></slot>
        </div>
        <div class="modal-buttons mt-6 flex justify-between">
          <GtcButton
            v-if="cancelButton"
            theme="light-blue"
            @click="cancel"
            class="mr-2 grow only:m-0"
          >
            {{ $t(cancelButton) }}
          </GtcButton>
          <GtcButton
            v-if="acceptButton"
            @click="accept"
            class="ml-2 grow only:m-0"
          >
            {{ $t(acceptButton) }}
          </GtcButton>
        </div>
        <GtcButton
          v-if="closable"
          class="flex absolute top-2 right-2 !p-0 w-10"
          theme="white"
          size="xs"
          @click="cancel"
          data-test="close-modal-button"
        >
          <CloseIcon
            class="m-auto"
            alt="close"
            color="#c4d5ff"
            weight="light"
          />
        </GtcButton>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";

import GtcButton from "@/components/Button.vue";
import CloseIcon from "@/components/icons/Close.vue";

const emit = defineEmits(["update:modelValue", "modalCancel", "modalAccept"]);

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  warning: {
    type: String,
    default: "",
  },
  acceptButton: {
    type: String,
    default: "account.common.accept",
  },
  cancelButton: {
    type: String,
    default: "",
  },
});

function cancel() {
  emit("update:modelValue", false);
  emit("modalCancel");
}

function accept() {
  emit("update:modelValue", false);
  emit("modalAccept");
}

defineComponent({
  name: "GtcModal",
});
</script>

<style lang="postcss">
.modal-wrap {
  @apply fixed top-1/2 transform -translate-y-1/2 mx-auto left-0 right-0 bg-white-100 p-6 rounded-2xl z-50 w-fit	max-w-[92%] text-center;
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
