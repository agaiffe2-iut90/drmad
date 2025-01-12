<template>
    <div class="app-layout">
      <!-- Barre de navigation (navbar) -->
      <header class="navbar">
        <NavBar :links="links">
          <template v-slot:button-banque="{ label }">
            <span>{{ label }}</span>
          </template>
        </NavBar>
      </header>
  
      <!-- Conteneur principal avec deux colonnes -->
      <main class="main-container">
        <!-- Menu vertical (colonne de gauche) -->
        <aside class="vertical-menu-container">
          <VerticalMenu :items="items">
            <template v-slot:vmenu-title="{ label }">
              <span style="font-weight: bold;">{{ label }}</span>
            </template>
            <template v-slot:vmenu-link="{ label }">
              <button>{{ label }}</button>
            </template>
          </VerticalMenu>
        </aside>
  
        <!-- Contenu principal (colonne de droite) -->
        <section class="content-container">
          <router-view />
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  import NavBar from "@/components/NavBar";
  import VerticalMenu from "@/components/VerticalMenu";
  
  export default {
    name: "BankView",
    components: { NavBar, VerticalMenu },
    data: () => ({
      items: [
        { type: "title", label: "Opérations" },
        { type: "link", label: "Solde", to: "/bank/amount" },
        { type: "link", label: "Débit/Virement", to: "/bank/operation" },
        { type: "title", label: "États" },
        { type: "link", label: "Historique", to: "/bank/history" },
      ],
    }),
    computed: {
      ...mapState("bank", ["currentAccount"]),
      links() {
        if (this.currentAccount !== null) {
          return [
            { label: "Banque", to: "/bank/home" },
            { label: "Déconnexion", to: "/bank/logout" },
          ];
        } else {
          return [{ label: "Login", to: "/bank/account" }];
        }
      },
    },
  };
  </script>
  

<style scoped>
/* Layout principal */
.app-layout {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa; /* Fond clair */
}

/* Navbar (en haut, largeur pleine) */

/* Conteneur principal (2 colonnes) */
.main-container {
  display: flex;
  height: calc(100vh - 150px);
  overflow: hidden; /* Évite le dépassement des colonnes */
}

/* Colonne gauche : Menu vertical */
.vertical-menu-container {
  width: 250px; /* Largeur fixe pour le menu */
  background-color: #fff; /* Fond blanc */
  border-right: 1px solid #ddd; /* Séparation discrète */
 /* Hauteur égale à la taille de l'écran moins la hauteur de la navbar */
  overflow-y: auto; /* Scroll si le contenu dépasse */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Colonne droite : Contenu principal */
.content-container {
  flex-grow: 1; /* Prend tout l'espace restant */
  padding: 20px;
  overflow-y: auto; /* Scroll si le contenu dépasse */
}
</style>
