<template>
    <div>
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <template v-if="item.type === 'title'">
                    <slot name="vmenu-title" :label="item.label">
                        <span>{{ item.label }}</span>
                    </slot>
                </template>
                <template v-else>
                    <span @click="goTo(item.to)">
                        <slot name="vmenu-link" :label="item.label">
                            <button>{{ item.label }}</button>
                        </slot>
                    </span>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import router from "@/router";

export default {
    name: "VerticalMenu",
    props: { items: {type: Array, required: true} },
    methods: {
        goTo(dest){
            router.push({path: dest})
        }
    }
}
</script>