import { DomHandler } from 'primevue/utils';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createBlock, createVNode, Fragment, renderList, withCtx, withDirectives, createCommentVNode, toDisplayString, resolveDynamicComponent } from 'vue';

var script = {
    name: 'TabMenu',
    props: {
		model: {
            type: Array,
            default: null
        },
        exact: {
            type: Boolean,
            default: true
        }
    },
    timeout: null,
    mounted() {
        this.updateInkBar();
    },
    updated() {
        this.updateInkBar();
    },
    beforeUnmount() {
        clearTimeout(this.timeout);
    },
    watch: {
        $route() {
            this.timeout = setTimeout(() => this.updateInkBar(), 50);
        }
    },
    methods: {
        onItemClick(event, item, navigate) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }

            if (item.to && navigate) {
                navigate(event);
            }
        },
        getItemClass(item) {
            return ['p-tabmenuitem', item.class, {
                'p-disabled': item.disabled
            }];
        },
        getRouteItemClass(item, isActive, isExactActive) {
            return ['p-tabmenuitem', item.class, {
                 'p-highlight': this.exact ? isExactActive : isActive,
                'p-disabled': item.disabled
            }];
        },
        getItemIcon(item) {
            return ['p-menuitem-icon', item.icon];
        },
        visible(item) {
            return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
        },
        updateInkBar() {
            let tabs = this.$refs.nav.children;
            let inkHighlighted = false;
            for (let i = 0; i < tabs.length; i++) {
                let tab = tabs[i];
                if (DomHandler.hasClass(tab, 'p-highlight')) {
                    this.$refs.inkbar.style.width = DomHandler.getWidth(tab) + 'px';
                    this.$refs.inkbar.style.left =  DomHandler.getOffset(tab).left - DomHandler.getOffset(this.$refs.nav).left + 'px';
                    inkHighlighted = true;
                }
            }

            if (!inkHighlighted) {
                this.$refs.inkbar.style.width = '0px';
                this.$refs.inkbar.style.left =  '0px';
            }
        }
    },
    directives: {
        'ripple': Ripple
    }
};

const _hoisted_1 = { class: "p-tabmenu p-component" };
const _hoisted_2 = {
  ref: "nav",
  class: "p-tabmenu-nav p-reset",
  role: "tablist"
};
const _hoisted_3 = { class: "p-menuitem-text" };
const _hoisted_4 = { class: "p-menuitem-text" };
const _hoisted_5 = {
  ref: "inkbar",
  class: "p-tabmenu-ink-bar"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("ul", _hoisted_2, [
      (openBlock(true), createBlock(Fragment, null, renderList($props.model, (item, i) => {
        return (openBlock(), createBlock(Fragment, {
          key: item.label + '_' + i.toString()
        }, [
          (item.to && !item.disabled)
            ? (openBlock(), createBlock(_component_router_link, {
                key: 0,
                to: item.to,
                custom: ""
              }, {
                default: withCtx(({navigate, href, isActive, isExactActive}) => [
                  ($options.visible(item))
                    ? (openBlock(), createBlock("li", {
                        key: 0,
                        class: $options.getRouteItemClass(item,isActive,isExactActive),
                        style: item.style,
                        role: "tab"
                      }, [
                        (!_ctx.$slots.item)
                          ? withDirectives((openBlock(), createBlock("a", {
                              key: 0,
                              href: href,
                              class: "p-menuitem-link",
                              onClick: $event => ($options.onItemClick($event, item, navigate)),
                              role: "presentation"
                            }, [
                              (item.icon)
                                ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: $options.getItemIcon(item)
                                  }, null, 2))
                                : createCommentVNode("", true),
                              createVNode("span", _hoisted_3, toDisplayString(item.label), 1)
                            ], 8, ["href", "onClick"])), [
                              [_directive_ripple]
                            ])
                          : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
                              key: 1,
                              item: item
                            }, null, 8, ["item"]))
                      ], 6))
                    : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["to"]))
            : ($options.visible(item))
              ? (openBlock(), createBlock("li", {
                  key: 1,
                  class: $options.getItemClass(item),
                  role: "tab"
                }, [
                  (!_ctx.$slots.item)
                    ? withDirectives((openBlock(), createBlock("a", {
                        key: 0,
                        href: item.url,
                        class: "p-menuitem-link",
                        target: item.target,
                        onClick: $event => ($options.onItemClick($event, item)),
                        role: "presentation",
                        tabindex: item.disabled ? null : '0'
                      }, [
                        (item.icon)
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: $options.getItemIcon(item)
                            }, null, 2))
                          : createCommentVNode("", true),
                        createVNode("span", _hoisted_4, toDisplayString(item.label), 1)
                      ], 8, ["href", "target", "onClick", "tabindex"])), [
                        [_directive_ripple]
                      ])
                    : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
                        key: 1,
                        item: item
                      }, null, 8, ["item"]))
                ], 2))
              : createCommentVNode("", true)
        ], 64))
      }), 128)),
      createVNode("li", _hoisted_5, null, 512)
    ], 512)
  ]))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-tabmenu-nav {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.p-tabmenu-nav a {\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    position: relative;\n    text-decoration: none;\n    text-decoration: none;\n    overflow: hidden;\n}\n.p-tabmenu-nav a:focus {\n    z-index: 1;\n}\n.p-tabmenu-nav .p-menuitem-text {\n    line-height: 1;\n}\n.p-tabmenu-ink-bar {\n    display: none;\n    z-index: 1;\n}\n";
styleInject(css_248z);

script.render = render;

export default script;