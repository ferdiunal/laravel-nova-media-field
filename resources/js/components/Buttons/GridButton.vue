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
    <button type="button" @click.prevent.stop="value = 'grid'"
        v-tooltip="{ content: __('Grid View'), delay: { show: 1, hide: 0 } }"
        class="cursor-pointer rounded text-sm font-bold inline-flex items-center justify-center focus:outline-none focus:ring border-2 w-6 h-6"
        :class="value === 'grid' ? 'border-primary-300 dark:border-gray-500 hover:border-primary-500 active:border-primary-400 dark:hover:border-gray-400 dark:active:border-gray-300 ring-primary-200 dark:ring-gray-600' : 'border-transparent'">
        <svg class="w-3.5 h-3.5 fill-current"
            :class="value === 'grid' ? 'text-primary-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-400'"
            viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
            <g stroke="current" stroke-width="1" fill="current" fill-rule="evenodd" sketch:type="MSPage">
                <g sketch:type="MSLayerGroup" transform="translate(-102.000000, -933.000000)" fill="current">
                    <path
                        d="M128,941 C128,942.104 127.104,943 126,943 L122,943 C120.896,943 120,942.104 120,941 L120,937 C120,935.896 120.896,935 122,935 L126,935 C127.104,935 128,935.896 128,937 L128,941 L128,941 Z M126,933 L122,933 C119.791,933 118,934.791 118,937 L118,941 C118,943.209 119.791,945 122,945 L126,945 C128.209,945 130,943.209 130,941 L130,937 C130,934.791 128.209,933 126,933 L126,933 Z M128,957 C128,958.104 127.104,959 126,959 L122,959 C120.896,959 120,958.104 120,957 L120,953 C120,951.896 120.896,951 122,951 L126,951 C127.104,951 128,951.896 128,953 L128,957 L128,957 Z M126,949 L122,949 C119.791,949 118,950.791 118,953 L118,957 C118,959.209 119.791,961 122,961 L126,961 C128.209,961 130,959.209 130,957 L130,953 C130,950.791 128.209,949 126,949 L126,949 Z M112,941 C112,942.104 111.104,943 110,943 L106,943 C104.896,943 104,942.104 104,941 L104,937 C104,935.896 104.896,935 106,935 L110,935 C111.104,935 112,935.896 112,937 L112,941 L112,941 Z M110,933 L106,933 C103.791,933 102,934.791 102,937 L102,941 C102,943.209 103.791,945 106,945 L110,945 C112.209,945 114,943.209 114,941 L114,937 C114,934.791 112.209,933 110,933 L110,933 Z M112,957 C112,958.104 111.104,959 110,959 L106,959 C104.896,959 104,958.104 104,957 L104,953 C104,951.896 104.896,951 106,951 L110,951 C111.104,951 112,951.896 112,953 L112,957 L112,957 Z M110,949 L106,949 C103.791,949 102,950.791 102,953 L102,957 C102,959.209 103.791,961 106,961 L110,961 C112.209,961 114,959.209 114,957 L114,953 C114,950.791 112.209,949 110,949 L110,949 Z"
                        id="grid" sketch:type="MSShapeGroup">

                    </path>
                </g>
            </g>
        </svg>
    </button>
</template>
