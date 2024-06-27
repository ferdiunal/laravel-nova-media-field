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
        class="cursor-pointer rounded text-sm font-bold inline-flex items-center justify-center focus:outline-none focus:ring border-2 w-6 h-6"
        :class="value === 'list' ? 'border-primary-300 dark:border-gray-500 hover:border-primary-500 active:border-primary-400 dark:hover:border-gray-400 dark:active:border-gray-300 ring-primary-200 dark:ring-gray-600' : 'border-transparent'">
        <svg class="w-3.5 h-3.5 stroke-current"
            :class="value === 'list' ? 'text-primary-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-400'"
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
