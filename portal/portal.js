this.primevue = this.primevue || {};
this.primevue.portal = (function (utils, vue) {
    'use strict';

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
                return utils.DomHandler.isClient();
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return ($options.inline)
        ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
        : ($options.isClient)
          ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
              key: 1,
              to: $props.appendTo
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 8, ["to"]))
          : vue.createCommentVNode("", true)
    }

    script.render = render;

    return script;

})(primevue.utils, Vue);
