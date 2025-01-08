import Vue from "vue";
import Vuex from "vuex";

import ShopService from "@/services/shop.service";


Vue.use(Vuex);

export default ({
    namespaced: true,
    state: () => ({
        viruses: [],
        shopUser: null,
        basket: [],
    }),

    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
        },
        updateShopUser(state, user) {
            state.shopUser = user;
        },
        updateBasket(state, basket) {
            state.basket = basket;
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

        async addItemToBasket({ commit }, data) {
            let response = await ShopService.addItemToBasket(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },

        async editBasketById({ commit }, data) {
            let response = await ShopService.editBasketById(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },

        async removeItemFromBasket({ commit }, data) {
            let response = await ShopService.removeItemFromBasket(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },

        async getBasketById({ commit }, data) {
            let response = await ShopService.getBasketById(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },
        
        async viderPanier({ commit }, data) {
            let response = await ShopService.viderPanier(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },
    },
})