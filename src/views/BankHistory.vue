<template>
    <div class="bank-history">
        <header>
            <slot name="title">
                <h1>Opérations passées</h1>
            </slot>
        </header>

        <!-- Affichage des transactions -->
        <ul>
            <li v-for="transaction in filteredTransactions" :key="transaction.id">
                {{ transaction.description }} - {{ transaction.amount }}
            </li>
            <div v-if="filteredTransactions.length === 0">
                <p>Aucune transaction trouvée.</p>
            </div>

        </ul>


        <!-- Filtre par période -->
        <div class="filter">
            <label>
                <input type="checkbox" v-model="filterActive" />
                Filtrer par période
            </label>
            <div v-if="filterActive" class="date-fields">
                <label>
                    Du :
                    <input type="date" v-model="startDate" @change="onDateChange('start')" />
                </label>
                <label>
                    Au :
                    <input type="date" v-model="endDate" @change="onDateChange('end')" />
                </label>
            </div>
        </div>

        <!-- DataTable pour afficher les transactions -->
        <DataTable
            :items="filteredTransactions"
            :headers="tableHeaders"
            :itemCheck="true"
            :itemButton="true"
            :tableButton="true"
            @itemClicked="viewDetails"
            @tableClicked="viewSelected"
        />

        <!-- Dialogue de détails -->
        <Dialog v-if="dialogVisible" @close="dialogVisible = false">
            <p v-if="dialogContent">{{ dialogContent }}</p>
        </Dialog>
    </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import { mapActions, mapState } from 'vuex';

export default {
    name: "BankHistory",
    components: {
        DataTable,
    },
    data() {
        return {
            filterActive: false,
            startDate: "",
            endDate: "",
            dialogVisible: false,
            dialogContent: "",
        };
    },
    computed: {
        // Transactions filtrées
        filteredTransactions() {
            let filtered = this.accountTransactions;

            if (this.filterActive) {
                if (this.startDate) {
                    filtered = filtered.filter((t) => t.date >= this.startDate);
                }
                if (this.endDate) {
                    filtered = filtered.filter((t) => t.date <= this.endDate);
                }
            }

            return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        // Headers pour le DataTable
        tableHeaders() {
            return [
                { label: "Montant", name: "amount" },
                { label: "Date", name: "date" },
                { label: "Type", name: "type" },
            ];
        },
        // Accès aux transactions du store
        ...mapState('bank', ['accountTransactions']),
    },
    methods: {
        ...mapActions('bank', ['getTransactions']),  // Récupérer les transactions depuis Vuex

        // Appelée lors de l'arrivée sur la page, pour charger les transactions
        fetchTransactions() {
            const accountNumber = "12345";  // Remplacer par le numéro de compte réel
            this.getTransactions(accountNumber);
        },

        // Gestion des changements de date pour le filtre
        onDateChange(field) {
            if (field === "start" && this.endDate && this.startDate > this.endDate) {
                this.endDate = "";
            }
            if (field === "end" && this.startDate && this.endDate < this.startDate) {
                this.startDate = "";
            }
        },

        // Affichage des détails d'une transaction dans un dialogue
        viewDetails(item) {
            this.dialogContent = `UUID: ${item.uuid}`;
            this.dialogVisible = true;
        },

        // Affichage des UUIDs sélectionnés
        viewSelected(selectedItems) {
            const selectedUuids = selectedItems.map(item => item.uuid).join(", ");
            this.dialogContent = `UUIDs sélectionnés : ${selectedUuids}`;
            this.dialogVisible = true;
        },
    },
    mounted() {
        // Charger les transactions dès que le composant est monté
        this.fetchTransactions();
    }
};
</script>
