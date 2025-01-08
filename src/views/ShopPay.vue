<template>
    <div>
        <h2>Payez !!</h2>
        <div>
            <label for="order-id">Id de la commande :</label>
            <input type="text" id="order-id" v-model="currentOrderId"
                :placeholder="currentOrderId || 'Entrez l\'id de la commande'"/>
        </div>
        <button @click="payOrder">Payer</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ShopService from '../services/shop.service.js';

export default {
    name: 'ShopPay',
    props: {
        orderId: String
    },
    data() {
        return {
            currentOrderId: this.orderId,
            errorMessage: ''
        }
    },
    computed: {
        ...mapState('shop', ['shopUser'])
    },
    methods: {
        async payOrder(){
            try {
                const response = await ShopService.payOrderById(this.currentOrderId);
                console.log('Réponse obtenue:', response);

                if (response.error === 0) {
                    this.errorMessage = "Paiement effectué avec succès";
                    console.log('Paiement effectué avec succès:', response.data);
                } else {
                    this.errorMessage = response.data;
                }
            } catch (err) {
                console.error('Erreur dans payOrder:', err);
                this.errorMessage = "Erreur lors du paiement. Veuillez réessayer.";
            }
        }
    }
}
</script>