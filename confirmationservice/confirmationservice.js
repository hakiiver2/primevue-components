this.primevue = this.primevue || {};
this.primevue.confirmationservice = (function (ConfirmationEventBus, useconfirm) {
    'use strict';

    var ConfirmationService = {
        install: (app) => {
            const ConfirmationService = {
                require: (options) => {
                    ConfirmationEventBus.emit('confirm', options);
                },
                close: () => {
                    ConfirmationEventBus.emit('close');
                }
            };
            app.config.globalProperties.$confirm = ConfirmationService;
            app.provide(useconfirm.PrimeVueConfirmSymbol, ConfirmationService);
        }
    };

    return ConfirmationService;

})(primevue.confirmationeventbus, primevue.useconfirm);
