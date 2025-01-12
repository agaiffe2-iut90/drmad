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
        errorMessage: '',
    }),

    mutations: {
        updateCurrentAccount(state, account) {
            state.currentAccount = account;
        },
        updateAccountTransactions(state, transactions) {
            state.accountTransactions = transactions;
        },
        updateSuccessMessage(state, message) {
            state.successMessage = message;
        },
        updateErrorMessage(state, message) {
            state.errorMessage = message;
        },
        reset(state) {
            state.currentAccount = null;
            state.accountTransactions = [];
            state.successMessage = '';
            state.errorMessage = '';
        },
    },

    actions: {
        async getAccount({ commit }, accountNumber) {
            try {
                const response = await bankAccountService.getAccount(accountNumber);
                if (response.data?.number) {
                    commit('updateCurrentAccount', response.data);
                    commit('updateErrorMessage', '');
                } else {
                    commit('updateErrorMessage', 'Compte introuvable.');
                }
            } catch (error) {
                commit('updateErrorMessage', 'Erreur lors de la récupération du compte.');
                console.error(error);
            }
        },

        async getTransactions({ commit }, accountNumber) {
            try {
                const response = await bankAccountService.getTransactions(accountNumber);
                const formattedTransactions = response.data.map(transaction => ({
                    ...transaction,
                    date: transaction.date.$date || transaction.date,
                    direction: transaction.amount < 0 ? 'S' : 'D',
                }));
                commit('updateAccountTransactions', formattedTransactions);
                commit('updateErrorMessage', '');
            } catch (error) {
                commit('updateErrorMessage', 'Erreur lors de la récupération des transactions.');
                console.error(error);
            }
        },

        async validateOperation({ commit }, data) {
            if (!data.currentAccount || !data.amount) {
                console.error("Données incomplètes pour l'opération.");
                return;
            }
        
            try {
                const response = await bankAccountService.validateOperation(data);
        
                // Inspecte la réponse pour confirmation
                console.log('Structure de response.data :', response.data);
        
                if (response.error === 0) {
                    // Utilise le champ `uuid` comme identifiant
                    const operationUuid = response.data?.uuid || 'inconnu';
        
                    const message = `L'opération est validée avec le n° : ${operationUuid}. Vous pouvez la retrouver dans l'historique.`;
                    commit('updateSuccessMessage', message);
        
                    // Efface le message après 5 secondes
                    setTimeout(() => {
                        commit('updateSuccessMessage', '');
                    }, 5000);
                } else {
                    console.error("Erreur lors de la validation de l'opération :", response.data);
                }
            } catch (error) {
                console.error("Erreur technique lors de la validation :", error);
            }
        },

        resetStore({ commit }) {
            commit('reset');
        },
    },
});

