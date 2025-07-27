import { defineComponent as _defineComponent } from 'vue'
import { unref as _unref, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, openBlock as _openBlock, createBlock as _createBlock } from "vue"

import { defineAsyncComponent } from "vue";


export default /*@__PURE__*/_defineComponent({
  __name: 'IconRenderer',
  props: {
  name: {
    type: String,
    default: "Danger",
  },
},
  setup(__props) {

const props = __props;

const getIconComponent = defineAsyncComponent(
  () => import(`@/components/icons/iconsets/${props.name}.vue`)
);

return (_ctx: any,_cache: any) => {
  return (_openBlock(), _createBlock(_unref(getIconComponent), _normalizeProps(_guardReactiveProps(_ctx.$props)), null, 16))
}
}

})