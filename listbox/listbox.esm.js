import { UniqueComponentId, ObjectUtils, DomHandler } from 'primevue/utils';
import { FilterService } from 'primevue/api';
import Ripple from 'primevue/ripple';
import VirtualScroller from 'primevue/virtualscroller';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, createElementVNode, renderSlot, withDirectives, mergeProps, vModelText, toDisplayString, createCommentVNode, normalizeStyle, createVNode, createSlots, withCtx, Fragment, renderList, createTextVNode } from 'vue';

var script = {
    name: 'Listbox',
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'filter'],
    props: {
        modelValue: null,
        options: Array,
        optionLabel: null,
        optionValue: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
		listStyle: null,
        disabled: Boolean,
        dataKey: null,
        multiple: Boolean,
        metaKeySelection: Boolean,
        filter: Boolean,
        filterPlaceholder: String,
        filterLocale: String,
        filterMatchMode: {
            type: String,
            default: 'contains'
        },
        filterFields: {
            type: Array,
            default: null
        },
        filterInputProps: null,
        virtualScrollerOptions: {
            type: Object,
            default: null
        },
        autoOptionFocus: {
            type: Boolean,
            default: true
        },
        selectOnFocus: {
            type: Boolean,
            default: false
        },
        filterMessage: {
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
        emptyFilterMessage: {
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
        'aria-label': {
            type: String,
            default: null
        },
        'aria-labelledby': {
            type: String,
            default: null
        }
    },
    list: null,
    virtualScroller: null,
    optionTouched: false,
    startRangeIndex: -1,
    searchTimeout: null,
    searchValue: '',
    focusOnHover: false,
    data() {
        return {
            id: UniqueComponentId(),
            filterValue: null,
            focused: false,
            focusedOptionIndex: -1
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
    methods: {
        getOptionIndex(index, fn) {
            return this.virtualScrollerDisabled ? index : (fn && fn(index)['index']);
        },
        getOptionLabel(option) {
            return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        },
        getOptionValue(option) {
            return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        },
        getOptionRenderKey(option, index) {
            return (this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + '_' + index;
        },
        isOptionDisabled(option) {
            return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
        },
        isOptionGroup(option) {
            return this.optionGroupLabel && option.optionGroup && option.group;
        },
        getOptionGroupLabel(optionGroup) {
            return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
        },
        getOptionGroupChildren(optionGroup) {
            return ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
        },
        getAriaPosInset(index) {
            return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(option => this.isOptionGroup(option)).length : index) + 1;
        },
        onFirstHiddenFocus() {
            this.list.focus();

            const firstFocusableEl = DomHandler.getFirstFocusableElement(this.$el, ':not(.p-hidden-focusable)');
            this.$refs.lastHiddenFocusableElement.tabIndex = ObjectUtils.isEmpty(firstFocusableEl) ? -1 : undefined;
            this.$refs.firstHiddenFocusableElement.tabIndex = -1;
        },
        onLastHiddenFocus(event) {
            const relatedTarget = event.relatedTarget;

            if (relatedTarget === this.list) {
                const firstFocusableEl = DomHandler.getFirstFocusableElement(this.$el, ':not(.p-hidden-focusable)');
                firstFocusableEl && firstFocusableEl.focus();
                this.$refs.firstHiddenFocusableElement.tabIndex = undefined;
            }
            else {
                this.$refs.firstHiddenFocusableElement.focus();
            }

            this.$refs.lastHiddenFocusableElement.tabIndex = -1;
        },
        onFocusout(event) {
            if (!this.$el.contains(event.relatedTarget) && this.$refs.lastHiddenFocusableElement && this.$refs.firstHiddenFocusableElement) {
                this.$refs.lastHiddenFocusableElement.tabIndex = this.$refs.firstHiddenFocusableElement.tabIndex = undefined;
            }
        },
        onListFocus(event) {
            this.focused = true;
            this.focusedOptionIndex = this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
            this.$emit('focus', event);
        },
        onListBlur(event) {
            this.focused = false;
            this.focusedOptionIndex = this.startRangeIndex = -1;
            this.searchValue = '';
            this.$emit('blur', event);
        },
        onListKeyDown(event) {
            const metaKey = event.metaKey || event.ctrlKey;

            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onArrowUpKey(event);
                    break;

                case 'Home':
                    this.onHomeKey(event);
                    break;

                case 'End':
                    this.onEndKey(event);
                    break;

                case 'PageDown':
                    this.onPageDownKey(event);
                    break;

                case 'PageUp':
                    this.onPageUpKey(event);
                    break;

                case 'Enter':
                case 'Space':
                    this.onSpaceKey(event);
                    break;

                case 'Tab':
                    //NOOP
                    break;

                case 'ShiftLeft':
                case 'ShiftRight':
                    this.onShiftKey(event);
                    break;

                default:
                    if (this.multiple && event.code === 'KeyA' && metaKey) {
                        const value = this.visibleOptions.filter(option => this.isValidOption(option)).map(option => this.getOptionValue(option));
                        this.updateModel(event, value);

                        event.preventDefault();
                        break;
                    }

                    if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
                        this.searchOptions(event, event.key);
                        event.preventDefault();
                    }

                    break;
            }
        },
        onOptionSelect(event, option, index = -1) {
            if (this.disabled || this.isOptionDisabled(option)) {
                return;
            }

            this.multiple ? this.onOptionSelectMultiple(event, option) : this.onOptionSelectSingle(event, option);
            this.optionTouched = false;
            index !== -1 && (this.focusedOptionIndex = index);
        },
        onOptionMouseMove(event, index) {
            if (this.focusOnHover) {
                this.changeFocusedOptionIndex(event, index);
            }
        },
        onOptionTouchEnd() {
            if (this.disabled) {
                return;
            }

            this.optionTouched = true;
        },
        onOptionSelectSingle(event, option) {
            let selected = this.isSelected(option);
            let valueChanged = false;
            let value = null;
            let metaSelection = this.optionTouched ? false : this.metaKeySelection;

            if (metaSelection) {
                let metaKey = (event.metaKey || event.ctrlKey);

                if (selected) {
                    if (metaKey) {
                        value = null;
                        valueChanged = true;
                    }
                }
                else {
                    value = this.getOptionValue(option);
                    valueChanged = true;
                }
            }
            else {
                value = selected ? null : this.getOptionValue(option);
                valueChanged = true;
            }

            if (valueChanged) {
                this.updateModel(event, value);
            }
        },
        onOptionSelectMultiple(event, option) {
            let selected = this.isSelected(option);
            let value = null;
            let metaSelection = this.optionTouched ? false : this.metaKeySelection;

            if (metaSelection) {
                let metaKey = (event.metaKey || event.ctrlKey);

                if (selected) {
                    value = metaKey ? this.removeOption(option) : [this.getOptionValue(option)];
                }
                else {
                    value = (metaKey) ? this.modelValue || [] : [];
                    value = [...value, this.getOptionValue(option)];
                }
            }
            else {
                value = selected ? this.removeOption(option) : [...this.modelValue || [], this.getOptionValue(option)];
            }

            this.updateModel(event, value);
        },
        onOptionSelectRange(event, start = -1, end = -1) {
            start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
            end === -1 && (end = this.findNearestSelectedOptionIndex(start));

            if (start !== -1 && end !== -1) {
                const rangeStart = Math.min(start, end);
                const rangeEnd = Math.max(start, end);
                const value = this.visibleOptions.slice(rangeStart, rangeEnd + 1).filter(option => this.isValidOption(option)).map(option => this.getOptionValue(option));

                this.updateModel(event, value);
            }
        },
        onFilterChange(event) {
            this.$emit('filter', {originalEvent: event, value: event.target.value});
            this.focusedOptionIndex = this.startRangeIndex = -1;
        },
        onFilterBlur() {
            this.focusedOptionIndex = this.startRangeIndex = -1;
        },
        onFilterKeyDown(event) {
            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onArrowUpKey(event);
                    break;

                case 'ArrowLeft':
                case 'ArrowRight':
                    this.onArrowLeftKey(event, true);
                    break;

                case 'Home':
                    this.onHomeKey(event, true);
                    break;

                case 'End':
                    this.onEndKey(event, true);
                    break;

                case 'Enter':
                    this.onEnterKey(event);
                    break;

                case 'ShiftLeft':
                case 'ShiftRight':
                    this.onShiftKey(event);
                    break;
            }
        },
        onArrowDownKey(event) {
            const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();

            if (this.multiple && event.shiftKey) {
                this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
            }

            this.changeFocusedOptionIndex(event, optionIndex);
            event.preventDefault();
        },
        onArrowUpKey(event) {
            const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();

            if (this.multiple && event.shiftKey) {
                this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
            }

            this.changeFocusedOptionIndex(event, optionIndex);
            event.preventDefault();
        },
        onArrowLeftKey(event, pressedInInputText = false) {
            pressedInInputText && (this.focusedOptionIndex = -1);
        },
        onHomeKey(event, pressedInInputText = false) {
            if (pressedInInputText) {
                event.currentTarget.setSelectionRange(0, 0);
                this.focusedOptionIndex = -1;
            }
            else {
                let metaKey = event.metaKey || event.ctrlKey;
                let optionIndex = this.findFirstOptionIndex();

                if (this.multiple && event.shiftKey && metaKey) {
                    this.onOptionSelectRange(event, optionIndex, this.startRangeIndex);
                }

                this.changeFocusedOptionIndex(event, optionIndex);
            }

            event.preventDefault();
        },
        onEndKey(event, pressedInInputText = false) {
            if (pressedInInputText) {
                const target = event.currentTarget;
                const len = target.value.length;
                target.setSelectionRange(len, len);
                this.focusedOptionIndex = -1;
            }
            else {
                let metaKey = event.metaKey || event.ctrlKey;
                let optionIndex = this.findLastOptionIndex();

                if (this.multiple && event.shiftKey && metaKey) {
                    this.onOptionSelectRange(event, this.startRangeIndex, optionIndex);
                }

                this.changeFocusedOptionIndex(event, optionIndex);
            }

            event.preventDefault();
        },
        onPageUpKey(event) {
            this.scrollInView(0);
            event.preventDefault();
        },
        onPageDownKey(event) {
            this.scrollInView(this.visibleOptions.length - 1);
            event.preventDefault();
        },
        onEnterKey(event) {
            if (this.focusedOptionIndex !== -1) {
                if (this.multiple && event.shiftKey)
                    this.onOptionSelectRange(event, this.focusedOptionIndex);
                else
                    this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
            }

            event.preventDefault();
        },
        onSpaceKey(event) {
            this.onEnterKey(event);
        },
        onShiftKey() {
            this.startRangeIndex = this.focusedOptionIndex;
        },
        isOptionMatched(option) {
            return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
        },
        isValidOption(option) {
            return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
        },
        isValidSelectedOption(option) {
            return this.isValidOption(option) && this.isSelected(option);
        },
        isSelected(option) {
            const optionValue = this.getOptionValue(option);

            if (this.multiple)
                return (this.modelValue || []).some(value => ObjectUtils.equals(value, optionValue, this.equalityKey));
            else
                return ObjectUtils.equals(this.modelValue, optionValue, this.equalityKey);
        },
        findFirstOptionIndex() {
            return this.visibleOptions.findIndex(option => this.isValidOption(option));
        },
        findLastOptionIndex() {
            return ObjectUtils.findLastIndex(this.visibleOptions, option => this.isValidOption(option));
        },
        findNextOptionIndex(index) {
            const matchedOptionIndex = index < (this.visibleOptions.length - 1) ? this.visibleOptions.slice(index + 1).findIndex(option => this.isValidOption(option)) : -1;
            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        },
        findPrevOptionIndex(index) {
            const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), option => this.isValidOption(option)) : -1;
            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findFirstSelectedOptionIndex() {
            return this.hasSelectedOption ? this.visibleOptions.findIndex(option => this.isValidSelectedOption(option)) : -1;
        },
        findLastSelectedOptionIndex() {
            return this.hasSelectedOption ? ObjectUtils.findLastIndex(this.visibleOptions, option => this.isValidSelectedOption(option)) : -1;
        },
        findNextSelectedOptionIndex(index) {
            const matchedOptionIndex = this.hasSelectedOption && index < (this.visibleOptions.length - 1) ? this.visibleOptions.slice(index + 1).findIndex(option => this.isValidSelectedOption(option)) : -1;
            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
        },
        findPrevSelectedOptionIndex(index) {
            const matchedOptionIndex = this.hasSelectedOption && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), option => this.isValidSelectedOption(option)) : -1;
            return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
        },
        findNearestSelectedOptionIndex(index, firstCheckUp = false) {
            let matchedOptionIndex = -1;

            if (this.hasSelectedOption) {
                if (firstCheckUp) {
                    matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
                    matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
                }
                else {
                    matchedOptionIndex = this.findNextSelectedOptionIndex(index);
                    matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
                }
            }

            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        },
        findFirstFocusedOptionIndex() {
            const selectedIndex = this.findFirstSelectedOptionIndex();
            return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        },
        findLastFocusedOptionIndex() {
            const selectedIndex = this.findLastSelectedOptionIndex();
            return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        },
        searchOptions(event, char) {
            this.searchValue = (this.searchValue || '') + char;

            let optionIndex = -1;
            if (this.focusedOptionIndex !== -1) {
                optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(option => this.isOptionMatched(option));
                optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(option => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex;
            }
            else {
                optionIndex = this.visibleOptions.findIndex(option => this.isOptionMatched(option));
            }

            if (optionIndex === -1 && this.focusedOptionIndex === -1) {
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
        },
        removeOption(option) {
            return this.modelValue.filter(val => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey));
        },
        changeFocusedOptionIndex(event, index) {
            if (this.focusedOptionIndex !== index) {
                this.focusedOptionIndex = index;
                this.scrollInView();

                if (this.selectOnFocus && !this.multiple) {
                    this.onOptionSelect(event, this.visibleOptions[index]);
                }
            }
        },
        scrollInView(index = -1) {
            const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
            const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
            else if (!this.virtualScrollerDisabled) {
                this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
            }
        },
        autoUpdateModel() {
            if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption && !this.multiple) {
                this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
                this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex]);
            }
        },
        updateModel(event, value) {
            this.$emit('update:modelValue', value);
            this.$emit('change', { originalEvent: event, value });
        },
        flatOptions(options) {
            return (options || []).reduce((result, option, index) => {
                result.push({ optionGroup: option, group: true, index });

                const optionGroupChildren = this.getOptionGroupChildren(option);
                optionGroupChildren && optionGroupChildren.forEach(o => result.push(o));

                return result;
            }, []);
        },
        listRef(el, contentRef) {
            this.list = el;
            contentRef && contentRef(el); // For VirtualScroller
        },
        virtualScrollerRef(el) {
            this.virtualScroller = el;
        }
    },
    computed: {
        containerClass() {
            return ['p-listbox p-component', {
                'p-focus': this.focused,
                'p-disabled': this.disabled
            }];
        },
        visibleOptions() {
            const options = this.optionGroupLabel ? this.flatOptions(this.options) : (this.options || []);

            return this.filterValue ? FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale) : options;
        },
        hasSelectedOption() {
            return ObjectUtils.isNotEmpty(this.modelValue);
        },
        equalityKey() {
            return this.optionValue ? null : this.dataKey;
        },
        searchFields() {
            return this.filterFields || [this.optionLabel];
        },
        filterResultMessageText() {
            return ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptyFilterMessageText;
        },
        filterMessageText() {
            return this.filterMessage || this.$primevue.config.locale.searchMessage || '';
        },
        emptyFilterMessageText() {
            return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || '';
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
            return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', this.multiple ? this.modelValue.length : '1') : this.emptySelectionMessageText;
        },
        focusedOptionId() {
            return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
        },
        ariaSetSize() {
            return this.visibleOptions.filter(option => !this.isOptionGroup(option)).length;
        },
        virtualScrollerDisabled() {
            return !this.virtualScrollerOptions;
        }
    },
    directives: {
        'ripple': Ripple
    },
    components: {
        'VirtualScroller': VirtualScroller
    }
};

