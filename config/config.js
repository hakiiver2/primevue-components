this.primevue = this.primevue || {};
this.primevue.config = (function (exports, vue, api) {
    'use strict';

    const defaultOptions = {
        ripple: false,
        inputStyle: 'outlined',
        locale: {
            startsWith: 'Starts with',
            contains: 'Contains',
            notContains: 'Not contains',
            endsWith: 'Ends with',
            equals: 'Equals',
            notEquals: 'Not equals',
            noFilter: 'No Filter',
            lt: 'Less than',
            lte: 'Less than or equal to',
            gt: 'Greater than',
            gte: 'Greater than or equal to',
            dateIs: 'Date is',
            dateIsNot: 'Date is not',
            dateBefore: 'Date is before',
            dateOnOrBefore: 'Date is on or before',
            dateAfter: 'Date is after',
            clear: 'Clear',
            apply: 'Apply',
            matchAll: 'Match All',
            matchAny: 'Match Any',
            addRule: 'Add Rule',
            removeRule: 'Remove Rule',
            accept: 'Yes',
            reject: 'No',
            choose: 'Choose',
            upload: 'Upload',
            cancel: 'Cancel',
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
            monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            chooseYear: 'Choose Year',
            chooseMonth: 'Choose Month',
            chooseDate: 'Choose Date',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            prevHour: 'Previous Hour',
            nextHour: 'Next Hour',
            prevMinute: 'Previous Minute',
            nextMinute: 'Next Minute',
            prevSecond: 'Previous Second',
            nextSecond: 'Next Second',
            am: 'am',
            pm: 'pm',
            today: 'Today',
            now: 'Now',
            weekHeader: 'Wk',
            firstDayOfWeek: 0,
            dateFormat: 'mm/dd/yy',
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            passwordPrompt: 'Enter a password',
            emptyFilterMessage: 'No results found', // @deprecated Use 'emptySearchMessage' option instead.
            searchMessage: '{0} results are available',
            selectionMessage: '{0} items selected',
            emptySelectionMessage: 'No selected item',
            emptySearchMessage: 'No results found',
            emptyMessage: 'No available options',
            aria: {
                trueLabel: 'True',
                falseLabel: 'False',
                nullLabel: 'Not Selected',
                star: '1 star',
                stars: '{star} stars',
                selectAll: 'All items selected',
                unselectAll: 'All items unselected',
                close: 'Close',
                previous: 'Previous',
                next: 'Next'
            },
            save: 'Save'
        },
        filterMatchModeOptions: {
            text: [
                api.FilterMatchMode.STARTS_WITH,
                api.FilterMatchMode.CONTAINS,
                api.FilterMatchMode.NOT_CONTAINS,
                api.FilterMatchMode.ENDS_WITH,
                api.FilterMatchMode.EQUALS,
                api.FilterMatchMode.NOT_EQUALS
            ],
            numeric: [
                api.FilterMatchMode.EQUALS,
                api.FilterMatchMode.NOT_EQUALS,
                api.FilterMatchMode.LESS_THAN,
                api.FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                api.FilterMatchMode.GREATER_THAN,
                api.FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
            ],
            date: [
                api.FilterMatchMode.DATE_IS,
                api.FilterMatchMode.DATE_IS_NOT,
                api.FilterMatchMode.DATE_BEFORE,
                api.FilterMatchMode.DATE_ON_OR_BEFORE,
                api.FilterMatchMode.DATE_AFTER
            ]
        },
        zIndex: {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100
        }
    };

    const PrimeVueSymbol = Symbol();

    function usePrimeVue() {
        const PrimeVue = vue.inject(PrimeVueSymbol);
        if (!PrimeVue) {
            throw new Error('PrimeVue is not installed!');
        }

        return PrimeVue;
    }

    var PrimeVue = {
        install: (app, options) => {
            let configOptions = options ? {...defaultOptions, ...options} : {...defaultOptions};
            const PrimeVue = {
                config: vue.reactive(configOptions)
            };
            app.config.globalProperties.$primevue = PrimeVue;
            app.provide(PrimeVueSymbol, PrimeVue);
        }
    };

    exports.default = PrimeVue;
    exports.usePrimeVue = usePrimeVue;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, Vue, primevue.api);
