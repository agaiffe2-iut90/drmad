<template>
    <div class="shop-buy">
        <div class="items-list">
            <ItemsList />
        </div>
        <div class="basket-list">
            <BasketList />
        </div>
    </div>
</template>

<script>
import ItemsList from '@/components/ItemsList.vue';
import BasketList from '@/components/BasketList.vue';

export default {
    components: {
        ItemsList,
        BasketList,
    }
};
</script>

<style>
</style>