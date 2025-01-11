import vue from 'vue';
import vuex from 'vuex';

import bankAccountService from '../services/bankaccount.service';

vue.use(vuex);

export default ({
    namespaced: true,
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
        updateSuccessMessage(state, message) {
            state.successMessage = message;
        },

        reset(state){
            state.currentAccount = null;
            state.accountTransactions = [];
            state.successMessage = '';
        }
    },

    actions: {
        async getAccount({ commit }, accountNumber) {
            try {
                const response = await bankAccountService.getAccount(accountNumber);
                if (response.data && response.data.number) {
                    commit('updateCurrentAccount', response.data);
                    commit('updateAccountNumberError', 0);
                    return response.data
                }
                return null
            } catch (error) {
                commit('updateAccountNumberError', error.response.status);
                return null
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
            const response = await bankAccountService.validateOperation(data);
            if (response.error === 0) {
              let message = "L'opération est validée avec le n° : " + response.data + ". Vous pouvez la retrouver dans l'historique";
              commit('updateSuccessMessage', message);
              setTimeout(() => {
                commit('updateSuccessMessage', "");
              }, 5000);
            } else {
              console.error(response.data);
            }
          },
    },
})
