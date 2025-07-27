<template>
  <div data-test="alert" :class="[`alert ${type}`]">
    <Icon
      name="SuccessCircle"
      v-if="type === 'success'"
      :color="green[500]"
      class="success-icon w-[30px] h-[30px] mr-3"
    />
    <Icon
      name="Warning"
      v-else
      :class="`${type}-icon mr-3`"
      :color="
        type === 'warning' ? status.yellow : type === 'error' ? status.red : ''
      "
    />
    <div class="flex-1">
      <strong class="font-medium alert-title" v-if="title">
        {{ title }}
      </strong>
      <p class="text-xs text-secondary-1000 alert-message" v-if="message">
        {{ message }}
      </p>
    </div>
    <div>
      <slot />
    </div>
    <Icon
      name="Close"
      v-if="typeof button === 'undefined'"
      class="close-icon w-3 mx-2 cursor-pointer"
      :color="
        type === 'warning'
          ? status.yellow
          : type === 'error'
          ? status.red
          : type === 'success'
          ? green[500]
          : ''
      "
      @click="removeAlert(true)"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted } from "vue";

import { green, status } from "@/colors";
import Icon from "@/components/icons/IconRenderer.vue";
import { useAlert } from "@/composables/useAlert";
const { removeAlert } = useAlert();

const props = defineProps({
  type: {
    type: String,
    default: "warning",
    validator: (prop) => ["warning", "error", "success"].includes(prop),
  },
  title: {
    type: String,
  },
  button: {},
  message: {
    type: String,
  },
  noScrollBehavior: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (!props.noScrollBehavior) {
    document
      .getElementsByClassName("alert")[0]
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

defineComponent({
  name: "GtcAlert",
});
</script>

<style scoped>
.alert {
  @apply flex rounded-lg px-5 py-3 items-center border;
}

.alert.warning {
  @apply bg-yellow-100 border-status-yellow;
}

.alert.error {
  @apply bg-red-100 border-status-red;
}

.alert.success {
  @apply bg-green-100 border-green-500;
}
</style>
