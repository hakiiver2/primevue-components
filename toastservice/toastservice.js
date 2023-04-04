this.primevue = this.primevue || {};
this.primevue.toastservice = (function (ToastEventBus, usetoast) {
    'use strict';

    var ToastService = {
        install: (app) => {
            const ToastService = {
                add: (message) => {
                    ToastEventBus.emit('add', message);
                },
                removeGroup: (group) => {
                    ToastEventBus.emit('remove-group', group);
                },
                removeAllGroups: () => {
                    ToastEventBus.emit('remove-all-groups');
                }
            };
            app.config.globalProperties.$toast = ToastService;
            app.provide(usetoast.PrimeVueToastSymbol, ToastService);
        }
    };

    return ToastService;

})(primevue.toasteventbus, primevue.usetoast);
