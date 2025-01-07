<template>
  <div>
    <h1>Login</h1>

    <span>login</span><input v-model="login">
    <span>password</span><input v-model="password" type="password">
    <button @click="handleLogin">Login</button>
    <p v-if="shopUser">{{shopUser}}</p>
    <p v-if="loginMessage">{{loginMessage}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'


export default {
  name: 'ShopLoginView',
  data: () => ({
    login: '',
    password: '',
    loginMessage: ''
  }),
  computed: {
    ...mapState(['shopUser'])
  },
  methods: {
    ...mapActions('shop', ['shopLogin']),
    async handleLogin() {
      try {
          const response = await this.shopLogin({ login: this.login, password: this.password });
          console.log('Réponse obtenue:', response);

          if (response.error === 0) {
              this.loginMessage = "Login successful";
              console.log('Login successful:', response.data);
              //this.$router.push('/shop/buy'); // Redirection après succès
          } else {
              this.loginMessage = response.data;
          }
      } catch (err) {
          console.error('Erreur dans handleLogin:', err);
          this.loginMessage = "Erreur lors du login. Veuillez réessayer.";
      }
  }
  }
}
</script>
