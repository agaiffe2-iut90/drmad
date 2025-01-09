<template>
    <div>
        <NavBar :titles="titles" @menu-clicked="goTo($event)"></NavBar>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
    name: 'ShopView',
    components: {NavBar},
    data: () => ({
        titles: [{text:'Login', color: 'red'},]
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