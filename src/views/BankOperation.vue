<template>
    <div>
        <h1><slot>Débit / Virement</slot></h1>

        <div>
            <label for="amount">Montant :</label>
            <input 
                type="number"
                id="amount"
                v-model="amount"
                placeholder="Entrez le montant">
        </div>

        <div>
            <input 
                type="checkbox"
                id="recipient-checkbox"
                v-model="hasRecipient">
            <label for="debit">Destinataire</label>
            <input 
                type="text"
                v-if="hasRecipient"
                v-model="recipient"
                placeholder="Entrez le destinataire(numéro de compte)">
        </div>

        <button @click="validateOperation">Valider</button>

        <p v-if="sucessMessage">{{ sucessMessage }}</p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default{
    name: "BankOperation",
    data() {
        return {
            amount: null,
            hasRecipient: false,
            recipient: "",
            sucessMessage: ""
        }
    },
    methods: {
        ...mapActions('bank', ['validateOperation']),
    },
    computed: {
        ...mapState('bank', ['currentAccount', 'sucessMessage'])
    },
}

</script>