const _hoisted_1 = ["id"];
const _hoisted_2 = ["tabindex"];
const _hoisted_3 = {
  key: 0,
  class: "p-listbox-header"
};
const _hoisted_4 = { class: "p-listbox-filter-container" };
const _hoisted_5 = ["placeholder", "aria-owns", "aria-activedescendant", "tabindex"];
const _hoisted_6 = /*#__PURE__*/createElementVNode("span", { class: "p-listbox-filter-icon pi pi-search" }, null, -1);
const _hoisted_7 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_8 = ["id", "aria-multiselectable", "aria-label", "aria-labelledby", "aria-activedescendant", "aria-disabled"];
const _hoisted_9 = ["id"];
const _hoisted_10 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
const _hoisted_11 = {
  key: 0,
  class: "p-listbox-empty-message",
  role: "option"
};
const _hoisted_12 = {
  key: 1,
  class: "p-listbox-empty-message",
  role: "option"
};
const _hoisted_13 = {
  key: 0,
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_14 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_15 = ["tabindex"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VirtualScroller = resolveComponent("VirtualScroller");
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("div", {
    id: $data.id,
    class: normalizeClass($options.containerClass),
    onFocusout: _cache[10] || (_cache[10] = (...args) => ($options.onFocusout && $options.onFocusout(...args)))
  }, [
    createElementVNode("span", {
      ref: "firstHiddenFocusableElement",
      role: "presentation",
      "aria-hidden": "true",
      class: "p-hidden-accessible p-hidden-focusable",
      tabindex: !$props.disabled ? $props.tabindex : -1,
      onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFirstHiddenFocus && $options.onFirstHiddenFocus(...args)))
    }, null, 40, _hoisted_2),
    renderSlot(_ctx.$slots, "header", {
      value: $props.modelValue,
      options: $options.visibleOptions
    }),
    ($props.filter)
      ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createElementVNode("div", _hoisted_4, [
            withDirectives(createElementVNode("input", mergeProps({
              ref: "filterInput",
              type: "text",
              class: "p-listbox-filter p-inputtext p-component",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (($data.filterValue) = $event)),
              placeholder: $props.filterPlaceholder,
              role: "searchbox",
              autocomplete: "off",
              "aria-owns": $data.id + '_list',
              "aria-activedescendant": $options.focusedOptionId,
              tabindex: !$props.disabled && !$data.focused ? $props.tabindex : -1,
              onInput: _cache[2] || (_cache[2] = (...args) => ($options.onFilterChange && $options.onFilterChange(...args))),
              onBlur: _cache[3] || (_cache[3] = (...args) => ($options.onFilterBlur && $options.onFilterBlur(...args))),
              onKeydown: _cache[4] || (_cache[4] = (...args) => ($options.onFilterKeyDown && $options.onFilterKeyDown(...args)))
            }, $props.filterInputProps), null, 16, _hoisted_5), [
              [vModelText, $data.filterValue]
            ]),
            _hoisted_6
          ]),
          createElementVNode("span", _hoisted_7, toDisplayString($options.filterResultMessageText), 1)
        ]))
      : createCommentVNode("", true),
    createElementVNode("div", {
      ref: "listWrapper",
      class: "p-listbox-list-wrapper",
      style: normalizeStyle($props.listStyle)
    }, [
      createVNode(_component_VirtualScroller, mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
        style: $props.listStyle,
        items: $options.visibleOptions,
        tabindex: -1,
        disabled: $options.virtualScrollerDisabled
      }), createSlots({
        content: withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
          createElementVNode("ul", {
            ref: (el) => $options.listRef(el, contentRef),
            id: $data.id + '_list',
            class: normalizeClass(['p-listbox-list', styleClass]),
            style: normalizeStyle(contentStyle),
            tabindex: -1,
            role: "listbox",
            "aria-multiselectable": $props.multiple,
            "aria-label": _ctx.ariaLabel,
            "aria-labelledby": _ctx.ariaLabelledby,
            "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
            "aria-disabled": $props.disabled,
            onFocus: _cache[6] || (_cache[6] = (...args) => ($options.onListFocus && $options.onListFocus(...args))),
            onBlur: _cache[7] || (_cache[7] = (...args) => ($options.onListBlur && $options.onListBlur(...args))),
            onKeydown: _cache[8] || (_cache[8] = (...args) => ($options.onListKeyDown && $options.onListKeyDown(...args)))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(items, (option, i) => {
              return (openBlock(), createElementBlock(Fragment, {
                key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
              }, [
                ($options.isOptionGroup(option))
                  ? (openBlock(), createElementBlock("li", {
                      key: 0,
                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                      style: normalizeStyle({height: itemSize ? itemSize + 'px' : undefined}),
                      class: "p-listbox-item-group",
                      role: "option"
                    }, [
                      renderSlot(_ctx.$slots, "optiongroup", {
                        option: option.optionGroup,
                        index: $options.getOptionIndex(i, getItemOptions)
                      }, () => [
                        createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                      ])
                    ], 12, _hoisted_9))
                  : withDirectives((openBlock(), createElementBlock("li", {
                      key: 1,
                      id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                      style: normalizeStyle({height: itemSize ? itemSize + 'px' : undefined}),
                      class: normalizeClass(['p-listbox-item', {'p-highlight': $options.isSelected(option), 'p-focus': $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), 'p-disabled': $options.isOptionDisabled(option)}]),
                      role: "option",
                      "aria-label": $options.getOptionLabel(option),
                      "aria-selected": $options.isSelected(option),
                      "aria-disabled": $options.isOptionDisabled(option),
                      "aria-setsize": $options.ariaSetSize,
                      "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                      onClick: $event => ($options.onOptionSelect($event, option, $options.getOptionIndex(i, getItemOptions))),
                      onMousemove: $event => ($options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions))),
                      onTouchend: _cache[5] || (_cache[5] = $event => ($options.onOptionTouchEnd()))
                    }, [
                      renderSlot(_ctx.$slots, "option", {
                        option: option,
                        index: $options.getOptionIndex(i, getItemOptions)
                      }, () => [
                        createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                      ])
                    ], 46, _hoisted_10)), [
                      [_directive_ripple]
                    ])
              ], 64))
            }), 128)),
            ($data.filterValue && (!items || (items && items.length === 0)))
              ? (openBlock(), createElementBlock("li", _hoisted_11, [
                  renderSlot(_ctx.$slots, "emptyfilter", {}, () => [
                    createTextVNode(toDisplayString($options.emptyFilterMessageText), 1)
                  ])
                ]))
              : ((!$props.options || ($props.options && $props.options.length === 0)))
                ? (openBlock(), createElementBlock("li", _hoisted_12, [
                    renderSlot(_ctx.$slots, "empty", {}, () => [
                      createTextVNode(toDisplayString($options.emptyMessageText), 1)
                    ])
                  ]))
                : createCommentVNode("", true)
          ], 46, _hoisted_8),
          ((!$props.options || ($props.options && $props.options.length === 0)))
            ? (openBlock(), createElementBlock("span", _hoisted_13, toDisplayString($options.emptyMessageText), 1))
            : createCommentVNode("", true),
          createElementVNode("span", _hoisted_14, toDisplayString($options.selectedMessageText), 1)
        ]),
        _: 2
      }, [
        (_ctx.$slots.loader)
          ? {
              name: "loader",
              fn: withCtx(({ options }) => [
                renderSlot(_ctx.$slots, "loader", { options: options })
              ])
            }
          : undefined
      ]), 1040, ["style", "items", "disabled"])
    ], 4),
    renderSlot(_ctx.$slots, "footer", {
      value: $props.modelValue,
      options: $options.visibleOptions
    }),
    createElementVNode("span", {
      ref: "lastHiddenFocusableElement",
      role: "presentation",
      "aria-hidden": "true",
      class: "p-hidden-accessible p-hidden-focusable",
      tabindex: !$props.disabled ? $props.tabindex : -1,
      onFocus: _cache[9] || (_cache[9] = (...args) => ($options.onLastHiddenFocus && $options.onLastHiddenFocus(...args)))
    }, null, 40, _hoisted_15)
  ], 42, _hoisted_1))
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

var css_248z = "\n.p-listbox-list-wrapper {\n    overflow: auto;\n}\n.p-listbox-list {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n}\n.p-listbox-item {\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.p-listbox-item-group {\n    cursor: auto;\n}\n.p-listbox-filter-container {\n    position: relative;\n}\n.p-listbox-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-listbox-filter {\n    width: 100%;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
