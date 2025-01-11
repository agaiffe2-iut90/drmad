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
import router from '@/router';


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
    login(number) {
    this.getAccount({ number }).then(account => {
        if (account) {
            this.message = '';
            console.log("Compte valide :", account);
            router.push('/bank/home');
        } else {
            this.message = 'Compte inconnu';
        }
    }).catch(() => {
        this.message = 'Erreur de connexion';
    });
},
  }
}

</script>