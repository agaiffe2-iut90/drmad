<template>
    <div>
        <NavBar :links="links" >
            <template v-slot:boutton-Login="{ label }">
                <div>
                    <span>{{ label }}</span>
                </div>
            </template>
        </NavBar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
    name: 'ShopView',
    components: {NavBar},
    data: () => ({
        links: [{label: "Login", to: "/shop/login"},]
    }),
    methods: {
        goTo(index) {
            if (index == 0) {
                this.$router.push('/shop/login')
            }
        }
    },
};
</script>