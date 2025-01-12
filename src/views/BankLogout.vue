<template>
    <div class="bank-logout">
        <p>Vous êtes déconnecté. Redirection vers l'accueil...</p>
    </div>
</template>

<script>
export default {
    name: "BankLogout",
    created() {
        setTimeout(() => {
            this.$store.commit('bank/reset');
            this.$router.push("/");
        }, 1000);
    },
};
</script>


