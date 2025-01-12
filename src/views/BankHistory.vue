<template>
    <div>
        <slot name="title">
            <h1>Opérations passsées</h1>
        </slot>

        <label for="timeFilter"> Filtrer par période</label>
        <input type="checkbox" id="timeFilter" v-model="timeFilter" />
        <div v-if="timeFilter">
            <label for="startDate">Du</label>
            <input type="date" id="startDate" v-model="startDate" />
            <label for="endDate">Au</label>
            <input type="date" id="endDate" v-model="endDate" />
        </div>
        <DataTable :headers="headers" :items="items" :itemButton="true" :tableButton="true"
        @itemClicked="showTransaction" @tableClicked="showSelectedTransaction" >
            <template>
                Details
            </template>
            <template>
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
    components: { DataTable },
    data: () => ({
        timeFilter: false,
        startDate: '',
        endDate: '',
        headers: [
            { name: 'date', label: 'Date' },
            { name: 'amount', label: 'Montant' },
            { name: 'recipient', label: 'Destinataire' },
        ],
    }),
    computed: {
        ...mapState('bank', ['currentAccount', 'accountTransactions']),
        filteredTransactions() {
            if (this.timeFilter) {
                return this.accountTransactions.filter(transaction => {
                    return transaction.date >= this.startDate && transaction.date <= this.endDate;
                });
            }
            return this.accountTransactions;
        },
        account_id() {
            return this.currentAccount.id;
        },
         
    },
    methods: {
        ...mapActions('bank', ['getTransactions']),
        showTransaction(item) {
            console.log('Transaction:', item);
        },
        showSelectedTransaction(selectedItems) {
            console.log('Transactions sélectionnées:', selectedItems);
        },
    },
    mounted() {
        this.getTransactions(this.account_id);
    },
}
</script>