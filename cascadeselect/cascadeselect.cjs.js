'use strict';

var utils = require('primevue/utils');
var OverlayEventBus = require('primevue/overlayeventbus');
var Ripple = require('primevue/ripple');
var vue = require('vue');
var Portal = require('primevue/portal');

var script$1 = {
    name: 'CascadeSelectSub',
    emits: ['option-change'],
    props: {
        selectId: String,
        focusedOptionId: String,
        options: Array,
        optionLabel: String,
        optionValue: String,
        optionDisabled: null,
        optionGroupLabel: String,
        optionGroupChildren: Array,
        activeOptionPath: Array,
        level: Number,
        templates: null
    },
    mounted() {
        if (utils.ObjectUtils.isNotEmpty(this.parentKey)) {
            this.position();
        }
    },
    methods: {
        getOptionId(processedOption) {
            return `${this.selectId}_${processedOption.key}`;
        },
        getOptionLabel(processedOption) {
            return this.optionLabel ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionLabel) : processedOption.option;
        },
        getOptionValue(processedOption) {
            return this.optionValue ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionValue) : processedOption.option;
        },
        isOptionDisabled(processedOption) {
            return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionDisabled) : false;
        },
        getOptionGroupLabel(processedOption) {
            return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(processedOption.option, this.optionGroupLabel) : null;
        },
        getOptionGroupChildren(processedOption) {
            return processedOption.children;
        },
        isOptionGroup(processedOption) {
            return utils.ObjectUtils.isNotEmpty(processedOption.children);
        },
        isOptionSelected(processedOption) {
            return !this.isOptionGroup(processedOption) && this.isOptionActive(processedOption);
        },
        isOptionActive(processedOption) {
            return this.activeOptionPath.some(path => path.key === processedOption.key);
        },
        isOptionFocused(processedOption) {
            return this.focusedOptionId === this.getOptionId(processedOption);
        },
        getOptionLabelToRender(processedOption) {
            return this.isOptionGroup(processedOption) ? this.getOptionGroupLabel(processedOption) : this.getOptionLabel(processedOption);
        },
        onOptionClick(event, processedOption) {
            this.$emit('option-change', { originalEvent: event, processedOption, isFocus: true });
        },
        onOptionChange(event) {
            this.$emit('option-change', event);
        },
        position() {
            const parentItem = this.$el.parentElement;
            const containerOffset = utils.DomHandler.getOffset(parentItem);
            const viewport = utils.DomHandler.getViewport();
            const sublistWidth = this.$el.offsetParent ? this.$el.offsetWidth : utils.DomHandler.getHiddenElementOuterWidth(this.$el);
            const itemOuterWidth = utils.DomHandler.getOuterWidth(parentItem.children[0]);

            if ((parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth) > (viewport.width - utils.DomHandler.calculateScrollbarWidth())) {
                this.$el.style.left = '-100%';
            }
        }
    },
    directives: {
        'ripple': Ripple
    }
};

