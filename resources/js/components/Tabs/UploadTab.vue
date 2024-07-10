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
    <div class="ln-relative ln-max-w-lg ln-w-full ln-mx-auto">
        <div class="ln-flex ln-flex-row ln-items-center ln-justify-end ln-pr-4 ln-w-full ln-pt-3.5" v-if="files.length">
            <tools />
        </div>
        <div class="ln-overflow-y-auto ln-overflow-x-hidden ln-h-auto ln-p-4 ln-max-h-[80dvh]" v-if="files.length">
            <previews-container :field="field" :files="files" />
            <div class="ln-grid grln-id-cols-4 ln-gap-x-6 ln-gap-y-4" v-if="false">
                <template v-for="(file) in files" :key="key" v-if="false">
                    <div v-tooltip="{
                        content: file?.mediaId === undefined ? 'The file has not loaded yet' : '',
                        delay: {
                            show: 1,
                            hide: 0,
                        },
                    }" :class="file?.mediaId === undefined ? 'ln-grayscale ln-cursor-progress' : ''">
                        <BlockPreview :file="file" :removable="shouldShowRemoveButton" :downloadable="false" @removed="() => {
                            setRemovableFile(file)
                            removableConfirmModal = true
                        }" :rounded="field.rounded" :editable="false" :dusk="`${field.attribute}-delete-link`" />
                    </div>
                </template>
            </div>
        </div>

        <!-- DropZone -->
        <div class="ln-max-w-lg ln-w-full ln-mx-auto ln-mt-5">
            <upload-field :rounded="field.rounded" :field="field" :disabled="files?.some(file => file.processing)"
                :dusk="`${field.attribute}-delete-link`" :input-dusk="field.attribute" />
        </div>
    </div>
</template>
