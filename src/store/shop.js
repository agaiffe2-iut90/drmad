import Vue from "vue";
import Vuex from "vuex";

import ShopService from "@/services/shop.service";


Vue.use(Vuex);

export default ({
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
    }),

    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
        },
        updateShopUser(state, user) {
            state.shopUser = user;
        },
    },

    actions: {
        async shopLogin({ commit }, data) {
            try {
                const response = await ShopService.shopLogin(data);
                if (response.error === 0) {
                    commit('updateShopUser', response.data);
                    return response;
                } else {
                    return response;
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                return { error: 1, data: "Erreur lors de la connexion" };
            }
        },

        async getAllViruses({ commit }) {
            console.log("récupération des viruses");
            let response = await ShopService.getAllViruses();
            if (response.error === 0) {
                commit("updateViruses", response.data);
            } else {
                console.log(response.data);
            }
        },
    },
})