<template>
  <PanelNav
    :steps="steps"
    goBack
    :goNext="goNext"
    @step="goToStep"
    :languageSwitcher="languageSwitcher"
  />
  <div ref="wizard" class="wizard h-full flex flex-col">
    <slot name="steps" v-bind="{ next, prev }" />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  reactive,
  ref,
  useSlots,
} from "vue";

import PanelNav from "@/components/pages/PanelNav.vue";

const wizard = ref();
const stepElements = computed(() =>
  wizard.value?.querySelectorAll(":scope > article")
);

const slots = useSlots();

const stepCount: ComputedRef<number> = computed(() => {
  const steps = slots.steps?.({}) ?? [];
  if (steps[0]?.props?.key === "_steps") {
    return (steps[0].children?.length || 0) as number;
  }
  return steps.length as number;
});

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  goNext: {
    type: Boolean,
    default: false,
  },
  languageSwitcher: {
    type: Boolean,
    default: true,
  },
});

const steps = reactive({
  number: stepCount.value,
  active: props.modelValue,
});

function goToStep(index: number) {
  steps.active = index;
  emit("update:modelValue", index);
  activateElement(index);
}

function prev() {
  if (props.modelValue >= 1) {
    goToStep(props.modelValue - 1);
  }
}

function next() {
  if (props.modelValue < stepCount.value - 1) {
    goToStep(props.modelValue + 1);
  }
}

function activateElement(index: number) {
  if (stepElements.value.length > 1) {
    stepElements.value.forEach((step) => {
      step.style.setProperty("display", "none");
    });
    stepElements.value[index]?.style.setProperty("display", "block");
  }
}

onMounted(() => {
  activateElement(props.modelValue);
});

defineComponent({
  name: "GtcWizard",
});
</script>
