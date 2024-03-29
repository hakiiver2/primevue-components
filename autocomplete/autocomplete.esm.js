import { UniqueComponentId, ObjectUtils, ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler } from 'primevue/utils';
import OverlayEventBus from 'primevue/overlayeventbus';
import Button from 'primevue/button';
import Ripple from 'primevue/ripple';
import VirtualScroller from 'primevue/virtualscroller';
import Portal from 'primevue/portal';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, mergeProps, createCommentVNode, Fragment, renderList, renderSlot, createElementVNode, toDisplayString, createBlock, createVNode, withCtx, Transition, createSlots, normalizeStyle, createTextVNode, withDirectives } from 'vue';

var script = {
    name: 'AutoComplete',
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'item-select', 'item-unselect', 'dropdown-click', 'clear', 'complete', 'before-show', 'before-hide', 'show', 'hide'],
    props: {
        modelValue: null,
        suggestions: {
            type: Array,
            default: null
        },
        field: { // TODO: Deprecated since v3.16.0
            type: [String,Function],
            default: null
        },
        optionLabel: null,
        optionDisabled: null,
        optionGroupLabel: null,
        optionGroupChildren: null,
        scrollHeight: {
            type: String,
            default: '200px'
        },
        dropdown: {
            type: Boolean,
            default: false
        },
        dropdownMode: {
            type: String,
            default: 'blank'
        },
        autoHighlight: { // TODO: Deprecated since v3.16.0. Use selectOnFocus property instead.
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: null
        },
        dataKey: {
            type: String,
            default: null
        },
        minLength: {
            type: Number,
            default: 1
        },
        delay: {
            type: Number,
            default: 300
        },
        appendTo: {
            type: String,
            default: 'body'
        },
        forceSelection: {
            type: Boolean,
            default: false
        },
        completeOnFocus: {
            type: Boolean,
            default: false
        },
        inputId: String,
        inputStyle: null,
        inputClass: null,
        inputProps: null,
        panelStyle: null,
        panelClass: null,
        panelProps: null,
        loadingIcon: {
            type: String,
            default: 'pi pi-spinner'
        },
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
    outsideClickListener: null,
    resizeListener: null,
    scrollHandler: null,
    overlay: null,
    virtualScroller: null,
    searchTimeout: null,
    focusOnHover: false,
    dirty: false,
    data() {
        return {
            id: UniqueComponentId(),
            focused: false,
            focusedOptionIndex: -1,
            focusedMultipleOptionIndex: -1,
            overlayVisible: false,
            searching: false
        }
    },
    watch: {
        suggestions() {
            if (this.searching) {
                ObjectUtils.isNotEmpty(this.suggestions) ? this.show() : this.hide();
                this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
                this.searching = false;
            }

            this.autoUpdateModel();
        }
    },
    mounted() {
        this.id = this.$attrs.id || this.id;

        this.autoUpdateModel();
    },
    updated() {
        if (this.overlayVisible) {
            this.alignOverlay();
        }
    },
    beforeUnmount() {
        this.unbindOutsideClickListener();
        this.unbindResizeListener();

        if (this.scrollHandler) {
            this.scrollHandler.destroy();
            this.scrollHandler = null;
        }

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    },
    methods: {
        getOptionIndex(index, fn) {
            return this.virtualScrollerDisabled ? index : (fn && fn(index)['index']);
        },
        getOptionLabel(option) {
            return this.field || this.optionLabel ? ObjectUtils.resolveFieldData(option, this.field || this.optionLabel) : option;
        },
        getOptionValue(option) {
            return option; // TODO: The 'optionValue' properties can be added.
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
        show(isFocus) {
            this.$emit('before-show');
            this.dirty = true;
            this.overlayVisible = true;
            this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : (this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1);

            isFocus && this.$refs.focusInput.focus();
        },
        hide(isFocus) {
            const _hide = () => {
                this.$emit('before-hide');
                this.dirty = isFocus;
                this.overlayVisible = false;
                this.focusedOptionIndex = -1;

                isFocus && this.$refs.focusInput && this.$refs.focusInput.focus();
            };

            setTimeout(() => { _hide(); }, 0); // For ScreenReaders
        },
        onFocus(event) {
            if (!this.dirty && this.completeOnFocus) {
                this.search(event, event.target.value, 'focus');
            }

            this.dirty = true;
            this.focused = true;
            this.focusedOptionIndex = this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
            this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
            this.$emit('focus', event);
        },
        onBlur(event) {
            this.dirty = false;
            this.focused = false;
            this.focusedOptionIndex = -1;
            this.$emit('blur', event);
        },
        onKeyDown(event) {
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

                case 'PageDown':
                    this.onPageDownKey(event);
                    break;

                case 'PageUp':
                    this.onPageUpKey(event);
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

                case 'Backspace':
                    this.onBackspaceKey(event);
                    break;
            }
        },
        onInput(event) {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            let query = event.target.value;
            if (!this.multiple) {
                this.updateModel(event, query);
            }

            if (query.length === 0) {
                this.hide();
                this.$emit('clear');
            }
            else {
                if (query.length >= this.minLength) {
                    this.focusedOptionIndex = -1;

                    this.searchTimeout = setTimeout(() => {
                        this.search(event, query, 'input');
                    }, this.delay);
                }
                else {
                    this.hide();
                }
            }
        },
        onChange(event) {
            if (this.forceSelection) {
                let valid = false;

                if (this.visibleOptions)  {
                    const matchedValue = this.visibleOptions.find(option => this.isOptionMatched(option, event.target.value));

                    if (matchedValue !== undefined) {
                        valid = true;
                        !this.isSelected(matchedValue) && this.onOptionSelect(event, matchedValue);
                    }
                }

                if (!valid) {
                    this.$refs.focusInput.value = '';
                    this.$emit('clear');
                    !this.multiple && this.updateModel(event, null);
                }
            }
        },
        onMultipleContainerFocus() {
            this.focused = true;
        },
        onMultipleContainerBlur() {
            this.focusedMultipleOptionIndex = -1;
            this.focused = false;
        },
        onMultipleContainerKeyDown(event) {
            switch (event.code) {
                case 'ArrowLeft':
                    this.onArrowLeftKeyOnMultiple(event);
                    break;

                case 'ArrowRight':
                    this.onArrowRightKeyOnMultiple(event);
                    break;

                case 'Backspace':
                    this.onBackspaceKeyOnMultiple(event);
                    break;
            }
        },
        onContainerClick(event) {
            if (this.disabled || this.searching || this.isInputClicked(event) || this.isDropdownClicked(event)) {
                return;
            }

            if (!this.overlay || !this.overlay.contains(event.target)) {
                this.$refs.focusInput.focus();
            }
        },
        onDropdownClick(event) {
            let query = undefined;

            if (this.overlayVisible) {
                this.hide(true);
            }
            else {
                this.$refs.focusInput.focus();
                query = this.$refs.focusInput.value;

                if (this.dropdownMode === 'blank')
                    this.search(event, '', 'dropdown');
                else if (this.dropdownMode === 'current')
                    this.search(event, query, 'dropdown');
            }

            this.$emit('dropdown-click', { originalEvent: event, query });
        },
        onOptionSelect(event, option, isHide = true) {
            const value = this.getOptionValue(option);

            if (this.multiple) {
                this.$refs.focusInput.value = '';

                if (!this.isSelected(option)) {
                    this.updateModel(event, [...(this.modelValue || []), value]);
                }
            }
            else {
                this.updateModel(event, value);
            }

            this.$emit('item-select', { originalEvent: event, value: option });

            isHide && this.hide(true);
        },
        onOptionMouseMove(event, index) {
            if (this.focusOnHover) {
                this.changeFocusedOptionIndex(event, index);
            }
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
            if (!this.overlayVisible) {
                return;
            }

            const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();

            this.changeFocusedOptionIndex(event, optionIndex);

            event.preventDefault();
        },
        onArrowUpKey(event) {
            if (!this.overlayVisible) {
                return;
            }

            if (event.altKey) {
                if (this.focusedOptionIndex !== -1) {
                    this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                }

                this.overlayVisible && this.hide();
                event.preventDefault();
            }
            else {
                const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();

                this.changeFocusedOptionIndex(event, optionIndex);

                event.preventDefault();
            }
        },
        onArrowLeftKey(event) {
            const target = event.currentTarget;
            this.focusedOptionIndex = -1;

            if (this.multiple) {
                if (ObjectUtils.isEmpty(target.value) && this.hasSelectedOption) {
                    this.$refs.multiContainer.focus();
                    this.focusedMultipleOptionIndex = this.modelValue.length;
                }
                else {
                    event.stopPropagation(); // To prevent onArrowLeftKeyOnMultiple method
                }
            }
        },
        onArrowRightKey(event) {
            this.focusedOptionIndex = -1;

            this.multiple && event.stopPropagation(); // To prevent onArrowRightKeyOnMultiple method
        },
        onHomeKey(event) {
            event.currentTarget.setSelectionRange(0, 0);
            this.focusedOptionIndex = -1;

            event.preventDefault();
        },
        onEndKey(event) {
            const target = event.currentTarget;
            const len = target.value.length;
            target.setSelectionRange(len, len);
            this.focusedOptionIndex = -1;

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
            if (!this.overlayVisible) {
                this.onArrowDownKey(event);
            }
            else {
                if (this.focusedOptionIndex !== -1) {
                    this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                }

                this.hide();
            }

            event.preventDefault();
        },
        onEscapeKey(event) {
            this.overlayVisible && this.hide(true);
            event.preventDefault();
        },
        onTabKey(event) {
            if (this.focusedOptionIndex !== -1) {
                this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
            }

            this.overlayVisible && this.hide();
        },
        onBackspaceKey(event) {
            if (this.multiple) {
                if (ObjectUtils.isNotEmpty(this.modelValue) && !this.$refs.focusInput.value) {
                    const removedValue = this.modelValue[this.modelValue.length - 1];
                    const newValue = this.modelValue.slice(0, -1);

                    this.$emit('update:modelValue', newValue);
                    this.$emit('item-unselect', { originalEvent: event, value: removedValue });
                }

                event.stopPropagation(); // To prevent onBackspaceKeyOnMultiple method
            }
        },
        onArrowLeftKeyOnMultiple() {
            this.focusedMultipleOptionIndex = this.focusedMultipleOptionIndex < 1 ? 0 : this.focusedMultipleOptionIndex - 1;
        },
        onArrowRightKeyOnMultiple() {
            this.focusedMultipleOptionIndex++;

            if (this.focusedMultipleOptionIndex > (this.modelValue.length - 1)) {
                this.focusedMultipleOptionIndex = -1;
                this.$refs.focusInput.focus();
            }
        },
        onBackspaceKeyOnMultiple(event) {
            if (this.focusedMultipleOptionIndex !== -1) {
                this.removeOption(event, this.focusedMultipleOptionIndex);
            }
        },
        onOverlayEnter(el) {
            ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
            this.alignOverlay();
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
        },
        onOverlayAfterLeave(el) {
            ZIndexUtils.clear(el);
        },
        alignOverlay() {
            let target = this.multiple ? this.$refs.multiContainer : this.$refs.focusInput;
            if (this.appendTo === 'self') {
                DomHandler.relativePosition(this.overlay, target);
            }
            else {
                this.overlay.style.minWidth = DomHandler.getOuterWidth(target) + 'px';
                DomHandler.absolutePosition(this.overlay, target);
            }
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.overlayVisible && this.overlay && this.isOutsideClicked(event)) {
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
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, () => {
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
                    if (this.overlayVisible && !DomHandler.isTouchDevice()) {
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
        isOutsideClicked(event) {
            return !this.overlay.contains(event.target) && !this.isInputClicked(event) && !this.isDropdownClicked(event);
        },
        isInputClicked(event) {
            if (this.multiple)
                return event.target === this.$refs.multiContainer || this.$refs.multiContainer.contains(event.target);
            else
                return event.target === this.$refs.focusInput;
        },
        isDropdownClicked(event) {
            return this.$refs.dropdownButton ? (event.target === this.$refs.dropdownButton || this.$refs.dropdownButton.$el.contains(event.target)) : false;
        },
        isOptionMatched(option, value) {
            return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.searchLocale) === value.toLocaleLowerCase(this.searchLocale);
        },
        isValidOption(option) {
            return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
        },
        isValidSelectedOption(option) {
            return this.isValidOption(option) && this.isSelected(option);
        },
        isSelected(option) {
            return ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
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
        findSelectedOptionIndex() {
            return this.hasSelectedOption ? this.visibleOptions.findIndex(option => this.isValidSelectedOption(option)) : -1;
        },
        findFirstFocusedOptionIndex() {
            const selectedIndex = this.findSelectedOptionIndex();
            return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        },
        findLastFocusedOptionIndex() {
            const selectedIndex = this.findSelectedOptionIndex();
            return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        },
        search(event, query, source) {
            //allow empty string but not undefined or null
            if (query === undefined || query === null) {
                return;
            }

            //do not search blank values on input change
            if (source === 'input' && query.trim().length === 0) {
                return;
            }

            this.searching = true;
            this.$emit('complete', { originalEvent: event, query });
        },
        removeOption(event, index) {
            const removedOption = this.modelValue[index];
            const value = this.modelValue.filter((_, i) => i !== index).map(option => this.getOptionValue(option));

            this.updateModel(event, value);
            this.$emit('item-unselect', { originalEvent: event, value: removedOption });
            this.dirty = true;
            this.$refs.focusInput.focus();
        },
        changeFocusedOptionIndex(event, index) {
            if (this.focusedOptionIndex !== index) {
                this.focusedOptionIndex = index;
                this.scrollInView();

                if (this.selectOnFocus || this.autoHighlight) {
                    this.onOptionSelect(event, this.visibleOptions[index], false);
                }
            }
        },
        scrollInView(index = -1) {
            const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
            const element = DomHandler.findSingle(this.list, `li[id="${id}"]`);
            if (element) {
                element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
            }
            else if (!this.virtualScrollerDisabled) {
                setTimeout(() => {
                    this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
                }, 0);
            }
        },
        autoUpdateModel() {
            if ((this.selectOnFocus || this.autoHighlight) && this.autoOptionFocus && !this.hasSelectedOption) {
                this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
                this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
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
        overlayRef(el) {
            this.overlay = el;
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
            return ['p-autocomplete p-component p-inputwrapper', {
                'p-disabled': this.disabled,
                'p-focus': this.focused,
                'p-autocomplete-dd': this.dropdown,
                'p-autocomplete-multiple': this.multiple,
                'p-inputwrapper-filled': this.modelValue || ObjectUtils.isNotEmpty(this.inputValue),
                'p-inputwrapper-focus': this.focused,
                'p-overlay-open': this.overlayVisible
            }];
        },
        inputStyleClass() {
            return ['p-autocomplete-input p-inputtext p-component', this.inputClass, {
                'p-autocomplete-dd-input': this.dropdown
            }];
        },
        multiContainerClass() {
            return ['p-autocomplete-multiple-container p-component p-inputtext'];
        },
        panelStyleClass() {
            return ['p-autocomplete-panel p-component', this.panelClass, {
                'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        loadingIconClass() {
            return ['p-autocomplete-loader pi-spin', this.loadingIcon];
        },
        visibleOptions() {
            return this.optionGroupLabel ? this.flatOptions(this.suggestions) : (this.suggestions || []);
        },
        inputValue() {
            if (this.modelValue) {
                if (typeof this.modelValue === 'object') {
                    const label = this.getOptionLabel(this.modelValue);
                    return label != null ? label : this.modelValue;
                }
                else {
                    return this.modelValue;
                }
            }
            else {
                return '';
            }
        },
        hasSelectedOption() {
            return ObjectUtils.isNotEmpty(this.modelValue);
        },
        equalityKey() {
            return this.dataKey; // TODO: The 'optionValue' properties can be added.
        },
        searchResultMessageText() {
            return ObjectUtils.isNotEmpty(this.visibleOptions) && this.overlayVisible ? this.searchMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptySearchMessageText;
        },
        searchMessageText() {
            return this.searchMessage || this.$primevue.config.locale.searchMessage || '';
        },
        emptySearchMessageText() {
            return this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || '';
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
        focusedMultipleOptionId() {
            return this.focusedMultipleOptionIndex !== -1 ? `${this.id}_multiple_option_${this.focusedMultipleOptionIndex}` : null;
        },
        ariaSetSize() {
            return this.visibleOptions.filter(option => !this.isOptionGroup(option)).length;
        },
        virtualScrollerDisabled() {
            return !this.virtualScrollerOptions;
        }
    },
    components: {
        'Button': Button,
        'VirtualScroller': VirtualScroller,
        'Portal': Portal
    },
    directives: {
        'ripple': Ripple
    }
};

const _hoisted_1 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_2 = ["aria-activedescendant"];
const _hoisted_3 = ["id", "aria-label", "aria-setsize", "aria-posinset"];
const _hoisted_4 = { class: "p-autocomplete-token-label" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  class: "p-autocomplete-input-token",
  role: "option"
};
const _hoisted_7 = ["id", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
const _hoisted_8 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};
const _hoisted_9 = ["id"];
const _hoisted_10 = ["id"];
const _hoisted_11 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
const _hoisted_12 = {
  role: "status",
  "aria-live": "polite",
  class: "p-hidden-accessible"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  const _component_VirtualScroller = resolveComponent("VirtualScroller");
  const _component_Portal = resolveComponent("Portal");
  const _directive_ripple = resolveDirective("ripple");

  return (openBlock(), createElementBlock("div", {
    ref: "container",
    class: normalizeClass($options.containerClass),
    onClick: _cache[15] || (_cache[15] = (...args) => ($options.onContainerClick && $options.onContainerClick(...args)))
  }, [
    (!$props.multiple)
      ? (openBlock(), createElementBlock("input", mergeProps({
          key: 0,
          ref: "focusInput",
          id: $props.inputId,
          type: "text",
          style: $props.inputStyle,
          class: $options.inputStyleClass,
          value: $options.inputValue,
          placeholder: $props.placeholder,
          tabindex: !$props.disabled ? $props.tabindex : -1,
          disabled: $props.disabled,
          autocomplete: "off",
          role: "combobox",
          "aria-label": _ctx.ariaLabel,
          "aria-labelledby": _ctx.ariaLabelledby,
          "aria-haspopup": "listbox",
          "aria-autocomplete": "list",
          "aria-expanded": $data.overlayVisible,
          "aria-controls": $data.id + '_list',
          "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
          onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFocus && $options.onFocus(...args))),
          onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args))),
          onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
          onInput: _cache[3] || (_cache[3] = (...args) => ($options.onInput && $options.onInput(...args))),
          onChange: _cache[4] || (_cache[4] = (...args) => ($options.onChange && $options.onChange(...args)))
        }, $props.inputProps), null, 16, _hoisted_1))
      : createCommentVNode("", true),
    ($props.multiple)
      ? (openBlock(), createElementBlock("ul", {
          key: 1,
          ref: "multiContainer",
          class: normalizeClass($options.multiContainerClass),
          tabindex: "-1",
          role: "listbox",
          "aria-orientation": "horizontal",
          "aria-activedescendant": $data.focused ? $options.focusedMultipleOptionId : undefined,
          onFocus: _cache[10] || (_cache[10] = (...args) => ($options.onMultipleContainerFocus && $options.onMultipleContainerFocus(...args))),
          onBlur: _cache[11] || (_cache[11] = (...args) => ($options.onMultipleContainerBlur && $options.onMultipleContainerBlur(...args))),
          onKeydown: _cache[12] || (_cache[12] = (...args) => ($options.onMultipleContainerKeyDown && $options.onMultipleContainerKeyDown(...args)))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.modelValue, (option, i) => {
            return (openBlock(), createElementBlock("li", {
              key: i,
              id: $data.id + '_multiple_option_' + i,
              class: normalizeClass(['p-autocomplete-token', {'p-focus': $data.focusedMultipleOptionIndex === i}]),
              role: "option",
              "aria-label": $options.getOptionLabel(option),
              "aria-selected": true,
              "aria-setsize": $props.modelValue.length,
              "aria-posinset": i + 1
            }, [
              renderSlot(_ctx.$slots, "chip", { value: option }, () => [
                createElementVNode("span", _hoisted_4, toDisplayString($options.getOptionLabel(option)), 1)
              ]),
              createElementVNode("span", {
                class: "p-autocomplete-token-icon pi pi-times-circle",
                onClick: $event => ($options.removeOption($event, i)),
                "aria-hidden": "true"
              }, null, 8, _hoisted_5)
            ], 10, _hoisted_3))
          }), 128)),
          createElementVNode("li", _hoisted_6, [
            createElementVNode("input", mergeProps({
              ref: "focusInput",
              id: $props.inputId,
              type: "text",
              style: $props.inputStyle,
              class: $props.inputClass,
              placeholder: $props.placeholder,
              tabindex: !$props.disabled ? $props.tabindex : -1,
              disabled: $props.disabled,
              autocomplete: "off",
              role: "combobox",
              "aria-label": _ctx.ariaLabel,
              "aria-labelledby": _ctx.ariaLabelledby,
              "aria-haspopup": "listbox",
              "aria-autocomplete": "list",
              "aria-expanded": $data.overlayVisible,
              "aria-controls": $data.id + '_list',
              "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
              onFocus: _cache[5] || (_cache[5] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              onBlur: _cache[6] || (_cache[6] = (...args) => ($options.onBlur && $options.onBlur(...args))),
              onKeydown: _cache[7] || (_cache[7] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
              onInput: _cache[8] || (_cache[8] = (...args) => ($options.onInput && $options.onInput(...args))),
              onChange: _cache[9] || (_cache[9] = (...args) => ($options.onChange && $options.onChange(...args)))
            }, $props.inputProps), null, 16, _hoisted_7)
          ])
        ], 42, _hoisted_2))
      : createCommentVNode("", true),
    ($data.searching)
      ? (openBlock(), createElementBlock("i", {
          key: 2,
          class: normalizeClass($options.loadingIconClass),
          "aria-hidden": "true"
        }, null, 2))
      : createCommentVNode("", true),
    ($props.dropdown)
      ? (openBlock(), createBlock(_component_Button, {
          key: 3,
          ref: "dropdownButton",
          type: "button",
          icon: "pi pi-chevron-down",
          class: "p-autocomplete-dropdown",
          tabindex: "-1",
          disabled: $props.disabled,
          "aria-hidden": "true",
          onClick: $options.onDropdownClick
        }, null, 8, ["disabled", "onClick"]))
      : createCommentVNode("", true),
    createElementVNode("span", _hoisted_8, toDisplayString($options.searchResultMessageText), 1),
    createVNode(_component_Portal, { appendTo: $props.appendTo }, {
      default: withCtx(() => [
        createVNode(Transition, {
          name: "p-connected-overlay",
          onEnter: $options.onOverlayEnter,
          onAfterEnter: $options.onOverlayAfterEnter,
          onLeave: $options.onOverlayLeave,
          onAfterLeave: $options.onOverlayAfterLeave
        }, {
          default: withCtx(() => [
            ($data.overlayVisible)
              ? (openBlock(), createElementBlock("div", mergeProps({
                  key: 0,
                  ref: $options.overlayRef,
                  class: $options.panelStyleClass,
                  style: {...$props.panelStyle, 'max-height': $options.virtualScrollerDisabled ? $props.scrollHeight : ''},
                  onClick: _cache[13] || (_cache[13] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                  onKeydown: _cache[14] || (_cache[14] = (...args) => ($options.onOverlayKeyDown && $options.onOverlayKeyDown(...args)))
                }, $props.panelProps), [
                  renderSlot(_ctx.$slots, "header", {
                    value: $props.modelValue,
                    suggestions: $options.visibleOptions
                  }),
                  createVNode(_component_VirtualScroller, mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                    style: {'height': $props.scrollHeight},
                    items: $options.visibleOptions,
                    tabindex: -1,
                    disabled: $options.virtualScrollerDisabled
                  }), createSlots({
                    content: withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
                      createElementVNode("ul", {
                        ref: (el) => $options.listRef(el, contentRef),
                        id: $data.id + '_list',
                        class: normalizeClass(['p-autocomplete-items', styleClass]),
                        style: normalizeStyle(contentStyle),
                        role: "listbox"
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
                                  class: "p-autocomplete-item-group",
                                  role: "option"
                                }, [
                                  renderSlot(_ctx.$slots, "optiongroup", {
                                    option: option.optionGroup,
                                    item: option.optionGroup,
                                    index: $options.getOptionIndex(i, getItemOptions)
                                  }, () => [
                                    createTextVNode(toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                                  ])
                                ], 12, _hoisted_10))
                              : withDirectives((openBlock(), createElementBlock("li", {
                                  key: 1,
                                  id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                                  style: normalizeStyle({height: itemSize ? itemSize + 'px' : undefined}),
                                  class: normalizeClass(['p-autocomplete-item', {'p-highlight': $options.isSelected(option), 'p-focus': $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), 'p-disabled': $options.isOptionDisabled(option)}]),
                                  role: "option",
                                  "aria-label": $options.getOptionLabel(option),
                                  "aria-selected": $options.isSelected(option),
                                  "aria-disabled": $options.isOptionDisabled(option),
                                  "aria-setsize": $options.ariaSetSize,
                                  "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                                  onClick: $event => ($options.onOptionSelect($event, option)),
                                  onMousemove: $event => ($options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions)))
                                }, [
                                  (_ctx.$slots.option)
                                    ? renderSlot(_ctx.$slots, "option", {
                                        key: 0,
                                        option: option,
                                        index: $options.getOptionIndex(i, getItemOptions)
                                      }, () => [
                                        createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                                      ])
                                    : renderSlot(_ctx.$slots, "item", {
                                        key: 1,
                                        item: option,
                                        index: $options.getOptionIndex(i, getItemOptions)
                                      }, () => [
                                        createTextVNode(toDisplayString($options.getOptionLabel(option)), 1)
                                      ])
                                ], 46, _hoisted_11)), [
                                  [_directive_ripple]
                                ])
                          ], 64))
                        }), 128))
                      ], 14, _hoisted_9),
                      createElementVNode("span", _hoisted_12, toDisplayString($options.selectedMessageText), 1)
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
                  ]), 1040, ["style", "items", "disabled"]),
                  renderSlot(_ctx.$slots, "footer", {
                    value: $props.modelValue,
                    suggestions: $options.visibleOptions
                  })
                ], 16))
              : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
      ]),
      _: 3
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

