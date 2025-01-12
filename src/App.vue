<template>
  <div id="app">
    <!-- Barre de navigation -->
    <NavBar :links="links">
      <template v-slot:button-Boutique="{ label }">
        <span>{{ label }}</span>
      </template>
      <template v-slot:button-banque>
        <img src="@/assets/banque.png" alt="logobank" style="height: 30px;">
      </template>
    </NavBar>

    <!-- Texte d'accueil -->
    <p v-if="!hasContent" class="welcome-text">Welcome to Drmad App</p>

    <!-- Contenu de la vue -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: { NavBar },
  data() {
    return {
      links: [
        { label: "Boutique", to: "/shop" },
        { label: "banque", to: "/bank" },
      ],
      hasContent: false, // Permet de cacher/afficher le texte d'accueil
    };
  },
  watch: {
    // Surveille les changements de route
    $route(to) {
      this.hasContent = Boolean(to.matched.length);
    },
  },
  mounted() {
    // Vérifie l'état de la route actuelle au chargement
    this.hasContent = Boolean(this.$route.matched.length);
  },
};
</script>

<style scoped>
.welcome-text {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-top: 20px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
