<script setup>
import { computed, defineProps, ref } from "vue";
import BlockPreview from '../Previews/Block.vue';
const props = defineProps({
    field: Object,
    hasValue: Boolean,
    shouldShowRemoveButton: Object,
})

const state = computed(() => window.NovaMedia.state("upload"))
const files = computed(() => state.value.files.filter(
    file => file.order === -1 && file.mediaId === undefined
))

const setRemovableFile = (file) => window.NovaMedia.commit("upload", "setRemovableFile", file)
</script>
<template>
    <div class="relative max-w-lg w-full mx-auto">
        <div class="flex flex-row items-center justify-end pr-4 w-full pt-3.5" v-if="files.length">
            <tools />
        </div>
        <div class="overflow-y-auto overflow-x-hidden h-auto p-4" v-if="files.length" style="max-height: 80dvh;">
            <previews-container :field="field" :files="files" />
            <div class="grid grid-cols-4 gap-x-6 gap-y-4" v-if="false">
                <template v-for="(file) in files" :key="key" v-if="false">
                    <div v-tooltip="{
                        content: file?.mediaId === undefined ? 'The file has not loaded yet' : '',
                        delay: {
                            show: 1,
                            hide: 0,
                        },
                    }" :class="file?.mediaId === undefined ? 'filter grayscale' : ''"
                        :style="file?.mediaId === undefined ? 'cursor: progress' : ''">
                        <BlockPreview :file="file" :removable="shouldShowRemoveButton" :downloadable="false" @removed="() => {
                            setRemovableFile(file)
                            removableConfirmModal = true
                        }" :rounded="field.rounded" :editable="false" :dusk="`${field.attribute}-delete-link`" />
                    </div>
                </template>
            </div>
        </div>

        <!-- DropZone -->
        <div class="max-w-lg w-full mx-auto mt-5">
            <upload-field :rounded="field.rounded" :field="field" :disabled="files?.some(file => file.processing)"
                :dusk="`${field.attribute}-delete-link`" :input-dusk="field.attribute" />
        </div>
    </div>
</template>
