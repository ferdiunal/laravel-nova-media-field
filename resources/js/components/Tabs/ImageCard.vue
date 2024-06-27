<script setup>
import { PhotoIcon } from "@heroicons/vue/20/solid";
import { computed, defineEmits, defineProps, ref } from 'vue';

const props = defineProps({
    modelValue: Array,
    media: Object,
    multiple: Boolean
})
const emit = defineEmits(["onOpen", "update:modelValue"])
const isError = ref(false)

const value = computed({
    get: () => props.modelValue,
    set: (value) => {
        if (!props.multiple && props.modelValue.length === 1 && !props.modelValue.includes(value)) {
            emit('update:modelValue', [value])
            return;
        }
        if (props.modelValue.includes(value)) {
            emit('update:modelValue', props.modelValue.filter(m => m !== value))
            return
        }
        emit('update:modelValue', [...new Set([...props.modelValue, value])])
    }
})

const onOpen = () => {
    if (!isError.value) {
        emit('onOpen', props.media.id)
    }
}
const isImage = computed(() => props.media.mime_type.startsWith('image'))
</script>
<template>
    <div class="col-span-1 bg-gray-50 dark:bg-gray-700 relative items-center justify-center border-2 rounded-md transition-colors delay-150 ease-in-out duration-75 flex flex-col items-center group overflow-hidden"
        :class="modelValue.some(r => r.id === media?.id) ? 'media-active' : 'media-passive'">
        <div class="mb-4 px-4">
            <template v-if="isImage">
                <img :src="media.src" :alt="media.alt" :srcset="media.srcset ?? undefined" loading="lazy"
                    decoding="async" @error="isError = true" v-if="!isError"
                    class="rounded-sm aspect-square px-4 object-scale-down">
                <PhotoIcon class="w-full h-full" v-else />
            </template>
            <template v-else>
                <div class="rounded bg-gray-200 border-2 border-gray-200 p-4">
                    <Icon type="document-text" width="90" height="90" />
                </div>
            </template>
        </div>
        <span class="text-center text-xs p-1.5 break-all">{{ media.file_name }}</span>

        <div @click.prevent="value = media"
            class="absolute rounded-md opacity-0 group-hover:opacity-100 transition-all delay-75 duration-150 ease-in-out inset-0 p-1.5 inline-flex items-center justify-center">
            <div class="absolute inset-0 bg-primary-50 opacity-75 delay-150 duration-75 ease-in-out transition-colors ">
            </div>
            <div class="inline-flex items-center justify-center opacity-100 z-50">
                <IconButton v-tooltip="{
                    content: 'Edit',
                    delay: {
                        show: 1,
                        hide: 0
                    }
                }" @click.prevent.stop="onOpen" iconType="pencil-alt" solid small />
                <!-- <IconButton v-tooltip="'Copy'" iconType="document-duplicate" solid small /> -->
                <!-- <IconButton v-tooltip="'View'" iconType="eye" solid small /> -->
            </div>
        </div>
    </div>
</template>