var css_248z = "\n.p-autocomplete {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    position: relative;\n}\n.p-autocomplete-loader {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n.p-autocomplete-dd .p-autocomplete-input {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    width: 1%;\n}\n.p-autocomplete-dd .p-autocomplete-input,\n.p-autocomplete-dd .p-autocomplete-multiple-container {\n     border-top-right-radius: 0;\n     border-bottom-right-radius: 0;\n}\n.p-autocomplete-dd .p-autocomplete-dropdown {\n     border-top-left-radius: 0;\n     border-bottom-left-radius: 0px;\n}\n.p-autocomplete .p-autocomplete-panel {\n    min-width: 100%;\n}\n.p-autocomplete-panel {\n    position: absolute;\n    overflow: auto;\n    top: 0;\n    left: 0;\n}\n.p-autocomplete-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-autocomplete-item {\n    cursor: pointer;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-autocomplete-multiple-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    cursor: text;\n    overflow: hidden;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.p-autocomplete-token {\n    cursor: default;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 0;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n.p-autocomplete-token-icon {\n    cursor: pointer;\n}\n.p-autocomplete-input-token {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.p-autocomplete-input-token input {\n    border: 0 none;\n    outline: 0 none;\n    background-color: transparent;\n    margin: 0;\n    padding: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    border-radius: 0;\n    width: 100%;\n}\n.p-fluid .p-autocomplete {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.p-fluid .p-autocomplete-dd .p-autocomplete-input {\n    width: 1%;\n}\n";
styleInject(css_248z);

script.render = render;

export { script as default };
