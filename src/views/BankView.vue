<template>
    <div>
        <!-- Barre de navigation -->
        <NavBar :links="links">
            <template v-slot:button-banque="{ label }">
                <span>{{ label }}</span>
            </template>
        </NavBar>

        <!-- Menu vertical -->
        <VerticalMenu :items="items">
            <template v-slot:vmenu-title="{ label }">
                <span style="font-weight: bold;">{{ label }}</span>
            </template>
            <template v-slot:vmenu-link="{ label }">
                <button>{{ label }}</button>
            </template>
        </VerticalMenu>

        <!-- Contenu de la vue -->
        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from "@/components/NavBar";
import VerticalMenu from "@/components/VerticalMenu";

export default {
    name: "BankView",
    components: { NavBar, VerticalMenu },
    data: () => ({
        items: [
            { type: "title", label: "Opérations" },
            { type: "link", label: "Solde", to: "/bank/amount" },
            { type: "link", label: "Débit/Virement", to: "/bank/operation" },
            { type: "title", label: "États" },
            { type: "link", label: "Historique", to: "/bank/history" }
        ]
    }),
    computed: {
        ...mapState('bank', ['currentAccount']),
        links() {
            if (this.currentAccount !== null) {
                return [
                    { label: "Banque", to: "/bank/home" },
                    { label: "Déconnexion", to: "/bank/logout" }
                ];
            } else {
                return [
                    { label: "Login", to: "/bank/account" }
                ];
            }
        }
    }
};
</script>
