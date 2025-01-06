<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <!-- Case à cocher -->
      <input 
        type="checkbox"
        v-if="itemCheck"
        :checked="checked[indexRow]"
        @click="$emit('checked-changed', indexRow)"
      >

      <!-- Champs affichés -->
      <span v-for="(field, indexCol) in fields" :key="indexCol">
        {{ item[field] }}
      </span>

      <!-- Champ numérique -->
      <input 
        v-if="itemAmount" 
        type="number" 
        v-model="item.amount" 
        @change="updateAmount(indexRow, item.amount)"
      >

      <!-- Bouton par item -->
      <button 
        v-if="itemButton && itemButton.show" 
        color="grey" 
        @click="onItemButtonClick(indexRow, item.amount)"
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
  methods: {
    // Mise à jour de la valeur dans l'item
    updateAmount(index, value) {
      this.$emit("amount-changed", { index, value });
    },

    // Gestion du clic sur le bouton d'un item
    onItemButtonClick(index, amount) {
      const payload = this.itemAmount ? { index, amount } : { index };
      this.$emit("item-button-clicked", payload);
    },

    // Gestion du clic sur le bouton de liste
    onListButtonClick() {
      const selectedItems = this.data
        .map((item, index) => {
          if (this.checked[index] && this.itemAmount) {
            return { index, amount: item.amount || 0 };
          } else if (this.checked[index]) {
            return { index };
          }
          return null;
        })
        .filter(item => item !== null);

      this.$emit("list-button-clicked", selectedItems);

      // Désélection des items
      this.$emit("update:checked", this.checked.map(() => false));
    },
  },
};
</script>
