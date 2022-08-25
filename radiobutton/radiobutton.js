this.primevue = this.primevue || {};
this.primevue.radiobutton = (function (utils, vue) {
    'use strict';

    var script = {
        name: 'RadioButton',
        emits: ['click', 'update:modelValue', 'change', 'focus', 'blur'],
        props: {
    		value: null,
            modelValue: null,
            disabled: {
                type: Boolean,
                default: false
            },
            inputId: {
                type: String,
                default: null
            },
            inputProps: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                focused: false
            };
        },
        methods: {
            onClick(event) {
                if (!this.disabled) {
                    this.$emit('click', event);
                    this.$emit('update:modelValue', this.value);
                    this.$refs.input.focus();

                    if (!this.checked) {
                        this.$emit('change', event);
                    }
                }
            },
            onFocus(event) {
                this.focused = true;
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.focused = false;
                this.$emit('blur', event);
            }
        },
        computed: {
            checked() {
                return this.modelValue != null && utils.ObjectUtils.equals(this.modelValue, this.value);
            },
            containerClass() {
                return [
                    'p-radiobutton p-component', {
                        'p-radiobutton-checked': this.checked,
                        'p-radiobutton-disabled': this.disabled,
                        'p-radiobutton-focused': this.focused
                    }];
            }
        }
    };

    const _hoisted_1 = { class: "p-hidden-accessible" };
    const _hoisted_2 = ["id", "checked", "value"];
    const _hoisted_3 = /*#__PURE__*/vue.createElementVNode("div", { class: "p-radiobutton-icon" }, null, -1);
    const _hoisted_4 = [
      _hoisted_3
    ];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass($options.containerClass),
        onClick: _cache[2] || (_cache[2] = $event => ($options.onClick($event)))
      }, [
        vue.createElementVNode("div", _hoisted_1, [
          vue.createElementVNode("input", vue.mergeProps({
            ref: "input",
            type: "radio",
            id: $props.inputId,
            checked: $options.checked,
            value: $props.value,
            onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFocus && $options.onFocus(...args))),
            onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args)))
          }, $props.inputProps), null, 16, _hoisted_2)
        ]),
        vue.createElementVNode("div", {
          ref: "box",
          class: vue.normalizeClass(['p-radiobutton-box', {'p-highlight': $options.checked, 'p-disabled': $props.disabled, 'p-focus': $data.focused}])
        }, _hoisted_4, 2)
      ], 2))
    }

    script.render = render;

    return script;

})(primevue.utils, Vue);
