<template>
    <div>
        <h2>Panier</h2>
        <CheckedList 
            :data="basket" 
            :fields="['name', 'price']" 
            :itemCheck="true" 
            :checked="checked" 
            :itemButton="itemButton" 
            :listButton="listButton" 
            :itemAmount="true">
    </div>
</template>

<script>
import CheckedList from '@/components/CheckedList.vue';

export default{
    name: 'BasketList',
    components: {
        CheckedList,
    },
    data: () => ({
        fields: ['name', 'price', ['promotion', ['discount', 'amount']], amount],
        checked: false,
        itemButton: {
            show: true,
            text: 'Acheter',
        },
        listButton: {
            show: true,
            text: 'vider panier',
        },
    }),
}
</script>