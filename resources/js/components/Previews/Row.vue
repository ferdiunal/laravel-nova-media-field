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
    <li class="flex justify-between gap-x-6 py-2.5">
        <div class="flex min-w-0 gap-x-4 relative w-full">
            <div class="inline-flex h-12 w-12 flex-none flex-col items-center justify-center relative">
                <preview :file="file" :editable="editable" @onDetail="emit('onDetail', $event)" />
            </div>
            <div class="min-w-0 flex-auto flex flex-col pr-2">
                <RemoveButton v-if="removable" class="absolute z-20 top-0 right-0" @click.stop="handleRemoveClick"
                    v-tooltip="{
                        content: __('Remove'),
                        delay: {
                            show: 1,
                            hide: 0,
                        }
                    }" :dusk="$attrs.dusk" />

                <div class="leading-relaxed text-xs break-all pr-6">
                    <p class="font-semibold text-gray-900">
                        {{ file.name }} {{ file.copy ? 'Copied' : '' }}
                    </p>
                    <p class="flex text-gray-500 gap-x-4">
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
