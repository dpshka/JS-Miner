<template>
  <Modal identifier="alert-modal" :show="show">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('hide')">
        <img src="../../assets/icons/modal-close-icon.svg" alt="" />
      </button>
      <img
        v-show="alertType === 'error'"
        src="../../assets/icons/error-icon.svg"
        alt=""
        class="icon" />
      <img
        v-show="alertType === 'success'"
        src="../../assets/icons/success-icon.svg"
        alt=""
        class="icon" />
      <div v-if="title" class="title">
        {{ title }}
      </div>
      <div class="message">
        {{ message }}
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/Common/Modal"
export default {
  name: "AlertModal",
  components: { Modal },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    alertType: {
      type: String,
      validator: value => {
        return ["success", "error"].includes(value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-content {
  @apply pt-6.5 pb-9 px-6 max-w-[400px] max-h-[260px];

  .close-btn {
    @apply absolute top-7 right-5;
  }

  .icon {
    @apply mb-2 mx-auto;
  }

  .title {
    @apply text-center text-xl leading-6 font-bold mb-2 text-primary-text;
  }

  .message {
    @apply max-w-[310px] mx-auto text-secondary text-base leading-5;
  }
}
</style>
