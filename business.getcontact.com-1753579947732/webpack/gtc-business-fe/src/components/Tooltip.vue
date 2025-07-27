import { defineComponent as _defineComponent } from 'vue'
import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, unref as _unref, mergeProps as _mergeProps, withCtx as _withCtx, renderList as _renderList, createSlots as _createSlots, openBlock as _openBlock, createBlock as _createBlock } from "vue"

import { defineComponent } from "vue";
import { Tippy } from "vue-tippy";


export default /*@__PURE__*/_defineComponent({
  __name: 'Tooltip',
  props: {
  theme: {
    type: String,
    default: "dark",
  },
  arrow: {
    type: [String, Boolean],
    default: true,
  },
},
  emits: ["show", "hide"],
  setup(__props, { emit: __emit }) {

const emit = __emit;



defineComponent({
  name: "GtcTooltip",
});

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_unref(Tippy), _mergeProps(_ctx.$attrs, {
    theme: __props.theme,
    arrow: __props.arrow,
    onShow: _cache[0] || (_cache[0] = ($event: any) => (emit('show'))),
    onHide: _cache[1] || (_cache[1] = ($event: any) => (emit('hide')))
  }), _createSlots({ _: 2 }, [
    _renderList(_ctx.$slots, (_, slotName) => {
      return {
        name: slotName,
        fn: _withCtx((slotProps) => [
          _renderSlot(_ctx.$slots, slotName, _normalizeProps(_guardReactiveProps(slotProps)))
        ])
      }
    })
  ]), 1040, ["theme", "arrow"]))
}
}

})