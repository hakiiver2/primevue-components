'use strict';

var vue = require('vue');

const PrimeVueConfirmSymbol = Symbol();

function useConfirm() {
    const PrimeVueConfirm = vue.inject(PrimeVueConfirmSymbol);
    if (!PrimeVueConfirm) {
        throw new Error('No PrimeVue Confirmation provided!');
    } 

    return PrimeVueConfirm;
}

exports.PrimeVueConfirmSymbol = PrimeVueConfirmSymbol;
exports.useConfirm = useConfirm;
