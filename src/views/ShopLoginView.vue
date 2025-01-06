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
    ...mapActions(['shopLogin']),
    async handleLogin() {
      const success = await this.shopLogin({ login: this.login, password: this.password });
      this.loginMessage = success ? 'Login successful!' : 'Invalid login or password.';
    }
  }
}
</script>
