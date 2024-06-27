<script setup>
import { useLocalization } from 'laravel-nova-useLocalization';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { computed, defineProps, ref, watch } from 'vue';

const { __ } = useLocalization()

const state = computed(() => window.NovaMedia.state("drawer"))
const uploadState = computed(() => window.NovaMedia.state("upload"))
const props = defineProps({
    field: Object
})

const open = computed(() => state.value.open)

const files = computed(() => {
    const previewFiles = uploadState.value.previewImages
    const files = uploadState.value.files

    return [...previewFiles, ...files]?.sort((a, b) => a.order - b.order).filter(file => !file.hide)
})
const onClose = () => {
    window.NovaMedia.commit("drawer", "close")
}
const onOpen = async () => {
    window.NovaMedia.commit("drawer", "open")
}
</script>

<template>
    <div class="grid">
        <div class="flex flex-row justify-between items-center">
            <OutlineButton type="button" @click.prevent="onOpen">
                {{ __('nova-media_field_label') }}
            </OutlineButton>
            <tools v-model="listType" />
        </div>

        <previews-container :field="field" :files="files" />
    </div>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-50" @close="onClose">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto relative w-screen max-w-2xl">
                                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                                    enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100"
                                    leave-to="opacity-0">
                                    <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                        <button type="button"
                                            class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            @click="onClose">
                                            <span class="absolute -inset-2.5" />
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div class="flex h-full flex-col overflow-hidden bg-white dark:bg-gray-800 shadow-xl">
                                    <slot />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
