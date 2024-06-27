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
    <div>
        <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <select id="tabs" name="tabs"
                class="block w-full border-primary-300 focus:border-primary-500 focus:ring-primary-500">
                <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
            </select>
        </div>
        <div class="hidden sm:block">
            <nav class="isolate flex divide-x divide-primary-200 shadow" aria-label="Tabs">
                <button v-for="(tab) in tabs" :key="tab.name" @click="value = tab.value"
                    :class="[tab.current ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 hover:text-gray-700', 'group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-900 dark:text-white py-4 px-4 text-center text-sm font-medium hover:bg-primary-50 focus:z-10']"
                    :aria-current="tab.current ? 'page' : undefined">
                    <div class="inline-flex items-center gap-x-2">
                        <component :is="tab.icon" class="w-5 h-5" />
                        <span>{{ tab.name }}</span>
                    </div>
                    <span aria-hidden="true"
                        :class="[tab.current ? 'bg-primary-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
                </button>
            </nav>
        </div>
    </div>
</template>
