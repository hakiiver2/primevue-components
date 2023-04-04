this.primevue = this.primevue || {};
this.primevue.dialogservice = (function (vue, usedialog, DynamicDialogEventBus) {
    'use strict';

    var DialogService = {
        install: (app) => {
            const DialogService = {
                open: (content, options) => {
                    const instance = {
                        content: content && vue.markRaw(content),
                        options: options || {},
                        data: options && options.data,
                        close: (params) => {
                            DynamicDialogEventBus.emit('close', { instance, params });
                        }
                    };

                    DynamicDialogEventBus.emit('open', { instance });

                    return instance;
                }
            };

            app.config.unwrapInjectedRef = true; // Remove it after Vue 3.3. Details: https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity
            app.config.globalProperties.$dialog = DialogService;
            app.provide(usedialog.PrimeVueDialogSymbol, DialogService);
        }
    };

    return DialogService;

})(Vue, primevue.usedialog, primevue.dynamicdialogeventbus);
