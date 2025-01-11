<template>
    <div class="operation-wrapper">
        <h1>
            <slot name="title">Débit / Virement</slot>
        </h1>

        <div class="form-group">
            <label for="amount">Montant :</label>
            <input type="number" id="amount" v-model="amount" min="0" placeholder="Entrez le montant" />
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox" v-model="isRecipient" />
                Destinataire
            </label>
        </div>

        <div v-if="isRecipient" class="form-group">
            <label for="recipient">Numero de compte du destinataire :</label>
            <input type="text" id="recipient" v-model="recipient" placeholder="Entrez le numero de compte du destinataire" />
        </div>

        <div class="form-group">
            <button @click="validateOperation({
                currentAccount: currentAccount,
                amount: amount,
                isRecipient: isRecipient,
                recipient: recipient,
            })">Valider</button>
        </div>

        <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'BankOperation',

    data: () => ({
        amount: null,
        isRecipient: false,
        recipient: '',
    }),
    methods: {
        ...mapActions('bank', ['validateOperation']),
    },
    computed: {
        ...mapState('bank', ['currentAccount', 'successMessage']),
    },
};
</script>
