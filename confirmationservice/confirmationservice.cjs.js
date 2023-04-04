'use strict';

var ConfirmationEventBus = require('primevue/confirmationeventbus');
var useconfirm = require('primevue/useconfirm');

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

module.exports = ConfirmationService;
