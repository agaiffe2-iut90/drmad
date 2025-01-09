import vue from 'vue';
import vuex from 'vuex';

import bankAccountService from '../services/bankaccount.service';

vue.use(vuex);

export default new vuex.Store({
    state: () => ({
        currentAccount: null,
        accountTransactions: [],
        successMessage: '',
    }),

    mutations: {
        updateCurrentAccount(state, account) {
            state.currentAccount = account;
        },
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
        async getAccount({ commit }, accountNumber) {
            try {
                const response = await bankAccountService.getAccount(accountNumber);
                commit('updateCurrentAccount', response.data);
                commit('updateAccountNumberError', 0);
            } catch (error) {
                commit('updateAccountNumberError', error.response.status);
            }
        },

        async getTransactions({ commit }, accountNumber) {
            try {
                const response = await bankAccountService.getTransactions(accountNumber);
                commit('updateAccountTransactions', response.data);
            } catch (error) {
                console.error(error);
            }
        },

        async createWithdraw({ commit }, data) {
            try {
                const response = await bankAccountService.createWithdraw(data);
                commit('updateCurrentAccount', response.data);
            } catch (error) {
                console.error(error);
            }
        },

        async createPayment({ commit }, data) {
            try {
                const response = await bankAccountService.createPayment(data);
                commit('updateCurrentAccount', response.data);
            } catch (error) {
                console.error(error);
            }
        },

        async validateOperation({ commit }, data) {
            try {
                const response = await bankAccountService.validateOperation(data);
                commit('updateCurrentAccount', response.data);
                commit('updateAccountAmount', response.data.amount);
                commit('updateAccountTransactions', response.data.transactions);
                commit('updateSuccessMessage', response.data.message);
            } catch (error) {
                console.error(error);
            }
        },
    },
})