const _hoisted_1$1 = { class: "p-cascadeselect-panel p-cascadeselect-items" };
const _hoisted_2$1 = ["id", "aria-label", "aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-level"];
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = {
  key: 1,
  class: "p-cascadeselect-item-text"
};
const _hoisted_5$1 = {
  key: 2,
  class: "p-cascadeselect-group-icon pi pi-angle-right",
  "aria-hidden": "true"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CascadeSelectSub = vue.resolveComponent("CascadeSelectSub", true);
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createElementBlock("ul", _hoisted_1$1, [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.options, (processedOption, index) => {
      return (vue.openBlock(), vue.createElementBlock("li", {
        key: $options.getOptionLabelToRender(processedOption),
        id: $options.getOptionId(processedOption),
        class: vue.normalizeClass(['p-cascadeselect-item', {'p-cascadeselect-item-group': $options.isOptionGroup(processedOption), 'p-cascadeselect-item-active p-highlight': $options.isOptionActive(processedOption), 'p-focus': $options.isOptionFocused(processedOption), 'p-disabled': $options.isOptionDisabled(processedOption)}]),
        role: "treeitem",
        "aria-label": $options.getOptionLabelToRender(processedOption),
        "aria-selected": $options.isOptionGroup(processedOption) ? undefined : $options.isOptionSelected(processedOption),
        "aria-expanded": $options.isOptionGroup(processedOption) ? $options.isOptionActive(processedOption) : undefined,
        "aria-setsize": processedOption.length,
        "aria-posinset": index + 1,
        "aria-level": $props.level + 1
      }, [
        vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          class: "p-cascadeselect-item-content",
          onClick: $event => ($options.onOptionClick($event, processedOption))
        }, [
          ($props.templates['option'])
            ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates['option']), {
                key: 0,
                option: processedOption.option
              }, null, 8, ["option"]))
            : (vue.openBlock(), vue.createElementBlock("span", _hoisted_4$1, vue.toDisplayString($options.getOptionLabelToRender(processedOption)), 1)),
          ($options.isOptionGroup(processedOption))
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$1))
            : vue.createCommentVNode("", true)
        ], 8, _hoisted_3$1)), [
          [_directive_ripple]
        ]),
        ($options.isOptionGroup(processedOption) && $options.isOptionActive(processedOption))
          ? (vue.openBlock(), vue.createBlock(_component_CascadeSelectSub, {
              key: 0,
              role: "group",
              class: "p-cascadeselect-sublist",
              selectId: $props.selectId,
              focusedOptionId: $props.focusedOptionId,
              options: $options.getOptionGroupChildren(processedOption),
              activeOptionPath: $props.activeOptionPath,
              level: $props.level + 1,
              templates: $props.templates,
              optionLabel: $props.optionLabel,
              optionValue: $props.optionValue,
              optionDisabled: $props.optionDisabled,
              optionGroupLabel: $props.optionGroupLabel,
              optionGroupChildren: $props.optionGroupChildren,
              onOptionChange: $options.onOptionChange
            }, null, 8, ["selectId", "focusedOptionId", "options", "activeOptionPath", "level", "templates", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "onOptionChange"]))
          : vue.createCommentVNode("", true)
      ], 10, _hoisted_2$1))
    }), 128))
  ]))
}

script$1.render = render$1;

