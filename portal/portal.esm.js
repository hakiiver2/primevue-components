import { DomHandler } from 'primevue/utils';
import { renderSlot, openBlock, createBlock, Teleport, createCommentVNode } from 'vue';

var script = {
    name: 'Portal',
    props: {
        appendTo: {
            type: String,
            default: 'body'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        inline() {
            return this.disabled || this.appendTo === 'self';
        },
        isClient() {
            return DomHandler.isClient();
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($options.inline)
    ? renderSlot(_ctx.$slots, "default", { key: 0 })
    : ($options.isClient)
      ? (openBlock(), createBlock(Teleport, {
          key: 1,
          to: $props.appendTo
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 8, ["to"]))
      : createCommentVNode("", true)
}

script.render = render;

export { script as default };
