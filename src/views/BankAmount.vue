<template>
    <div>
        <slot name="account-amount">
            <span>
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
        ...mapState(["currentAccount"])
    }
}
</script>