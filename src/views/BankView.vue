<template>
    <div>
        <NavBar :links="links">
            <template v-slot:button-banque="{ label }">
                <span>{{ label }}</span>
            </template>
        </NavBar>

        <VerticalMenu>
            <template v-slot:vmenu-title="{ label }">
                <span>{{ label }}</span>
            </template>
            <template v-slot:vmenu-link="{ label }">
                <button>{{ label }}</button>
            </template>
        </VerticalMenu>

        <div>
            <router-view>
                <template v-slot:account-amount>
                    <h2>Mon solde</h2>
                    <input v-if="0 > currentAccount.amount" type="text" :value="currentAccount.amount" style="color: red"/>
                    <input v-else type="text" :value="currentAccount.amount" style="color: green"/>
                </template>
            </router-view>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import VerticalMenu from "@/components/VerticalMenu";

export default{
    name: "BankView",
    components: {NavBar, VerticalMenu},
    data: () => ({
        links: [
            {label: "Mon compte", to: "/bank/account"}
        ],

        items: [
            {type: "title", label: "Opérations"},
            {type: "link", label: "Solde", to: "/bank/amount"},
            {type: "link", label: "Débit/Virement", to: "/bank/operation"},
            {type: "title", label: "Etats"},
            {type: "link", label: "Historique", to: "/bank/history"}
        ]
    }),

}
</script>