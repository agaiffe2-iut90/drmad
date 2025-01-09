<template>
  <div>
    <table>
      <tr>
        <td v-for="(link, index) in links" :key="index" :style="{paddingRight: '10px'}">
          <button
              @click="goTo(link.to)"
              :style="{backgroundColor: link.color}"
              class="nav-button"
          >
            <slot :name="'button-' + link.label" :label="link.label">{{ link.label }}</slot>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "NavBar",
  props: { links: Array},
  methods: {
    goTo(dest){
      router.push({path: dest})
    }
  }
}
</script>

<style scoped>
.nav-button {
  padding: 10px;
}
</style>