<template>
    <div>
      <!-- Table -->
      <table>
        <thead>
          <tr>
            <!-- Si itemCheck est true, ajouter la colonne de sélection -->
            <th v-if="itemCheck">Sélection</th>
            <!-- Entêtes dynamiques provenant de headers -->
            <th v-for="(header, index) in headers" :key="index">{{ header.label }}</th>
            <!-- Si itemButton est true, ajouter la colonne d'actions -->
            <th v-if="itemButton">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Lignes de la table -->
          <tr v-for="(item, index) in items" :key="index">
            <!-- Case à cocher dans la première colonne si itemCheck est true -->
            <td v-if="itemCheck">
              <input type="checkbox" :value="item" @change="toggleSelection(item)" />
            </td>
  
            <!-- Affichage des données des items -->
            <td v-for="(header, idx) in headers" :key="idx">{{ item[header.name] }}</td>
  
            <!-- Colonne d'actions si itemButton est true -->
            <td v-if="itemButton">
              <button @click="onItemClick(item)">Action</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Si tableButton est true, afficher un bouton après la table -->
      <div v-if="tableButton">
        <button @click="onTableClick">Valider Sélections</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DataTable',
  
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      itemCheck: {
        type: Boolean,
        default: false
      },
      itemButton: {
        type: Boolean,
        default: false
      },
      tableButton: {
        type: Boolean,
        default: false
      }
    },
  
    data() {
      return {
        selectedItems: []  // Pour stocker les items sélectionnés
      };
    },
  
    methods: {
      // Ajoute ou supprime un item de la sélection
      toggleSelection(item) {
        const index = this.selectedItems.indexOf(item);
        if (index === -1) {
          this.selectedItems.push(item); // Si l'item n'est pas dans la liste, on l'ajoute
        } else {
          this.selectedItems.splice(index, 1); // Sinon, on l'enlève
        }
      },
  
      // Emission d'un événement lors du clic sur un bouton d'une ligne
      onItemClick(item) {
        this.$emit('itemClicked', item);
      },
  
      // Emission d'un événement lors du clic sur le bouton après la table
      onTableClick() {
        this.$emit('tableClicked', this.selectedItems);
      }
    }
  };
  </script>
  
  