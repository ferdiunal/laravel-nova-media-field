<script setup>
import { useLocalization } from 'laravel-nova-useLocalization'
import { defineProps, defineEmits, computed } from 'vue';

const { __ } = useLocalization()
const emit = defineEmits(['onDetail'])
const props = defineProps({
    file: { type: Object },
    updatable: { type: Boolean, default: true },
    iconSize: { type: Number, default: 36 },
})

const uploadingLabel = computed(() => {
    if (props.file.processing) {
        return __('Uploading') + ' (' + props.file.progress + '%)'
    }

    return props.file.name
})

const uploadingPercentage = computed(() => {
    if (props.file.processing) {
        return props.file.progress
    }

    return 100
})
</script>

<template>
    <div class="bg-gray-50 dark:bg-gray-700 relative aspect-square flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg"
        :class="file?.mediaId === undefined || file?.mediaId && file?.copy ? 'filter grayscale' : ''"
        :style="file?.mediaId === undefined || file?.mediaId && file?.copy ? 'cursor: progress' : ''">
        <div v-if="file.processing" class="absolute inset-0 flex items-center justify-center">
            <ProgressBar :title="uploadingLabel" class="mx-4" color="bg-green-500" :value="uploadingPercentage" />
            <div class="bg-primary-900 opacity-5 absolute inset-0" />
        </div>
        <div class="group">
            <img v-if="file.isImage" :src="file.previewUrl" :alt="file.alt" class="aspect-square object-scale-down" />
            <div v-else>
                <div class="rounded bg-gray-200 border-2 border-gray-200 p-4">
                    <Icon type="document-text" :width="iconSize" :height="iconSize" />
                </div>
            </div>

            <template v-if="updatable">
                <div
                    class="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-75 delay-150 duration-75 ease-in-out transition-all">
                </div>
                <div
                    class="absolute opacity-0 group-hover:opacity-100 z-50 inset-0 inline-flex justify-center items-center delay-150 duration-75 ease-in-out transition-all">
                    <IconButton v-tooltip="{
                        content: 'Edit',
                        delay: {
                            show: 1,
                            hide: 0
                        }
                    }" @click.prevent.stop="emit('onDetail', file.mediaId)" iconType="pencil-alt" solid small />
                </div>
            </template>
        </div>
    </div>
</template>
