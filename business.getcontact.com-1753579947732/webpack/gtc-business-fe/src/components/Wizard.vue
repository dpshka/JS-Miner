import { defineComponent as _defineComponent } from 'vue'
import { createVNode as _createVNode, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, createElementVNode as _createElementVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

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


export default /*@__PURE__*/_defineComponent({
  __name: 'Wizard',
  props: {
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
},
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {

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

const emit = __emit;

const props = __props;

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

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createVNode(PanelNav, {
      steps: steps,
      goBack: "",
      goNext: __props.goNext,
      onStep: goToStep,
      languageSwitcher: __props.languageSwitcher
    }, null, 8, ["steps", "goNext", "languageSwitcher"]),
    _createElementVNode("div", {
      ref_key: "wizard",
      ref: wizard,
      class: "wizard h-full flex flex-col"
    }, [
      _renderSlot(_ctx.$slots, "steps", _normalizeProps(_guardReactiveProps({ next: next, prev: prev })))
    ], 512)
  ], 64))
}
}

})