var script = {
    name: 'CascadeSelect',
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'click', 'group-change', 'before-show', 'before-hide', 'hide', 'show'],
    props: {
        modelValue: null,
        options: Array,
        optionLabel: null,
        optionValue: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
        placeholder: String,
		disabled: Boolean,
        dataKey: null,
        inputId: null,
        inputStyle: null,
        inputClass: null,
        inputProps: null,
        panelStyle: null,
        panelClass: null,
        panelProps: null,
        appendTo: {
            type: String,
            default: 'body'
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingIcon: {
            type: String,
            default: 'pi pi-spinner pi-spin'
        },
        autoOptionFocus: {
            type: Boolean,
            default: true
        },
        selectOnFocus: {
            type: Boolean,
            default: false
        },
        searchLocale: {
            type: String,
            default: undefined
        },
        searchMessage: {
            type: String,
            default: null
        },
        selectionMessage: {
            type: String,
            default: null
        },
        emptySelectionMessage: {
            type: String,
            default: null
        },
        emptySearchMessage: {
            type: String,
            default: null
        },
        emptyMessage: {
            type: String,
            default: null
        },
        tabindex: {
            type: Number,
            default: 0
        },
        'aria-labelledby': {
            type: String,
			default: null
        },
        'aria-label': {
            type: String,
            default: null
        }
    },
    outsideClickListener: null,
    scrollHandler: null,
    resizeListener: null,
    overlay: null,
    searchTimeout: null,
    searchValue: null,
    focusOnHover: false,
    data() {
        return {
            id: utils.UniqueComponentId(),
            focused: false,
            focusedOptionInfo: { index: -1, level: 0, parentKey: '' },
            activeOptionPath: [],
            overlayVisible: false,
            dirty: false
        }
    },
    watch: {
        options() {
            this.autoUpdateModel();
        }
    },
    mounted() {
        this.id = this.$attrs.id || this.id;

        this.autoUpdateModel();
    },
    beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlay) {
            utils.ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    },
    methods: {
        getOptionLabel(option) {
            return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        },
        getOptionValue(option) {
            return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        },
        isOptionDisabled(option) {
            return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
        },
        getOptionGroupLabel(optionGroup) {
            return this.optionGroupLabel ? utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : null;
        },
        getOptionGroupChildren(optionGroup, level) {
            return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren[level]);
        },
        isOptionGroup(option, level) {
            return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
        },
        getProccessedOptionLabel(processedOption) {
            const grouped = this.isProccessedOptionGroup(processedOption);
            return grouped ? this.getOptionGroupLabel(processedOption.option, processedOption.level) : this.getOptionLabel(processedOption.option);
        },
        isProccessedOptionGroup(processedOption) {
            return utils.ObjectUtils.isNotEmpty(processedOption.children);
        },
        show(isFocus) {
            this.$emit('before-show');
            this.overlayVisible = true;
            this.activeOptionPath = this.hasSelectedOption ? this.findOptionPathByValue(this.modelValue) : this.activeOptionPath;

            if (this.hasSelectedOption && utils.ObjectUtils.isNotEmpty(this.activeOptionPath)) {
                const processedOption = this.activeOptionPath[this.activeOptionPath.length - 1];
                this.focusedOptionInfo = { index: (this.autoOptionFocus ? processedOption.index : -1), level: processedOption.level, parentKey: processedOption.parentKey };
            }
            else {
                this.focusedOptionInfo = { index: (this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1), level: 0, parentKey: '' };
            }

            isFocus && this.$refs.focusInput.focus();
        },
        hide(isFocus) {
            const _hide = () => {
                this.$emit('before-hide');
                this.overlayVisible = false;
                this.activeOptionPath = [];
                this.focusedOptionInfo = { index: -1, level: 0, parentKey: '' };

                isFocus && this.$refs.focusInput && this.$refs.focusInput.focus();
            };

            setTimeout(() => { _hide(); }, 0); // For ScreenReaders
        },
        onFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        onBlur(event) {
            this.focused = false;
            this.focusedOptionInfo = { index: -1, level: 0, parentKey: '' };
            this.searchValue = '';
            this.$emit('blur', event);
        },
        onKeyDown(event) {
            if (this.disabled || this.loading) {
                event.preventDefault();
                return;
            }

            const metaKey = event.metaKey || event.ctrlKey;

            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onArrowUpKey(event);
                    break;

                case 'ArrowLeft':
                    this.onArrowLeftKey(event);
                    break;

                case 'ArrowRight':
                    this.onArrowRightKey(event);
                    break;

                case 'Home':
                    this.onHomeKey(event);
                    break;

                case 'End':
                    this.onEndKey(event);
                    break;

                case 'Space':
                    this.onSpaceKey(event);
                    break;

                case 'Enter':
                    this.onEnterKey(event);
                    break;

                case 'Escape':
                    this.onEscapeKey(event);
                    break;

                case 'Tab':
                    this.onTabKey(event);
                    break;

                case 'PageDown':
                case 'PageUp':
                case 'Backspace':
                case 'ShiftLeft':
                case 'ShiftRight':
                    //NOOP
                    break;

                default:
                    if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                        !this.overlayVisible && this.show();
                        this.searchOptions(event, event.key);
                    }

                    break;
            }
        },
        onOptionChange(event) {
            const { originalEvent, processedOption, isFocus, isHide } = event;

            if (utils.ObjectUtils.isEmpty(processedOption)) return;

            const { index, level, parentKey, children } = processedOption;
            const grouped = utils.ObjectUtils.isNotEmpty(children);

            const activeOptionPath = this.activeOptionPath.filter(p => p.parentKey !== parentKey);
            activeOptionPath.push(processedOption);

            this.focusedOptionInfo = { index, level, parentKey };
            this.activeOptionPath = activeOptionPath;

            grouped ? this.onOptionGroupSelect(originalEvent, processedOption) : this.onOptionSelect(originalEvent, processedOption, isHide);
            isFocus && this.$refs.focusInput.focus();
        },
        onOptionSelect(event, processedOption, isHide = true) {
            const value = this.getOptionValue(processedOption.option);

            this.activeOptionPath.forEach(p => p.selected = true);
            this.updateModel(event, value);
            isHide && this.hide(true);
        },
        onOptionGroupSelect(event, processedOption) {
            this.dirty = true;
            this.$emit('group-change', { originalEvent: event, value: processedOption.option });
        },
        onContainerClick(event) {
            if (this.disabled || this.loading) {
                return;
            }

            if (!this.overlay || !this.overlay.contains(event.target)) {
                this.overlayVisible ? this.hide() : this.show();
                this.$refs.focusInput.focus();
            }

            this.$emit('click', event);
        },
        onOverlayClick(event) {
            OverlayEventBus.emit('overlay-click', {
                originalEvent: event,
                target: this.$el
            });
        },
        onOverlayKeyDown(event) {
            switch (event.code) {
                case 'Escape':
                    this.onEscapeKey(event);
                    break;
            }
        },
        onArrowDownKey(event) {
            const optionIndex = this.focusedOptionInfo.index !== -1 ? this.findNextOptionIndex(this.focusedOptionInfo.index) : this.findFirstFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex);

            !this.overlayVisible && this.show();
            event.preventDefault();
        },
        onArrowUpKey(event) {
            if (event.altKey) {
                if (this.focusedOptionInfo.index !== -1) {
                    const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                    const grouped = this.isProccessedOptionGroup(processedOption);
                    !grouped && this.onOptionChange({ originalEvent: event, processedOption });
                }

                this.overlayVisible && this.hide();
                event.preventDefault();
            }
            else {
                const optionIndex = this.focusedOptionInfo.index !== -1 ? this.findPrevOptionIndex(this.focusedOptionInfo.index) : this.findLastFocusedOptionIndex();

                this.changeFocusedOptionIndex(event, optionIndex);

                !this.overlayVisible && this.show();
                event.preventDefault();
            }
        },
        onArrowLeftKey(event) {
            if (this.overlayVisible) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                const parentOption = this.activeOptionPath.find(p => p.key === processedOption.parentKey);
                const matched = this.focusedOptionInfo.parentKey === '' || (parentOption && parentOption.key === this.focusedOptionInfo.parentKey);
                const root = utils.ObjectUtils.isEmpty(processedOption.parent);

                if (matched) {
                    this.activeOptionPath = this.activeOptionPath.filter(p => p.parentKey !== this.focusedOptionInfo.parentKey);
                }

                if (!root) {
                    this.focusedOptionInfo = { index: -1, parentKey: parentOption ? parentOption.parentKey : '' };
                    this.searchValue = '';
                    this.onArrowDownKey(event);
                }

                event.preventDefault();
            }
        },
        onArrowRightKey(event) {
            if (this.overlayVisible) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                if (grouped) {
                    const matched = this.activeOptionPath.some(p => processedOption.key === p.key);

                    if (matched) {
                        this.focusedOptionInfo = { index: -1, parentKey: processedOption.key };
                        this.searchValue = '';
                        this.onArrowDownKey(event);
                    }
                    else {
                        this.onOptionChange({ originalEvent: event, processedOption });
                    }
                }

                event.preventDefault();
            }
        },
        onHomeKey(event) {
            this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());

            !this.overlayVisible && this.show();
            event.preventDefault();
        },
        onEndKey(event) {
            this.changeFocusedOptionIndex(event, this.findLastOptionIndex());

            !this.overlayVisible && this.show();
            event.preventDefault();
        },
        onEnterKey(event) {
            if (!this.overlayVisible) {
                this.onArrowDownKey(event);
            }
            else {
                if (this.focusedOptionInfo.index !== -1) {
                    const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                    const grouped = this.isProccessedOptionGroup(processedOption);

                    this.onOptionChange({ originalEvent: event, processedOption });
                    !grouped && this.hide();
                }
            }

            event.preventDefault();
        },
        onSpaceKey(event) {
            this.onEnterKey(event);
        },
        onEscapeKey(event) {
            this.overlayVisible && this.hide(true);
            event.preventDefault();
        },
        onTabKey(event) {
            if (this.focusedOptionInfo.index !== -1) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                !grouped && this.onOptionChange({ originalEvent: event, processedOption });
            }

            this.overlayVisible && this.hide();
        },
        onOverlayEnter(el) {
            utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
            this.alignOverlay();
            this.scrollInView();
        },
        onOverlayAfterEnter() {
            this.bindOutsideClickListener();
            this.bindScrollListener();
            this.bindResizeListener();

            this.$emit('show');
        },
        onOverlayLeave() {
            this.unbindOutsideClickListener();
            this.unbindScrollListener();
            this.unbindResizeListener();

            this.$emit('hide');
            this.overlay = null;
            this.dirty = false;
        },
        onOverlayAfterLeave(el) {
            utils.ZIndexUtils.clear(el);
        },
        alignOverlay() {
            if (this.appendTo === 'self') {
                utils.DomHandler.relativePosition(this.overlay, this.$el);
            }
            else {
                this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
                utils.DomHandler.absolutePosition(this.overlay, this.$el);
            }
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
                        this.hide();
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        bindScrollListener() {
            if (!this.scrollHandler) {
                this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, () => {
                    if (this.overlayVisible) {
                        this.hide();
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        },
        unbindScrollListener() {
            if (this.scrollHandler) {
                this.scrollHandler.unbindScrollListener();
            }
        },
        bindResizeListener() {
            if (!this.resizeListener) {
                this.resizeListener = () => {
                    if (this.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                        this.hide();
                    }
                };
                window.addEventListener('resize', this.resizeListener);
            }
        },
        unbindResizeListener() {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.resizeListener = null;
            }
        },
        isOptionMatched(processedOption) {
            return this.isValidOption(processedOption) && this.getProccessedOptionLabel(processedOption).toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
        },
        isValidOption(processedOption) {
            return !!processedOption && !this.isOptionDisabled(processedOption.option);
        },
        isValidSelectedOption(processedOption) {
            return this.isValidOption(processedOption) && this.isSelected(processedOption);
        },
        isSelected(processedOption) {
            return this.activeOptionPath.some(p => p.key === processedOption.key);
        },
        findFirstOptionIndex() {
            return this.visibleOptions.findIndex(processedOption => this.isValidOption(processedOption));
        },
        findLastOptionIndex() {
            return utils.ObjectUtils.findLastIndex(this.visibleOptions, processedOption => this.isValidOption(processedOption));
        },
        findNextOptionIndex(index) {
            const matchedOptionIndex = index < (this.visibleOptions.length - 1) ? this.visibleOptions.slice(index + 1).findIndex(processedOption => this.isValidOption(processedOption)) : -1;
            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        },
        findPrevOptionIndex(index) {
            const matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), processedOption => this.isValidOption(processedOption)) : -1;
            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findSelectedOptionIndex() {
            return this.visibleOptions.findIndex(processedOption => this.isValidSelectedOption(processedOption));
        },
        findFirstFocusedOptionIndex() {
            const selectedIndex = this.findSelectedOptionIndex();
            return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        },
        findLastFocusedOptionIndex() {
            const selectedIndex = this.findSelectedOptionIndex();
            return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        },
        findOptionPathByValue(value, processedOptions, level = 0) {
            processedOptions = processedOptions || (level === 0 && this.processedOptions);

            if (!processedOptions) return null;
            if (utils.ObjectUtils.isEmpty(value)) return [];

            for (let i = 0; i < processedOptions.length; i++) {
                const processedOption = processedOptions[i];

                if (utils.ObjectUtils.equals(value, this.getOptionValue(processedOption.option), this.equalityKey)) {
                    return [processedOption];
                }

                const matchedOptions = this.findOptionPathByValue(value, processedOption.children, level + 1);
                if (matchedOptions) {
                    matchedOptions.unshift(processedOption);

                    return matchedOptions;
                }
            }
        },
        searchOptions(event, char) {
            this.searchValue = (this.searchValue || '') + char;

            let optionIndex = -1;
            let matched = false;

            if (this.focusedOptionInfo.index !== -1) {
                optionIndex = this.visibleOptions.slice(this.focusedOptionInfo.index).findIndex(processedOption => this.isOptionMatched(processedOption));
                optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionInfo.index).findIndex(processedOption => this.isOptionMatched(processedOption)) : optionIndex + this.focusedOptionInfo.index;
            }
            else {
                optionIndex = this.visibleOptions.findIndex(processedOption => this.isOptionMatched(processedOption));
            }

            if (optionIndex !== -1) {
                matched = true;
            }

            if (optionIndex === -1 && this.focusedOptionInfo.index === -1) {
                optionIndex = this.findFirstFocusedOptionIndex();
            }

            if (optionIndex !== -1) {
                this.changeFocusedOptionIndex(event, optionIndex);
            }

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.searchValue = '';
                this.searchTimeout = null;
            }, 500);

            return matched;
        },
        changeFocusedOptionIndex(event, index) {
            if (this.focusedOptionInfo.index !== index) {
                this.focusedOptionInfo.index = index;
                this.scrollInView();

                if (this.selectOnFocus) {
                    this.onOptionChange({ originalEvent: event, processedOption: this.visibleOptions[index], isHide: false });
                }
            }
        },
        scrollInView(index = -1) {
            const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
            const element = utils.DomHandler.findSingle(this.list, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
            }
        },
        autoUpdateModel() {
            if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
                this.focusedOptionInfo.index = this.findFirstFocusedOptionIndex();
                this.onOptionChange({ processedOption: this.visibleOptions[this.focusedOptionInfo.index], isHide: false });

                !this.overlayVisible && (this.focusedOptionInfo = { index: -1, level: 0, parentKey: '' });
            }
        },
        updateModel(event, value) {
            this.$emit('update:modelValue', value);
            this.$emit('change', { originalEvent: event, value });
        },
        createProcessedOptions(options, level = 0, parent = {}, parentKey = '') {
            const processedOptions = [];

            options && options.forEach((option, index) => {
                const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                const newOption = {
                    option,
                    index,
                    level,
                    key,
                    parent,
                    parentKey
                };

                newOption['children'] = this.createProcessedOptions(this.getOptionGroupChildren(option, level), level + 1, newOption, key);
                processedOptions.push(newOption);
            });

            return processedOptions;
        },
        overlayRef(el) {
            this.overlay = el;
        }
    },
    computed: {
        containerClass() {
            return ['p-cascadeselect p-component p-inputwrapper', {
                'p-disabled': this.disabled,
                'p-focus': this.focused,
                'p-inputwrapper-filled': this.modelValue,
                'p-inputwrapper-focus': this.focused || this.overlayVisible,
                'p-overlay-open': this.overlayVisible
            }];
        },
        labelClass() {
            return ['p-cascadeselect-label', {
                'p-placeholder': this.label === this.placeholder,
                'p-cascadeselect-label-empty': !this.$slots['value'] && (this.label === 'p-emptylabel' || this.label.length === 0)
            }];
        },
        panelStyleClass() {
            return ['p-cascadeselect-panel p-component', this.panelClass, {
                'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        dropdownIconClass() {
            return ['p-cascadeselect-trigger-icon', this.loading ? this.loadingIcon : 'pi pi-chevron-down'];
        },
        hasSelectedOption() {
            return utils.ObjectUtils.isNotEmpty(this.modelValue);
        },
        label() {
            const label = this.placeholder || 'p-emptylabel';

            if (this.hasSelectedOption) {
                const activeOptionPath = this.findOptionPathByValue(this.modelValue);
                const processedOption = utils.ObjectUtils.isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

                return processedOption ? this.getOptionLabel(processedOption.option) : label;
            }

            return label;
        },
        processedOptions() {
            return this.createProcessedOptions(this.options || []);
        },
        visibleOptions() {
            const processedOption = this.activeOptionPath.find(p => p.key === this.focusedOptionInfo.parentKey);
            return processedOption ? processedOption.children : this.processedOptions;
        },
        equalityKey() {
            return this.optionValue ? null : this.dataKey;
        },
        searchResultMessageText() {
            return utils.ObjectUtils.isNotEmpty(this.visibleOptions) ? this.searchMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptySearchMessageText;
        },
        searchMessageText() {
            return this.searchMessage || this.$primevue.config.locale.searchMessage || '';
        },
        emptySearchMessageText() {
            return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || '';
        },
        emptyMessageText() {
            return this.emptyMessage || this.$primevue.config.locale.emptyMessage || '';
        },
        selectionMessageText() {
            return this.selectionMessage || this.$primevue.config.locale.selectionMessage || '';
        },
        emptySelectionMessageText() {
            return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || '';
        },
        selectedMessageText() {
            return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
        },
        focusedOptionId() {
            return this.focusedOptionInfo.index !== -1 ? `${this.id}${utils.ObjectUtils.isNotEmpty(this.focusedOptionInfo.parentKey) ? '_' + this.focusedOptionInfo.parentKey : ''}_${this.focusedOptionInfo.index}` : null;
        }
    },
    components: {
        'CascadeSelectSub': script$1,
        'Portal': Portal
    }
};

const _hoisted_1 = { class: "p-hidden-accessible" };
const _hoisted_2 = ["id", "disabled", "placeholder", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_3 = {
  class: "p-cascadeselect-trigger",
  role: "button",
  tabindex: "-1",
  "aria-hidden": "true"
};
const _hoisted_4 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_5 = { class: "p-cascadeselect-items-wrapper" };
const _hoisted_6 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_CascadeSelectSub = vue.resolveComponent("CascadeSelectSub");
  const _component_Portal = vue.resolveComponent("Portal");

  return (vue.openBlock(), vue.createElementBlock("div", {
    ref: "container",
    class: vue.normalizeClass($options.containerClass),
    onClick: _cache[5] || (_cache[5] = $event => ($options.onContainerClick($event)))
  }, [
    vue.createElementVNode("div", _hoisted_1, [
      vue.createElementVNode("input", vue.mergeProps({
        ref: "focusInput",
        id: $props.inputId,
        type: "text",
        style: $props.inputStyle,
        class: $props.inputClass,
        readonly: "",
        disabled: $props.disabled,
        placeholder: $props.placeholder,
        tabindex: !$props.disabled ? $props.tabindex : -1,
        role: "combobox",
        "aria-label": _ctx.ariaLabel,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-haspopup": "tree",
        "aria-expanded": $data.overlayVisible,
        "aria-controls": $data.id + '_tree',
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFocus && $options.onFocus(...args))),
        onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args))),
        onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
      }, $props.inputProps), null, 16, _hoisted_2)
    ]),
    vue.createElementVNode("span", {
      class: vue.normalizeClass($options.labelClass)
    }, [
      vue.renderSlot(_ctx.$slots, "value", {
        value: $props.modelValue,
        placeholder: $props.placeholder
      }, () => [
        vue.createTextVNode(vue.toDisplayString($options.label), 1)
      ])
    ], 2),
    vue.createElementVNode("div", _hoisted_3, [
      vue.renderSlot(_ctx.$slots, "indicator", {}, () => [
        vue.createElementVNode("span", {
          class: vue.normalizeClass($options.dropdownIconClass)
        }, null, 2)
      ])
    ]),
    vue.createElementVNode("span", _hoisted_4, vue.toDisplayString($options.searchResultMessageText), 1),
    vue.createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: vue.withCtx(() => [
        vue.createVNode(vue.Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: vue.withCtx(() => [
            ($data.overlayVisible)
              ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                  key: 0,
                  ref: $options.overlayRef,
                  style: $props.panelStyle,
                  class: $options.panelStyleClass,
                  onClick: _cache[3] || (_cache[3] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                  onKeydown: _cache[4] || (_cache[4] = (...args) => ($options.onOverlayKeyDown && $options.onOverlayKeyDown(...args)))
                }, $props.panelProps), [
                  vue.createElementVNode("div", _hoisted_5, [
                    vue.createVNode(_component_CascadeSelectSub, {
                      id: $data.id + '_tree',
                      role: "tree",
                      "aria-orientation": "horizontal",
                      selectId: $data.id,
                      focusedOptionId: $data.focused ? $options.focusedOptionId : undefined,
                      options: $options.processedOptions,
                      activeOptionPath: $data.activeOptionPath,
                      level: 0,
                      templates: _ctx.$slots,
                      optionLabel: $props.optionLabel,
                      optionValue: $props.optionValue,
                      optionDisabled: $props.optionDisabled,
                      optionGroupLabel: $props.optionGroupLabel,
                      optionGroupChildren: $props.optionGroupChildren,
                      onOptionChange: $options.onOptionChange
                    }, null, 8, ["id", "selectId", "focusedOptionId", "options", "activeOptionPath", "templates", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "onOptionChange"]),
                    vue.createElementVNode("span", _hoisted_6, vue.toDisplayString($options.selectedMessageText), 1)
                  ])
                ], 16))
              : vue.createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 1
    }, 8, ["appendTo"])
  ], 2))
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

var css_248z = "\n.p-cascadeselect {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.p-cascadeselect-trigger {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.p-cascadeselect-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n.p-cascadeselect-label-empty {\n    overflow: hidden;\n    visibility: hidden;\n}\n.p-cascadeselect .p-cascadeselect-panel {\n    min-width: 100%;\n}\n.p-cascadeselect-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-cascadeselect-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n}\n.p-cascadeselect-item-content {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    overflow: hidden;\n    position: relative;\n}\n.p-cascadeselect-group-icon {\n    margin-left: auto;\n}\n.p-cascadeselect-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    min-width: 100%;\n}\n.p-fluid .p-cascadeselect {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.p-fluid .p-cascadeselect .p-cascadeselect-label {\n    width: 1%;\n}\n.p-cascadeselect-sublist {\n    position: absolute;\n    min-width: 100%;\n    z-index: 1;\n    display: none;\n}\n.p-cascadeselect-item-active {\n    overflow: visible !important;\n}\n.p-cascadeselect-item-active > .p-cascadeselect-sublist {\n    display: block;\n    left: 100%;\n    top: 0;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
