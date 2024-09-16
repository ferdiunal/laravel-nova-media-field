<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';
import { useLocalization } from 'laravel-nova-useLocalization';
import { computed, defineProps } from 'vue';

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
const onClose = (e) => {
    window.NovaMedia.commit("drawer", "close")
}
const onOpen = async () => {
    window.NovaMedia.commit("drawer", "open")
}
</script>

<template>
    <div class="ln-grid">
        <div class="ln-flex ln-flex-row ln-justify-between ln-items-center ln-pb-4">
            <OutlineButton type="button" @click.prevent="onOpen">
                {{ __('nova-media_field_label') }}
            </OutlineButton>
            <tools v-model="listType" />
        </div>

        <previews-container :field="field" :files="files" />
    </div>
    <TransitionRoot as="template" :show="open">
        <Dialog class="ln-relative ln-z-50">
            <!-- <TransitionChild as="template" enter="ln-ease-in-out ln-duration-500" enter-from="ln-opacity-0"
                enter-to="ln-opacity-100" leave="ln-ease-in-out ln-duration-500" leave-from="ln-opacity-100"
                leave-to="ln-opacity-0">
                <div class="ln-fixed ln-inset-0 ln-bg-gray-400/40 ln-transition-opacity"  @close="onClose"/>
            </TransitionChild> -->

            <div class="ln-fixed ln-inset-0 ln-overflow-hidden">
                <div class="ln-absolute ln-inset-0 ln-overflow-hidden">
                    <div class="ln-pointer-events-none ln-fixed ln-inset-y-0 ln-right-0 ln-flex ln-max-w-full ln-pl-10">
                        <TransitionChild as="template"
                            enter="ln-transform ln-transition ln-ease-in-out ln-duration-500 sm:ln-duration-700"
                            enter-from="ln-translate-x-full" enter-to="ln-translate-x-0"
                            leave="ln-transform ln-transition ln-ease-in-out ln-duration-500 sm:ln-duration-700"
                            leave-from="ln-translate-x-0" leave-to="ln-translate-x-full">
                            <DialogPanel class="ln-pointer-events-auto ln-relative ln-w-screen ln-max-w-2xl">
                                <TransitionChild as="template" enter="ln-ease-in-out ln-duration-500"
                                    enter-from="ln-opacity-0" enter-to="ln-opacity-100"
                                    leave="ln-ease-in-out ln-duration-500" leave-from="ln-opacity-100"
                                    leave-to="ln-opacity-0">
                                    <div
                                        class="ln-absolute ln-left-0 ln-top-0 -ln-ml-8 ln-flex ln-pr-2 ln-pt-4 ln-sm:-ln-ml-10 ln-sm:ln-pr-4">
                                        <button type="button"
                                            class="ln-relative ln-rounded-md ln-text-gray-300 ln-hover:ln-text-white ln-focus:ln-outline-none ln-focus:ln-ring-2 ln-focus:ln-ring-white"
                                            @click="onClose">
                                            <span class="ln-absolute -ln-inset-2.5" />
                                            <span class="sr-only">Close panel</span>
                                            <XMarkIcon class="ln-h-6 ln-w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div
                                    class="ln-flex ln-h-full ln-flex-col ln-overflow-hidden ln-bg-white ln-dark:ln-bg-gray-800 ln-shadow-xl">
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
