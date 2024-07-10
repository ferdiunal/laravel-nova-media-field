<script setup>
import { useLocalization } from 'laravel-nova-useLocalization';
import { defineEmits, defineProps, computed } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: { type: String, required: true },
})
const { __ } = useLocalization()
const value = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})
</script>

<template>
    <button type="button" @click.prevent.stop="value = 'list'"
        v-tooltip="{ content: __('List View'), delay: { show: 1, hide: 0 } }"
        class="ln-cursor-pointer ln-rounded ln-text-sm ln-font-bold ln-inline-flex ln-items-center ln-justify-center ln-focus:ln-outline-none ln-focus:ln-ring ln-border-2 ln-w-8 ln-p-1 ln-h-8"
        :class="value === 'list' ? 'ln-border-primary-300 ln-dark:border-gray-500 ln-hover:border-primary-500 ln-active:border-primary-400 ln-dark:hover:border-gray-400 ln-dark:active:border-gray-300 ln-ring-primary-200 ln-dark:ring-gray-600' : 'ln-border-transparent'">
        <svg class="w-3.5 h-3.5 stroke-current"
            :class="value === 'list' ? 'ln-text-primary-500 ln-dark:ln-text-gray-400' : 'ln-text-gray-400 ln-dark:ln-text-gray-400'"
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3 6.5C3 8.05556 3.5 9.41667 4 9.61111C4.5 9.80556 8 10 12 10C16 10 19.5 9.80555 20 9.61111C20.5 9.41667 21 8.05556 21 6.5C21 4.94444 20.5 3.58333 20 3.38889C19.5 3.19444 16 3 12 3C8 3 4.5 3.19444 4 3.38889C3.5 3.58333 3 4.94444 3 6.5Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M3 17.5C3 19.0556 3.5 20.4167 4 20.6111C4.5 20.8056 8 21 12 21C16 21 19.5 20.8056 20 20.6111C20.5 20.4167 21 19.0556 21 17.5C21 15.9444 20.5 14.5833 20 14.3889C19.5 14.1944 16 14 12 14C8 14 4.5 14.1944 4 14.3889C3.5 14.5833 3 15.9444 3 17.5Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </button>
</template>
