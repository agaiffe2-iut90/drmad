<template>
    <div>
        <h2>Payez !!</h2>
        <div>
            <label for="order-id">Id de la commande :</label>
            <input type="text" id="order-id" v-model="currentOrderId"
                :placeholder="currentOrderId || 'Entrez l\'id de la commande'"/>
        </div>
        <button @click="payOrder">Payer</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import shopService from '../services/shop.service.js';

export default {
    name: 'ShopPay',
    props: {
        orderId: String
    },
    data() {
        return {
            currentOrderId: this.orderId,
            errorMessage: '',
        }
    },
    computed: {
        ...mapState('shop', ['shopUser'])
    },
    methods: {
        async payOrder() {
            // Vérification si shopUser est connecté
            if (!this.shopUser || !this.shopUser._id) {
                this.errorMessage = "Identifiant utilisateur requis!";
                return;
            }

            // Vérification si orderId est fourni
            const orderId = this.currentOrderId;
            console.log('orderId:', orderId);
            if (!orderId) {
                this.errorMessage = "Identifiant de la commande requis.";
                return;
            }

            try {
                const data = { order_id: orderId, user_id: this.shopUser._id };
                const response = await shopService.buyOrderById(data);

                if (response.error === 0) {
                    this.errorMessage = 'Paiement effectué avec succès';
                } else {
                    this.errorMessage = response.data; // Gestion du message d'erreur spécifique
                }
            } catch (err) {
                console.error('Erreur dans payOrder:', err);
                this.errorMessage = 'Erreur lors du paiement. Veuillez réessayer.';
            }
        }
    }
}
</script>

<style scoped>
.error {
    color: red;
    font-size: 14px;
}
</style>
