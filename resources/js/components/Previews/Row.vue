<script setup>
import { useLocalization } from 'laravel-nova-useLocalization'
import { computed, defineEmits, defineProps, toRef } from 'vue'
import { formatBytes } from "../../utils"

const { __ } = useLocalization()

const props = defineProps({
    file: { type: Object },
    removable: { type: Boolean, default: true },
    downloadable: { type: Boolean, default: true },
})

const emit = defineEmits(['removed', 'onDetail'])

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

const handleRemoveClick = () => emit('removed')
</script>

<template>
    <li class="ln-flex ln-justify-between ln-gap-x-6 ln-py-2.5">
        <div class="ln-flex ln-min-w-0 ln-gap-x-4 ln-relative ln-w-full">
            <div
                class="ln-inline-flex ln-h-12 ln-w-12 ln-flex-none ln-flex-col ln-items-center ln-justify-center ln-relative">
                <preview :file="file" :editable="editable" @onDetail="emit('onDetail', $event)" />
            </div>
            <div class="ln-min-w-0 ln-flex-auto ln-flex ln-flex-col ln-pr-2">
                <RemoveButton v-if="removable" class="ln-absolute ln-z-20 ln-top-0 ln-right-0"
                    @click.stop="handleRemoveClick" v-tooltip="{
                        content: __('Remove'),
                        delay: {
                            show: 1,
                            hide: 0,
                        }
                    }" :dusk="$attrs.dusk" />

                <div class="ln-leading-relaxed ln-text-xs ln-break-all ln-pr-6">
                    <p class="ln-font-semibold ln-text-gray-900">
                        {{ file.name }} {{ file.copy ? 'Copied' : '' }}
                    </p>
                    <p class="ln-flex ln-text-gray-500 ln-gap-x-4">
                        <span>{{ formatBytes(file.originalFile?.size) }}</span>
                        <span>{{ file.type }}</span>
                        <a v-if="downloadable && file.previewUrl" target="_blank" rel="noreferrer"
                            :href="file.previewUrl" :title="file.name" :download="file.name">Download</a>
                    </p>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    inheritAttrs: false,
}
</script>
