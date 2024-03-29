this.primevue = this.primevue || {};
this.primevue.dynamicdialog = (function (utils, DynamicDialogEventBus, Dialog, vue) {
    'use strict';

    var script = {
        name: 'DynamicDialog',
        inheritAttrs: false,
        data() {
            return {
                instanceMap: {}
            }
        },
        openListener: null,
        closeListener: null,
        currentInstance: null,
        mounted() {
            this.openListener = ({ instance }) => {
                const key = utils.UniqueComponentId() + '_dynamic_dialog';

                instance.visible = true;
                instance.key = key;
                this.instanceMap[key] = instance;
            };

            this.closeListener = ({ instance, params }) => {
                const key = instance.key;
                const currentInstance = this.instanceMap[key];

                if (currentInstance) {
                    currentInstance.visible = false;
                    currentInstance.options.onClose && currentInstance.options.onClose({ data: params,  type: 'config-close' });

                    this.currentInstance = currentInstance;
                }
            };

            DynamicDialogEventBus.on('open', this.openListener);
            DynamicDialogEventBus.on('close', this.closeListener);
        },
        beforeUnmount() {
            DynamicDialogEventBus.off('open', this.openListener);
            DynamicDialogEventBus.off('close', this.closeListener);
        },
        methods: {
            onDialogHide(instance) {
                !this.currentInstance && instance.options.onClose && instance.options.onClose({ type: 'dialog-close' });
            },
            onDialogAfterHide() {
                this.currentInstance && (delete this.currentInstance);
                this.currentInstance = null;
            },
            getTemplateItems(template) {
                return Array.isArray(template) ? template : [template];
            }
        },
        components: {
            'DDialog': Dialog
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_DDialog = vue.resolveComponent("DDialog");

      return (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.instanceMap, (instance, key) => {
        return (vue.openBlock(), vue.createBlock(_component_DDialog, vue.mergeProps({
          key: key,
          _instance: instance
        }, instance.options.props, {
          visible: instance.visible,
          "onUpdate:visible": $event => ((instance.visible) = $event),
          onHide: $event => ($options.onDialogHide(instance)),
          onAfterHide: $options.onDialogAfterHide
        }), vue.createSlots({
          default: vue.withCtx(() => [
            (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(instance.content)))
          ]),
          _: 2
        }, [
          (instance.options.templates && instance.options.templates.header)
            ? {
                name: "header",
                fn: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTemplateItems(instance.options.templates.header), (header, index) => {
                    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(header), {
                      key: index + '_header'
                    }))
                  }), 128))
                ])
              }
            : undefined,
          (instance.options.templates && instance.options.templates.footer)
            ? {
                name: "footer",
                fn: vue.withCtx(() => [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getTemplateItems(instance.options.templates.footer), (footer, index) => {
                    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(footer), {
                      key: index + '_footer'
                    }))
                  }), 128))
                ])
              }
            : undefined
        ]), 1040, ["_instance", "visible", "onUpdate:visible", "onHide", "onAfterHide"]))
      }), 128))
    }

    script.render = render;

    return script;

})(primevue.utils, primevue.dynamicdialogeventbus, primevue.dialog, Vue);
