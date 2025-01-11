<template>
  <div>
    <h1>Compte bancaire</h1>
    <span>Numéro de compte: <input type="text" v-model="number"></span>
    <button @click="login(number)">Valider</button>
    <p v-if="message"> {{ message }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'


export default {
  name: 'BankAccountView',
  data() {
    return {
      number: '',
      message: ''
    }
  },
  computed: {
    ...mapState('bank', ['currentAccount'])
  },
  methods: {
    ...mapActions('bank', ['getAccount']),
    async login(number) {
        // D'abord appeler getAccount et attendre sa fin
        await this.getAccount(number);

        // Vérifier si le compte a été trouvé
        if (this.$store.state.bank.currentAccount) {
            this.message = ''; // Réinitialiser le message d'erreur
            this.$router.push('/bank/home'); // Redirection vers la page d'accueil du compte
        } else {
            this.message = 'Compte inconnu'; // Afficher le message d'erreur si aucun compte n'est trouvé
        }
    },
  }
}

</script>