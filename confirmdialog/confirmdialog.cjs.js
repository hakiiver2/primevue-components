'use strict';

var ConfirmationEventBus = require('primevue/confirmationeventbus');
var Dialog = require('primevue/dialog');
var Button = require('primevue/button');
var vue = require('vue');

var script = {
    name: 'ConfirmDialog',
    props: {
        group: String,
        breakpoints: {
            type: Object,
            default: null
        },
    },
    confirmListener: null,
    closeListener: null,
    data() {
        return {
            visible: false,
            confirmation: null,
        }
    },
    mounted() {
        this.confirmListener = (options) => {
            if (!options) {
                return;
            }

            if (options.group === this.group) {
                this.confirmation = options;
                this.visible = true;
            }
        };

        this.closeListener = () => {
            this.visible = false;
            this.confirmation = null;
        };
        ConfirmationEventBus.on('confirm', this.confirmListener);
        ConfirmationEventBus.on('close', this.closeListener);
    },
    beforeUnmount() {
        ConfirmationEventBus.off('confirm', this.confirmListener);
        ConfirmationEventBus.off('close', this.closeListener);
    },
    methods: {
        accept() {
            if (this.confirmation.accept) {
                this.confirmation.accept();
            }

            this.visible = false;
        },
        reject() {
            if (this.confirmation.reject) {
                this.confirmation.reject();
            }

            this.visible = false;
        }
    },
    computed: {
        header() {
            return this.confirmation ? this.confirmation.header : null;
        },
        message() {
            return this.confirmation ? this.confirmation.message : null;
        },
        autoFocus() {
            return this.confirmation && this.confirmation.autoFocus ? this.confirmation.autoFocus : "accept";
        },
        isShowAcceptButton() {
            return this.confirmation && "isShowAcceptButton" in this.confirmation ? this.confirmation.isShowAcceptButton : true;
        },
        isShowRejectButton() {
            return this.confirmation && "isShowRejectButton" in this.confirmation ? this.confirmation.isShowRejectButton : true;
        },
        blockScroll() {
            return this.confirmation ? this.confirmation.blockScroll : true;
        },
        position() {
            return this.confirmation ? this.confirmation.position : null;
        },
        iconClass() {
            return ['p-confirm-dialog-icon', this.confirmation ? this.confirmation.icon : null];
        },
        acceptLabel() {
            return this.confirmation ? (this.confirmation.acceptLabel || this.$primevue.config.locale.accept) : null;
        },
        rejectLabel() {
            return this.confirmation ? (this.confirmation.rejectLabel || this.$primevue.config.locale.reject) : null;
        },
        acceptIcon() {
            return this.confirmation ? this.confirmation.acceptIcon : null;
        },
        rejectIcon() {
            return this.confirmation ? this.confirmation.rejectIcon : null;
        },
        acceptClass() {
            return ['p-confirm-dialog-accept', this.confirmation ? this.confirmation.acceptClass : null];
        },
        rejectClass() {
            return ['p-confirm-dialog-reject', this.confirmation ? (this.confirmation.rejectClass || 'p-button-text') : null];
        },
        autoFocusAccept() {
            return (this.confirmation.defaultFocus === undefined || this.confirmation.defaultFocus === 'accept') ? true : false;
        },
        autoFocusReject() {
            return this.confirmation.defaultFocus === 'reject' ? true : false;
        },
        closeOnEscape() {
            return this.confirmation ? this.confirmation.closeOnEscape : true;
        }
    },
    components: {
        'CDialog': Dialog,
        'CDButton': Button
    }
};

const _hoisted_1 = { class: "p-confirm-dialog-message" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CDButton = vue.resolveComponent("CDButton");
  const _component_CDialog = vue.resolveComponent("CDialog");

  return (vue.openBlock(), vue.createBlock(_component_CDialog, {
    visible: $data.visible,
    "onUpdate:visible": _cache[2] || (_cache[2] = $event => (($data.visible) = $event)),
    modal: true,
    header: $options.header,
    blockScroll: $options.blockScroll,
    position: $options.position,
    class: "p-confirm-dialog",
    breakpoints: $props.breakpoints,
    closeOnEscape: $options.closeOnEscape
  }, {
    footer: vue.withCtx(() => [
      ($options.isShowRejectButton)
        ? (vue.openBlock(), vue.createBlock(_component_CDButton, {
            key: 0,
            label: $options.rejectLabel,
            icon: $options.rejectIcon,
            class: vue.normalizeClass($options.rejectClass),
            onClick: _cache[0] || (_cache[0] = $event => ($options.reject())),
            autofocus: $options.autoFocusReject
          }, null, 8, ["label", "icon", "class", "autofocus"]))
        : vue.createCommentVNode("", true),
      ($options.isShowAcceptButton)
        ? (vue.openBlock(), vue.createBlock(_component_CDButton, {
            key: 1,
            label: $options.acceptLabel,
            icon: $options.acceptIcon,
            class: vue.normalizeClass($options.acceptClass),
            onClick: _cache[1] || (_cache[1] = $event => ($options.accept())),
            autofocus: $options.autoFocusAccept
          }, null, 8, ["label", "icon", "class", "autofocus"]))
        : vue.createCommentVNode("", true)
    ]),
    default: vue.withCtx(() => [
      (!_ctx.$slots.message)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createElementVNode("i", {
              class: vue.normalizeClass($options.iconClass)
            }, null, 2),
            vue.createElementVNode("span", _hoisted_1, vue.toDisplayString($options.message), 1)
          ], 64))
        : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.message), {
            key: 1,
            message: $data.confirmation
          }, null, 8, ["message"]))
    ]),
    _: 1
  }, 8, ["visible", "header", "blockScroll", "position", "breakpoints", "closeOnEscape"]))
}

script.render = render;

module.exports = script;
