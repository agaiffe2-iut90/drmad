import Vue from "vue";
import Vuex from "vuex";

import shopService from "@/services/shop.service";


Vue.use(Vuex);

export default new Vuex.Store({
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
            console.log("login");
            let response = await shopService.shopLogin(data);
            if (response.error === 0) {
                commit("updateShopUser", response.data);
            } else {
                console.log(response.data);
            }
        },

        async getAllViruses({ commit }) {
            console.log("récupération des viruses");
            let response = await shopService.getAllViruses();
            if (response.error === 0) {
                commit("updateViruses", response.data);
            } else {
                console.log(response.data);
            }
        },
    },
})