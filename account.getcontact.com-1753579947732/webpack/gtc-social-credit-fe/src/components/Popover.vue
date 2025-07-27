import { defineComponent as _defineComponent } from 'vue'
import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, mergeProps as _mergeProps, withCtx as _withCtx, renderList as _renderList, createSlots as _createSlots, openBlock as _openBlock, createBlock as _createBlock } from "vue"



import Tooltip from "@/components/Tooltip.vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'Popover',
  props: {
  theme: {
    type: String,
    default: "unstyled",
  },
  trigger: {
    type: String,
    default: "click",
  },
  arrow: {
    type: Boolean,
    default: false,
  },
},
  emits: ["change"],
  setup(__props, { emit: __emit }) {



const emit = __emit;

function changeTooltip(status: boolean) {
  emit("change", status);
}

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(Tooltip, _mergeProps(_ctx.$attrs, {
    onChange: changeTooltip,
    trigger: __props.trigger,
    theme: __props.theme,
    arrow: __props.arrow,
    role: "tooltip",
    "allow-html": "",
    interactive: ""
  }), _createSlots({ _: 2 }, [
    _renderList(_ctx.$slots, (_, slotName) => {
      return {
        name: slotName,
        fn: _withCtx((slotProps) => [
          _renderSlot(_ctx.$slots, slotName, _normalizeProps(_guardReactiveProps(slotProps)))
        ])
      }
    })
  ]), 1040, ["trigger", "theme", "arrow"]))
}
}

})