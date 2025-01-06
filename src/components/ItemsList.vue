<template>
    <div>
        <CheckedList :data="filterViruses"
                 :fields="['name', 'price']"
                 item-check
                 :item-button="{show: true, text:'Info'}"
                 :list-button="{show: true, text:'Select'}"
                 :checked="checked"
                 @checked-changed="changeSelection($event)"
                 @item-button-clicked="showVirusInfos($event)"
                 @list-button-clicked="showVirusNames()"
        >
        </CheckedList>
    </div>
</template>

<script>
    import CheckedList from './CheckedList.vue';

    export default {
        components: {
            CheckedList
        },
        data() {
            return {
                filterViruses: [],
                checked: []
            };
        },
        methods: {
            changeSelection(event) {
                this.checked = event;
            },
            showVirusInfos(event) {
                //TODO
            },
            showVirusNames() {
                // TODO
            }
        }
    };
</script>