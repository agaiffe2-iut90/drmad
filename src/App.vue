<template>
  <div id="app">
    <NavBar :links="links">
      <template v-slot:button-Boutique="{ label }">
        <span>{{ label }}</span>
      </template>
      <template v-slot:button-banque>
        <img src="@/assets/banque.png" alt="logobank" style="height: 30px;">
      </template>
    </NavBar>

    <h1>Welcome to DrMad app</h1>

    <router-view/>
  </div>
</template>

<script>

import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {NavBar},
  data: () => ({
    links: [
      {label: "Boutique", to: "/shop"},
      {label: "banque", to: "/bank"},
    ]
  }),
};
</script>
