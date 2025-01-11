<template>
    <div>
        <slot name="account-amount">
            <span :class="{ positive: currentAccount.amount >= 0, negative: currentAccount.amount < 0 }">
                {{ currentAccount.amount }} €
            </span>
        </slot>
    </div>
</template>

<script>

import { mapState } from "vuex";

export default{
    name: "BankAmount",

    computed: {
        ...mapState('bank', ["currentAccount"])
    }
}
</script>

<style scoped>
.positive {
    color: green;
}

.negative {
    color: red;
}
</style>