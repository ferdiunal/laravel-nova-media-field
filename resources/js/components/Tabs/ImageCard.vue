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
    <div class="ln-col-span-1 ln-bg-gray-50 ln-dark:ln-bg-gray-700 ln-relative ln-items-center ln-justify-center ln-border-2 ln-rounded-md ln-transition-colors ln-delay-150 ln-ease-in-out ln-duration-75 ln-flex ln-flex-col ln-items-center ln-group ln-overflow-hidden"
        :class="modelValue.some(r => r.id === media?.id) ? 'ln-hover:ln-border-primary-600 ln-border-primary-500' : 'ln-hover:ln-border-gray-400 ln-dark:ln-hover:ln-border-gray-800 ln-border-gray-200 ln-dark:ln-border-gray-700'">
        <div class="ln-mb-4 ln-px-4">
            <template v-if="isImage">
                <img :src="media.src" :alt="media.alt" :srcset="media.srcset ?? undefined" loading="lazy"
                    decoding="async" @error="isError = true" v-if="!isError"
                    class="ln-rounded-sm ln-aspect-square ln-px-4 ln-object-scale-down">
                <PhotoIcon class="ln-w-full ln-h-full" v-else />
            </template>
            <template v-else>
                <div class="ln-rounded ln-bg-gray-200 ln-border-2 ln-border-gray-200 ln-p-4">
                    <Icon type="document-text" width="90" height="90" />
                </div>
            </template>
        </div>
        <span class="ln-text-center ln-text-xs ln-p-1.5 ln-break-all">{{ media.file_name }}</span>

        <div @click.prevent="value = media"
            class="ln-absolute hover:ln-bg-primary-50/60 ln-opacity-0 hover:ln-opacity-100 ln-z-50 ln-inset-0 ln-inline-flex ln-justify-center ln-items-center ln-delay-150 ln-duration-75 ln-ease-in-out ln-transition-all">
            <div class="ln-inline-flex ln-items-center ln-justify-center ln-opacity-100 ln-z-50">
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
