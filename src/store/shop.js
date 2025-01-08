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
            if(Array.isArray(basket)){
                state.basket = basket;
            } else {
                console.error("Le panier n'est pas un tableau valide");
            }
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

        async setBasket({ state ,commit }) {
            if(state.shopUser){
                let response = await ShopService.getBasketById({ id: state.shopUser._id });
                if (response.error === 0) {
                    commit("updateBasket", response.data);
                } else {
                    console.log(response.data);
                }
            }
        },

        async addItemToBasket({ state, commit }, data) {
            console.log("addItemToBasket called with data:", data);
            if (!state.shopUser) {
                console.log("User not logged in");
                return { error: 1, data: "User not logged in" };
            }
        
            let amount = data.amount;
            let basket = [...state.basket];
            let virus = data.virus;
            let maxAmount = virus.stock;
        
            console.log("Current basket:", basket);
            console.log("Virus to add:", virus);
        
            if (maxAmount === 0) {
                console.log("Stock épuisé");
                return { error: 1, data: "Stock épuisé" };
            }

            if (amount === 0) {
                console.log("Quantité invalide");
                return { error: 1, data: "Quantité invalide" };
            }
        
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].item.name === virus.name) {
                    basket[i].amount += amount;
                    if (basket[i].amount > maxAmount) {
                        basket[i].amount = maxAmount;
                    }
        
                    console.log("Updating existing item in basket:", basket[i]);
        
                    let response = await ShopService.editBasketById({ id: state.shopUser._id, basket: basket });
                    if (response.error === 0) {
                        commit("updateBasket", response.data);
                    } else {
                        console.log("Error updating basket:", response.data);
                    }
                    return;
                }
            }
        
            let item = {
                "name": virus.name,
                "description": virus.description,
                "price": virus.price,
                "promotion": virus.promotion,
                "object": virus.object,
            };
        
            basket.push({ item: item, amount: amount });
        
            console.log("Adding new item to basket:", item);
        
            let response = await ShopService.updateBasketById({ id: state.shopUser._id, basket: basket });
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log("Error updating basket:", response.data);
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

        async removeItemFromBasketByItemId({ state, commit }, item_id) {
            let basket = [...state.basket]
            // Verifier que l'item_id soit valide
            if (item_id === null || item_id < 0 || item_id >= basket.length) {
              console.log('Invalid item_id');
              return;
            }
      
            // Suppression de l'item du panier
        basket.splice(item_id, 1);
            let response = await ShopService.updateBasketById({ id: state.shopUser._id, basket });
            if (response?.error === 0) {
              console.log('mise à jour du panier');
              commit('updateBasket', response.data);
            } else {
              console.log(response?.data || 'Error updating basket');
            }
        },

        async emptyBasket({ state, commit }) {
            let basket = [];
            console.log('mise à jour du panier : ' + basket);
            let response = await ShopService.updateBasketById({ id: state.shopUser._id, basket });
            if (response?.error === 0) {
              commit('updateBasket', response.data);
            } else {
              console.log(response?.data || 'Error updating basket');
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

        async addOrderByUserId({ commit }, data) {
            let response = await ShopService.addOrderByUserId(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },

        async buyOrderById({ commit }, data) {
            let response = await ShopService.buyOrderById(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },

        async getOrdersByUserId({ commit }, data) {
            let response = await ShopService.getOrdersByUserId(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },

        async cancelOrderById({ commit }, data) {
            let response = await ShopService.cancelOrderById(data);
            if (response.error === 0) {
                commit("updateBasket", response.data);
            } else {
                console.log(response.data);
            }
        },
    },
})