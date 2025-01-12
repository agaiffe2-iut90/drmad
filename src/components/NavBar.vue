<template>
  <div class="navbar">
    <div class="navbar-container">
      <div v-for="(link, index) in links" :key="index" class="navbar-item">
        <button
          @click="goTo(link.to)"
          :style="{ backgroundColor: link.color }"
          class="navbar-button"
        >
          <slot :name="'button-' + link.label" :label="link.label">{{ link.label }}</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "NavBar",
  props: {
    links: {
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
.navbar {

  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ombre douce */
}

/* Flexbox pour aligner les boutons */
.navbar-container {
  display: flex;
  justify-content: left;
  gap: 15px; /* Espacement entre les boutons */
}

/* Style des boutons */
.navbar-button {
  padding: 10px 20px;
  color: white;
  background-color: blue;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s; /* Transition fluide */
}

/* Effet hover */
.navbar-button:hover {
  transform: scale(1.05); /* Zoom léger */
  background-color: green;
}

/* Style individuel pour chaque élément (espacement) */
.navbar-item {
  display: flex;
}
</style>
