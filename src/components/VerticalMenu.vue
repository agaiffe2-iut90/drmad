<template>
    <div class="vmenu-container">
      <ul class="vmenu">
        <li v-for="(item, index) in items" :key="index" class="vmenu-item">
          <template v-if="item.type === 'title'">
            <slot name="vmenu-title" :label="item.label">
              <span class="vmenu-title">{{ item.label }}</span>
            </slot>
          </template>
          <template v-else>
            <span @click="goTo(item.to)" class="vmenu-link">
              <slot name="vmenu-link" :label="item.label">
                <button class="vmenu-button">{{ item.label }}</button>
              </slot>
            </span>
          </template>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import router from "@/router";
  
  export default {
    name: "VerticalMenu",
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
    methods: {
      goTo(dest) {
        router.push({ path: dest });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Container principal */
.vmenu-container {
    background-color: #f8f9fa; /* Fond clair et neutre */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre subtile */
    padding-top: 20px;
    height: calc(100% - 20px); /* Hauteur égale à la taille de l'écran */
}
  
  /* Liste verticale */
  .vmenu {
    list-style: none; /* Suppression des puces */
    padding: 0;
    margin: 0;
  }
  
  /* Élément de menu */
  .vmenu-item {
    margin-bottom: 15px; /* Espacement entre les éléments */
  }
  
  /* Titre */
  .vmenu-title {
    font-size: 18px;
    font-weight: bold;
    color: #333; /* Couleur sombre pour le texte */
    text-transform: uppercase;
    border-bottom: 2px solid #007bff; /* Soulignement bleu */
    padding-bottom: 5px;
    display: block;
  }
  
  /* Liens */
  .vmenu-link {
    cursor: pointer;
  }
  
  .vmenu-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007bff; /* Bleu primaire */
    border: none;
    border-radius: 5px; /* Coins arrondis */
    text-align: left;
    width: 100%; /* Largeur complète */
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  /* Effets de hover sur les boutons */
  .vmenu-button:hover {
    background-color: #0056b3; /* Bleu plus foncé au survol */
    transform: translateX(5px); /* Léger déplacement */
  }
  </style>
  