<template>
    <div>
        <DataTable
                :headers="headers"
                :items="items"
                :itemCheck="true"
                :itemButton="true"
                :tableButton="true"
                @itemClicked="handleItemClicked"
                @tableClicked="handleTableClicked"
        >
            <!-- Slot pour personnaliser le bouton d'action -->
            <template v-slot:actionButton>
                <span>View</span>
            </template>

            <!-- Slot pour personnaliser le bouton après la table -->
            <template v-slot:tableButton>
                <span>Submit Selected</span>
            </template>
        </DataTable>
    </div>
</template>

<script>
import DataTable from './DataTable.vue';

export default {
    components: {
        DataTable,
    },
    data() {
        return {
            headers: [
                { label: 'Nom', name: 'name' },
                { label: 'Prix', name: 'price' },
            ],
            items: [
                { name: 'Grippe', price: 1000, strength: 5 },
                { name: 'Covid', price: 150, strength: 5 },
                { name: 'Choléra', price: 6666, strength: 20 },
            ],
        };
    },
    methods: {
        handleItemClicked(item) {
            console.log('Item clicked:', item);
        },
        handleTableClicked(selectedItems) {
            console.log('Table button clicked. Selected items:', selectedItems);
        },
    },
};
</script>
