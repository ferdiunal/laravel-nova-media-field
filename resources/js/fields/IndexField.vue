<template>
    <span>
        <gallery :files="files" v-if="files.length" :id="`gallery_${resource.id.value}`" resourceView="index" />
        <span v-else>—</span>
    </span>
</template>

<script>
export default {
    props: ['resourceName', 'resource', 'field'],

    computed: {
        files() {
            return this.field.value
        }
        // fieldValue() {
        //   return this.field.displayedAs || this.field.value
        // },
    }
}
</script>
