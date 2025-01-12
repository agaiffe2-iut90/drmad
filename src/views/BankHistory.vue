<template>
    <div class="history-wrapper">
        <h1>
            <slot name="title">Operations passées</slot>
        </h1>
        <label for="periodFilter">Filtrer par période : </label>
        <input type="checkbox" v-model="periodFilter" id="periodFilter">
        <div v-if="periodFilter">
            <label for="start">Du :</label>
            <input type="date" id="start" v-model="start" />
            <label for="end">Au :</label>
            <input type="date" id="end" v-model="end" />
        </div>
        <DataTable :items="filteredTransactions" :headers="headers" :itemCheck="true" :itemButton="true"
            :tableButton="true" @itemClicked="showTransactionDetails" @tableClicked="showSelectedTransactions">
            <template #item-button>
                Details
            </template>
            <template #table-button>
                Voir
            </template>
        </DataTable>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DataTable from '@/components/DataTable.vue';

export default {
    name: 'BankHistory',
    components: {
        DataTable,
    },
    data: () => ({
        periodFilter: false,
        start: '',
        end: '',
        headers: [
            { label: "Montant", name: "amount" },
            { label: "Date", name: "date" },
            { label: "Source/Destinataire", name: "direction" },
        ],
    }),
    computed: {
        ...mapState('bank', ['currentAccount', 'accountTransactions']),
        filteredTransactions() {
            if (!Array.isArray(this.formatedTransactions)) {
                return [];
            }

            if (this.periodFilter) {
                return this.formatedTransactions.filter(transaction => {
                    return (!this.start || transaction.date >= this.start) &&
                           (!this.end || transaction.date <= this.end);
                });
            }

            return this.formatedTransactions;
        },
        formatedTransactions() {
            if (!Array.isArray(this.accountTransactions)) {
                return [];
            }
            return this.accountTransactions.map(transaction => ({
                ...transaction,
                date: transaction.date.$date,
                direction: transaction.amount < 0 ? 'S (source)' : 'D (destinataire)',
            }));
        },
        account_id() {
            return this.currentAccount?._id || '';
        },
    },
    methods: {
        ...mapActions('bank', ['getTransactions']),
        showTransactionDetails(item) {
            alert(`Transaction UUID: ${item.uuid} `);
        },
        showSelectedTransactions(selectedItems) {
            alert(`Selected Transactions UUIDs: ${selectedItems.map(item => item.uuid).join(', ')}`);
        },
    },
    mounted() {
    this.getTransactions({ account_id: this.account_id })
        .then(() => {
        console.log('Transactions:', this.accountTransactions);
        console.log('Formatted transactions:', this.formatedTransactions);
        console.log('Filtered transactions:', this.filteredTransactions);
        })
        .catch(error => {
        console.error('Error fetching transactions:', error);
        });
    }
};
</script>
