<script setup>
import { useLocalization } from 'laravel-nova-useLocalization';
import { formatBytes } from "../../utils";

const { __ } = useLocalization()
const emit = defineEmits(['removed', 'onDetail'])
const props = defineProps({
    file: { type: Object },
    removable: { type: Boolean, default: true },
    downloadable: { type: Boolean, default: true },
    editable: { type: Boolean, default: true },
})

</script>

<script>
export default {
    inheritAttrs: false,
}
</script>

<template>
    <div class="ln-h-full ln-flex ln-items-start ln-justify-center">
        <div class="ln-relative ln-w-full">
            <RemoveButton v-if="removable" class="ln-absolute ln-z-20 ln-top-[-10px] ln-right-[-9px]"
                @click.prevent.stop="emit('removed', $event)" v-tooltip="{
                    content: __('Remove'),
                    delay: {
                        show: 1,
                        hide: 0,
                    }
                }" :dusk="$attrs.dusk" />

            <preview :file="file" :editable="editable" @onDetail="emit('onDetail', $event)" :iconSize="36" />

            <p class="ln-font-semibold ln-text-xs ln-mt-1 ln-break-all">{{ file.name }} {{ file.copy ? 'Copied' : ''
                }}
            </p>
            <p class="ln-text-xs ln-text-gray-500 ln-mt-1 ln-break-all">{{ formatBytes(file.originalFile?.size) }}
            </p>
            <p class="ln-text-xs ln-text-gray-500 ln-mt-1 ln-break-all">{{ file.type }}</p>
            <a :href="file.previewUrl" :download="file.name" v-if="downloadable && file.previewUrl"
                class="ln-text-xs ln-text-gray-500 ln-mt-1 ln-break-all ">Download</a>
        </div>
    </div>
</template>
