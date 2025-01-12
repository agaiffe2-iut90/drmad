<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-if="itemCheck">Select</th>
                    <th v-for="header in headers" :key="header.name">
                        {{ header.label }}
                    </th>
                    <th v-if="itemButton">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td v-if="itemCheck">
                        <input type="checkbox" v-model="selectedItems" :value="item" />
                    </td>
                    <td v-for="header in headers" :key="header.name">
                        {{ item[header.name] }}
                    </td>
                    <td v-if="itemButton">
                        <button @click="$emit('itemClicked', item)">
                            <slot name="item-button" :item="item">
                                Action
                            </slot>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button v-if="tableButton" @click="emitTableClicked" class="table-button">
            <slot name="table-button">
                Eventuel bouton
            </slot>
        </button>
    </div>
</template>

<script>
export default {
    name: "DataTable",
    props: {
        items: {
            type: Array,
            required: true,
        },
        headers: {
            type: Array,
            required: true,
        },
        itemCheck: {
            type: Boolean,
            default: false,
        },
        itemButton: {
            type: Boolean,
            default: false,
        },
        tableButton: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedItems: [],
        };
    },
    methods: {
        emitTableClicked() {
            this.$emit('tableClicked', this.selectedItems);
        },
    },
};
</script>
