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
    <div class="ln-bg-gray-50 ln-dark:ln-bg-gray-700 ln-relative ln-aspect-square ln-flex ln-items-center ln-justify-center ln-border-2 ln-border-gray-200 ln-dark:ln-border-gray-700 ln-overflow-hidden ln-rounded-lg"
        :class="file?.mediaId === undefined || file?.mediaId && file?.copy ? 'ln-grayscale ln-cursor-progress' : ''">
        <div v-if="file.processing" class="ln-absolute ln-inset-0 ln-flex ln-items-center ln-justify-center">
            <ProgressBar :title="uploadingLabel" class="ln-mx-4" color="ln-bg-green-500" :value="uploadingPercentage" />
            <div class="ln-bg-primary-900 ln-opacity-5 ln-absolute ln-inset-0" />
        </div>
        <div class="ln-group">
            <img v-if="file.isImage" :src="file.previewUrl" :alt="file.alt"
                class="ln-aspect-square ln-object-scale-down" />
            <div v-else>
                <div class="ln-rounded ln-bg-gray-200 ln-border-2 ln-border-gray-200 ln-p-4">
                    <Icon type="document-text" :width="iconSize" :height="iconSize" />
                </div>
            </div>

            <template v-if="updatable">
                <div
                    class="ln-absolute hover:ln-bg-primary-50/60 ln-opacity-0 hover:ln-opacity-100 ln-z-50 ln-inset-0 ln-inline-flex ln-justify-center ln-items-center ln-delay-150 ln-duration-75 ln-ease-in-out ln-transition-all">
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
