<template>
    <div>
        <h2>Panier</h2>
        <CheckedList 
            :data="formatedBasket"
            :fields="fields" 
            :itemCheck="true" 
            :checked="checked" 
            :itemButton="itemButton" 
            :listButton="listButton" 
            :itemAmount="true" />
        <button @click="emptyBasket">Vider le panier</button>
    </div>
</template>

<script>
import CheckedList from '@/components/CheckedList.vue';
import router from '@/router';
import { mapActions, mapState } from 'vuex';
import shopService from '../services/shop.service';
export default {
    name: 'BasketList',
    components: {
        CheckedList,
    },
    data: () => ({
        fields: ['name', 'price', ['promotion', ['discount', 'amount']], 'amount'],
        checked: [], // Contient les items sélectionnés
        listButton: {
            show: true,
            text: 'Vider le panier',
        },
    }),
    computed: {
        ...mapState('shop', ['basket']),
        itemButton() {
            let itemButton = []
            for (let i = 0; i < this.basket.length; i++) {
                itemButton.push({
                    show: true,
                    text: 'Supprimer',
                });
            }
            return itemButton;
        },

        formatedBasket() {
            return this.basket.map((item) => {
                return {
                    ...item,
                    amount: item.amount,
                };
            });
        }
    },
    methods: {
        ...mapActions('shop', ['emptyBasket', 'setBasket']),

        removeItem(id) {
            console.log('Suppression de l\'élément avec l\'ID :', id);
            this.$store.commit('shop/removeItem', id);
        },

        async buyBasket() {
            const data = {
                user_id: this.shop.user.id,
                items: this.basket,
            };

            try {
                const response = await shopService.addOrderByUserId(data);
                const uuid = response.data;

                if (this.isUUID(uuid)) {
                    this.emptyBasket();
                    router.push({ name: 'order', params: { uuid } });
                }
            } catch (error) {
                console.error('Erreur lors de l\'achat du panier :', error);
            }
        },

        isUUID(data) {
            const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return regex.test(data);
        },

        basketIsEmpty() {
            return this.basket.length === 0;
        },
    },
    mounted() {
        this.setBasket();
    },
};
</script>
