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
        updateAccount(state, account) {
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
        updateAccountNumberError(state, error) {
            state.accountNumberError = error;
        },
        reset(state) {
            state.currentAccount = null;
            state.accountTransactions = [];
            state.successMessage = '';
            state.errorMessage = '';
        },
    },

    actions: {
        async getAccount({ commit }, number) {
            const response = await bankAccountService.getAccount({ number: number });
            if (response.error === 0) {
              commit('updateAccountNumberError', 1);
              commit('updateAccount', response.data);
            } else {
              commit('updateAccountNumberError', -1);
              console.error(response.data);
            }
          },

        async getTransactionsByNumber({ commit }, accountNumber) {
            try {
                const response = await bankAccountService.getTransactionsByNumber(accountNumber);
                console.log("Réponse API:", response);  // Ajoute ce log pour inspecter la réponse
                if (response.data) {
                    commit('updateAccountTransactions', response.data);
                    commit('updateErrorMessage', '');
                } else {
                    commit('updateErrorMessage', 'Aucune transaction trouvée.');
                }
            } catch (error) {
                commit('updateErrorMessage', 'Erreur lors de la récupération des transactions.');
                console.error(error);
            }
        },

        async getTransactions({ commit }, data) {
            if (!data.accountNumber) {
                commit('updateErrorMessage', 'Numéro de compte manquant.');
                return;
            }
        
            try {
                const response = await bankAccountService.getTransactions(data);
                console.log("Réponse API:", response);  // Ajoute ce log pour inspecter la réponse
        
                if (response.error === 0) {
                    console.log('Structure de response.data :', response.data);
                    commit('updateAccountTransactions', response.data);  // Mets à jour l'état avec les données
                } else {
                    console.log('Erreur API:', response);
                    commit('updateErrorMessage', 'Erreur de récupération des transactions.');
                    console.error('Erreur API:', response);
                }
            } catch (error) {
                commit('updateErrorMessage', 'Erreur lors de la récupération des transactions.');
                console.error("Erreur technique:", error);
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
                    const operationUuid = response.data || 'inconnu';
        
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

