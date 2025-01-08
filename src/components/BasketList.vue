<template>
    <div>
        <h2>Panier</h2>
        <CheckedList 
            :data="basket" 
            :fields="['name', 'price']" 
            :itemCheck="true" 
            :checked="checked" 
            :itemButton="itemButton" 
            :listButton="listButton" 
            :itemAmount="true"/>
        <button @click="emptyBasket"></button>

    </div>
</template>

<script>
import CheckedList from '@/components/CheckedList.vue';
import { mapActions } from 'vuex';

export default{
    name: 'BasketList',
    components: {
        CheckedList,
    },
    data: () => ({
        fields: ['name', 'price', ['promotion', ['discount', 'amount']], 'amount'],
        checked: false,
        checked: [],
        itemButton: {
            show: true,
            text: 'Acheter',
        },
        listButton: {
            show: true,
            text: 'vider panier',
        },
    }),

    methods: {
        ...mapActions('shop', ['emptyBasket']),
        removeItem(id){
            console.log('removeItem', id);
            this.$store.commit('shop/removeItem', id);
        }

        async buyBasket(){
            console.log('buyBasket');
            try{
                const response = await this.shopBuyBasket();
                console.log('Réponse obtenue:', response);
                if(response.error === 0){
                    console.log('Achat réussi:', response.data);
                    this.$router.push('/shop/buy');
                } else {
                    console.log('Erreur lors de l\'achat:', response.data);
                }
            } catch (err){
                console.error('Erreur dans buyBasket:', err);
            }
        }
    }
}
</script>