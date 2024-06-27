<template>
    <PanelItem :index="index" :field="field">
        <template v-slot:value>
            <gallery :files="files" v-if="files.length" :id="`gallery-${resource.id.value}`" resourceView="detail" />
            <span v-else>—</span>
        </template>
    </PanelItem>
</template>

<script>

export default {
    props: ['index', 'resource', 'resourceName', 'resourceId', 'field'],
    computed: {
        files() {
            return this.field.value
        }
    },
    data() {
        return {
            error: false
        }
    },
    methods: {
        onError(event) {
            event.target.src = 'https://generated.vusercontent.net/placeholder.svg';
            this.error = true;
        }
    }
}
</script>
