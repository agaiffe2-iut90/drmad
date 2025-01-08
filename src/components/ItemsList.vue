<template>
  <div>
    <h1>Les virus</h1>
    <span>Filtres :</span>
    <hr />
    <label for="filterpriceactive">par prix</label><input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <label for="filternameactive">par nom</label><input type="checkbox" v-model="filterNameActive" id="filternameactive">
    <label for="filterstockactive">par stock</label><input type="checkbox" v-model="filterStockActive" id="filterstockactive">
    <hr />
    <table>
      <tr>
        <td v-if="filterPriceActive">
          <label for="filterprice">prix inférieur à : </label><input v-model="priceFilter" id="filterprice">
        </td>
        <td v-if="filterNameActive">
          <label for="filtername">nom contient : </label><input v-model="nameFilter" id="filtername">
        </td>
        <td v-if="filterStockActive">
          <label for="filterstock">en stock</label><input type="checkbox" v-model="stockFilter" id="filterstock">
        </td>
      </tr>
    </table>
    <hr />
    <CheckedList
      :data="filterViruses"
      :fields="fields"
      item-check
      :item-button="itemButton"
      :list-button="listButton"
      :checked="checked"
      @checked-changed="changeSelection"
      @item-button-clicked="addToCart"
      @list-button-clicked="flashItem"
      :itemAmount="itemAmount"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CheckedList from "@/components/CheckedList";

export default {
  name: "VirusesView",
  components: { CheckedList },
  data: () => ({
    priceFilter: 0,
    nameFilter: "",
    stockFilter: true,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    selected: [],
    fields: ["name", "price", ["promotion", ["discount", "amount"]], "stock"],
    listButton: {
      show: true,
      text: "info",
    },
    itemAmount: true,
  }),
  computed: {
    ...mapState("shop", ["viruses"]),
    checked() {
      return this.filterViruses.map(v =>
        this.selected.includes(this.viruses.indexOf(v))
      );
    },
    filterViruses() {
      return this.viruses
        .filter(v => (this.filterPriceActive ? v.price < this.priceFilter : true))
        .filter(v => (this.filterNameActive ? v.name.includes(this.nameFilter) : true))
        .filter(v => (this.filterStockActive ? v.stock > 0 : true));
    },
    itemButton() {
      return {
        show: true,
        text: "Ajouter au panier",
      };
    },
  },
  methods: {
    ...mapActions("shop", ["getAllViruses", "addItemToBasket"]),
    flashItem() {
      let s = this.filterViruses
        .filter((v, i) => this.checked[i])
        .map(v => `${v.name}: ${v.stock}`)
        .join("\n");
      alert(s);
    },
    changeSelection(idx) {
      let virusIndex = this.viruses.indexOf(this.filterViruses[idx]);
      let selectedIndex = this.selected.indexOf(virusIndex);

      if (selectedIndex !== -1) {
        this.selected.splice(selectedIndex, 1);
      } else {
        this.selected.push(virusIndex);
      }
    },
    addToCart(data) {
      let virus = this.filterViruses[data.index];
      let result = { "virus": virus, "amount": data.amount };
      this.addItemToBasket(result);
    },
  },
  mounted() {
    this.getAllViruses();
  },
};
</script>
