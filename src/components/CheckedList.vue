<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <!-- Case à cocher -->
      <input 
        type="checkbox"
        v-if="itemCheck"
        :checked="checked[indexRow]"
        @change="$emit('checked-changed', indexRow)"
      >

      <!-- Champs affichés -->
      <span v-for="(field, indexCol) in fields" :key="indexCol">
        {{ item[field] }}
      </span>

      <!-- Champ numérique -->
      <input 
        v-if="itemAmount" 
        type="number" 
        :value="amounts[indexRow] || 0" 
        min="0"
        step="1"
        @input="updateAmount(indexRow, $event.target.value)"
      >

      <!-- Bouton par item -->
      <button 
        v-if="itemButton && itemButton.show" 
        color="grey" 
        @click="onItemButtonClick(indexRow)"
      >
        {{ itemButton.text }}
      </button>
    </p>

    <!-- Bouton pour la liste entière -->
    <button 
      v-if="listButton && listButton.show" 
      color="green" 
      @click="onListButtonClick"
    >
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "CheckedList",
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs à afficher
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
    itemAmount: Boolean, // Affiche le champ de saisie numérique si true
  },
  data() {
    return {
      amounts: {}, // Gestion des montants
    };
  },
  methods: {
    // Mise à jour de la valeur dans l'item
    updateAmount(index, value) {
      const amount = parseInt(value, 10);
      if (isNaN(amount) || amount <= 0) {
        console.error("La valeur doit être un nombre positif");
        return;
      }
      
      // Mise à jour du montant dans la structure amounts
      this.$set(this.amounts, index, amount);
      // Envoi de l'événement au parent pour mise à jour du montant
      this.$emit("update:amounts", { index, amount });
    },

    // Gestion du clic sur le bouton d'un item
    onItemButtonClick(index) {
      const amount = this.amounts[index] || 0;
      this.$emit("item-button-clicked", { index, amount });
    },

    // Gestion du clic sur le bouton de liste
    onListButtonClick() {
      const selectedItems = this.data
        .map((item, index) => {
          if (this.checked[index]) {
            // Si un montant est spécifié pour l'item
            const amount = this.amounts[index] || 0;
            return { index, amount };
          }
          return null;
        })
        .filter(item => item !== null);

      this.$emit("list-button-clicked", selectedItems);

      // Réinitialisation des cases cochées après traitement
      this.$emit("update:checked", this.checked.map(() => false));
    },
  },
};
</script>
