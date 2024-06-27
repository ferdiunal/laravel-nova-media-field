<script setup>
import { useLocalization } from 'laravel-nova-useLocalization';
import { computed } from 'vue';
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
    <div class="h-full flex items-start justify-center">
        <div class="relative w-full">
            <RemoveButton v-if="removable" class="absolute z-20 top-[-10px] right-[-9px]"
                @click.prevent.stop="emit('removed', $event)" v-tooltip="{
                    content: __('Remove'),
                    delay: {
                        show: 1,
                        hide: 0,
                    }
                }" :dusk="$attrs.dusk" />

            <preview :file="file" :editable="editable" @onDetail="emit('onDetail', $event)" :iconSize="36" />

            <p class="font-semibold text-xs mt-1 break-all">{{ file.name }} {{ file.copy ? 'Copied' : '' }}</p>
            <p class="text-xs text-gray-500 mt-1 break-all">{{ formatBytes(file.originalFile?.size) }}</p>
            <p class="text-xs text-gray-500 mt-1 break-all">{{ file.type }}</p>
            <a :href="file.previewUrl" :download="file.name" v-if="downloadable && file.previewUrl"
                class="text-xs text-gray-500 mt-1 break-all ">Download</a>
        </div>
    </div>
</template>
