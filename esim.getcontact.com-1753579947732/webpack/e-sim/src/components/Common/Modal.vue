<template>
  <div
    :id="identifier"
    class="fixed z-10 inset-0 overflow-y-auto hidden modal"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        @after-leave="afterLeave"
        @before-enter="beforeEnter">
        <div
          v-if="show"
          @click="$emit('hide')"
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"></div>
      </Transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">
        &#8203;
      </span>

      <Transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
        <slot v-if="show"></slot>
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    identifier: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    beforeEnter() {
      document.querySelector(`#${this.identifier}`).classList.remove("hidden")
    },
    afterLeave() {
      document.querySelector(`#${this.identifier}`).classList.add("hidden")
    },
  },
}
</script>

<style lang="scss">
.modal {
  .modal-content {
    @apply relative inline-block bg-white rounded w-full sm:align-middle align-bottom;
  }
}
</style>
