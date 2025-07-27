<template>
  <div class="md:hidden">
    <slot name="home"></slot>
  </div>
  <div
    class="px-4 md:px-14 pt-7 bg-white-100 flex justify-center md:justify-between"
  >
    <div class="md:pr-10 grow">
      <template v-for="(alert, i) in alerts" :key="i">
        <div
          v-if="alert?.message && !alertMin"
          class="flex justify-center md:my-2 alert"
          :class="`alert-${i} flex justify-center md:my-2 alert`"
        >
          <div class="w-full">
            <GtcAlert
              :title="alert.title"
              :message="alert.message"
              :type="alert.type"
              :button="alert.button"
              :noScrollBehavior="true"
            >
              <template v-if="!!alert?.button">
                <router-link :to="alert.button.href">
                  <GtcButton
                    v-text="alert.button.text"
                    :disabled="!alert.button.status"
                    theme="danger"
                    class="text-sm ml-6"
                  />
                </router-link>
              </template>
            </GtcAlert>
          </div>
          <div class="flex" v-if="haveWizard">
            <div
              v-if="goBack"
              :class="{
                'opacity-50 pointer-events-none': activeStep === 0,
              }"
            >
              <a @click="previous" data-test="wizard-back-button">
                <GtcButton class="flex items-center pl-0" theme="none">
                  <img
                    :src="require('../../assets/images/svg/arrow-left.svg')"
                  />
                  <span class="text-xs text-primary-500 font-normal ml-1 mt-px">
                    {{ $t("common.back") }}
                  </span>
                </GtcButton>
              </a>
            </div>
            <div
              v-if="Object.keys(steps).length"
              class="steps flex items-center"
            >
              <a
                v-for="item in allSteps"
                :key="item"
                :class="{
                  'bg-primary-500': item <= steps.active,
                  'bg-secondary-100': item > steps.active,
                  'pointer-events-none': !goNext,
                }"
                class="w-[60px] h-[6px] rounded-xl mr-2.5 active:opacity-90 hover:opacity-70 cursor-pointer transition-opacity"
                @click="goNext && goToStep(item)"
              />
            </div>
            <div class="flex-1">
              <slot />
            </div>
          </div>
        </div>
      </template>
      <div class="hidden md:block">
        <slot name="home"></slot>
      </div>
    </div>
    <div
      class="hidden md:flex"
      :class="{
        'items-center': alerts.length <= 1,
        'justify-center': alerts.length > 1,
      }"
      v-if="languageSwitcher"
    >
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from "vue";

import GtcAlert from "@/components/Alert.vue";
import GtcButton from "@/components/Button.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const emit = defineEmits(["step"]);

const props = defineProps({
  goBack: {
    type: Boolean,
    default: false,
  },
  goNext: {
    type: Boolean,
    default: false,
  },
  steps: {
    type: Object,
    default: () => ({}),
  },
  alerts: {
    type: Array,
    default: () => [],
  },
  alertMin: {
    type: Boolean,
    default: false,
  },
  languageSwitcher: {
    type: Boolean,
    default: true,
  },
});

defineComponent({
  name: "PanelNav",
  components: {
    LanguageSwitcher,
  },
});

const activeStep = computed(() => props.steps.active);
const haveWizard = computed(() => {
  return props.goBack || Object.keys(props.steps).length;
});

const allSteps = computed(() =>
  Array(props.steps.number)
    .fill(0)
    .map((_, i) => i)
);

function goToStep(step) {
  emit("step", step);
}

function previous() {
  emit("step", activeStep.value > 0 ? activeStep.value - 1 : 0);
}
</script>
