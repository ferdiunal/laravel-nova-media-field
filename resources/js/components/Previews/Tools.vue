<script setup>
import { computed, defineEmits } from 'vue';
import GridButton from "../Buttons/GridButton.vue";
import ListButton from '../Buttons/ListButton.vue';
import TwoColumnButton from '../Buttons/TwoColumnButton.vue';

const emit = defineEmits(['update:modelValue'])

const listType = computed({
    get: () => window.NovaMedia.state("drawer").listType,
    set: (value) => window.NovaMedia.commit("drawer", "setListType", value)
})

</script>
<template>
    <div class="ln-inline-flex ln-flex-row ln-gap-x-2.5">
        <GridButton v-model="listType" />
        <TwoColumnButton v-model="listType" />
        <ListButton v-model="listType" />
    </div>
</template>
