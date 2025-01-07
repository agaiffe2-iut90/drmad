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
                console.log('Checked viruses:', this.checked);
            },
            showVirusInfos(event) {
                const virus = this.filterViruses.find(v => v.id === event);
                if (virus) {
                    alert(`Virus Info:\nName: ${virus.name}\nPrice: ${virus.price}\nDescription: ${virus.description}`);
                } else {
                    alert('Virus not found.');
                }
            },
            showVirusNames() {
                if (this.checked.length === 0) {
                    alert('No viruses selected.');
                } else {
                    const names = this.filterViruses
                        .filter(v => this.checked.includes(v.id))
                        .map(v => v.name)
                        .join(', ');
                    alert(`Selected Viruses: ${names}`);
                }
            }
        }
    };
</script>