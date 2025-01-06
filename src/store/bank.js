import vue from 'vue';
import vuex from 'vuex';

import bankAccountService from '../services/bankaccount.service';

vue.use(vuex);

export default new vuex.Store({
    state: () => ({
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError: 0,
    }),

    mutations: {
        updateAccountAmount(state, amount) {
            state.accountAmount = amount;
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions;
        },
        updateAccountNumberError(state, error) {
            state.accountNumberError = error;
        },
    },

    actions: {
        async getAccountAmount({ commit }) {
            console.log('récupération du solde du compte');
            let response = await bankAccountService.getAccountAmount();
            if (response.error === 0) {
                commit('updateAccountAmount', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getAccountTransactions({ commit }) {
            console.log('récupération des transactions du compte');
            let response = await bankAccountService.getAccountTransactions();
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data);
            } else {
                console.log(response.data);
            }
        },
    },
})