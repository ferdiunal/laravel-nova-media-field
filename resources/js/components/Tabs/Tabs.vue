<script setup>
import { useLocalization } from 'laravel-nova-useLocalization';
import { defineEmits, defineProps, computed } from 'vue'
import { ComputerDesktopIcon, InboxIcon } from '@heroicons/vue/24/outline'

const { __ } = useLocalization()

const props = defineProps({
    modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})


const tabs = computed(() => {
    return [
        { name: __('nova-media_field_tabs_upload'), value: 'upload', icon: ComputerDesktopIcon, current: value.value === "upload" },
        { name: __('nova-media_field_tabs_library'), value: 'library', icon: InboxIcon, current: value.value === "library" },
    ];
})

</script>

<template>
    <nav class="isolate flex divide-x divide-primary-200 shadow" aria-label="Tabs">
        <button v-for="(tab) in tabs" :key="tab.name" @click="value = tab.value"
            :class="[tab.current ? 'ln-text-gray-900 ln-dark:ln-text-gray-50' : 'ln-text-gray-500 hover:ln-text-gray-700', 'ln-group ln-relative ln-min-w-0 ln-flex-1 ln-overflow-hidden ln-bg-white ln-dark:ln-bg-gray-900 ln-dark:ln-text-white ln-py-4 ln-px-4 ln-text-center ln-text-sm ln-font-medium ln-hover:ln-bg-primary-50 ln-focus:ln-z-10']"
            :aria-current="tab.current ? 'page' : undefined">
            <div class="ln-inline-flex ln-items-center ln-gap-x-2">
                <component :is="tab.icon" class="ln-w-5 ln-h-5" />
                <span>{{ tab.name }}</span>
            </div>
            <span aria-hidden="true"
                :class="[tab.current ? 'ln-bg-primary-500' : 'ln-bg-transparent', 'ln-absolute ln-inset-x-0 ln-bottom-0 ln-h-0.5']" />
        </button>
    </nav>
</template>
