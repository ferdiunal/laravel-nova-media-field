<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/20/solid';
import { computed, defineEmits } from 'vue';
import { formatBytes } from '../../utils';

const emit = defineEmits(['onUpdate'])
const state = computed(() => window.NovaMedia.state("library"))
const mediaDetail = computed(() => state.value.detail)

const formName = computed({
    get: () => state.value.form.name,
    set: (value) => window.NovaMedia.commit("library", "setFormName", value),
})
const formAltText = computed({
    get: () => state.value.form.alt_text,
    set: (value) => window.NovaMedia.commit("library", "setFormAltText", value),
})

const onUpdate = () => {
    emit('onUpdate')
}

const onSelect = (event) => {
    event.target.select()
    try {
        document.execCommand('copy')
    } catch (err) {
        console.error('Unable to copy', err)

        try {
            navigator.clipboard.writeText(event.target.value)
        } catch (err) {
            console.error('Unable to remove selection', err)
        }
    }
}

const onCloseDetail = () => {
    NovaMedia.commit("library", "setDetail", undefined)
}

const isImage = computed(() => mediaDetail.value.mime_type.startsWith('image'))

</script>

<template>
    <div class="absolute z-50 mt-1.5 inset-0 bg-white flex flex-col py-1.5" style="height: 100dvb;">
        <div>
            <div class="flex flex-row items-center gap-x-2.5 py-2.5 px-3.5 border-b border-gray-100">
                <Button @click="onCloseDetail">
                    <ArrowLeftIcon class="h-5 w-5" aria-hidden="true" />
                </Button>
                <span class="font-normal text-lg truncate">
                    {{ mediaDetail?.name?.length ? mediaDetail?.name : "No Name" }}</span>
            </div>
        </div>
        <div class="overflow-y-auto h-full px-6 pt-3.5 pb-8" style="max-height: 88dvh;">
            <div class="flex flex-col gap-y-1.5">
                <template v-if="isImage">
                    <img :src="mediaDetail?.src" :srcset="mediaDetail?.srcset" :alt="mediaDetail?.name"
                        class="w-full max-w-xs mx-auto rounded-md mb-4" />
                </template>
                <template v-else>
                    <div class="max-w-xs mx-auto mb-4">
                        <div
                            class="rounded-md bg-gray-200 w-full h-full border-2 inline-flex justify-center items-center border-gray-200 p-4">
                            <Icon type="document-text" width="180" height="180" />
                        </div>
                    </div>
                </template>
                <div class="flex flex-col gap-y-4">
                    <div class="grid grid-cols-8 items-start">
                        <span class="font-bold col-span-3">File Name:</span>
                        <span class="text-sm col-span-5">{{ mediaDetail?.file_name }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">File Type:</span>
                        <span class="text-sm col-span-5">{{ mediaDetail?.mime_type }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">File Size:</span>
                        <span class="text-sm col-span-5">{{ formatBytes(mediaDetail?.size) }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">Last modification:</span>
                        <span class="text-sm col-span-5" v-tooltip="{
                            content: mediaDetail?.updated_at,
                            delay: {
                                show: 1,
                                hide: 0
                            }
                        }">{{
                            mediaDetail?.readable_updated_at
                            }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">Upload Date:</span>
                        <span class="text-sm col-span-5" v-tooltip="{
                            content: mediaDetail?.created_at,
                            delay: {
                                show: 1,
                                hide: 0
                            }
                        }">{{
                            mediaDetail?.readable_created_at
                            }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">Collection:</span>
                        <span class="text-sm col-span-5">{{ mediaDetail?.collection_name }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">Disk:</span>
                        <span class="text-sm col-span-5">{{ mediaDetail?.disk }}</span>
                    </div>
                    <div class="grid grid-cols-8 items-center">
                        <span class="font-bold col-span-3">URL:</span>
                        <input class="w-full col-span-5 form-control form-input form-control-bordered"
                            :value="mediaDetail?.src" readonly @click="onSelect" />
                    </div>
                </div>
            </div>

            <div class="flex flex-col mt-5 gap-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
                        File Name
                    </label>
                    <div class="mt-2">
                        <input id="name" class="w-full form-control form-input form-control-bordered"
                            v-model="formName" />
                    </div>
                </div>
                <div v-if="isImage">
                    <label for="altText" class="block text-sm font-medium leading-6 text-gray-900">
                        Alt Text
                    </label>
                    <div class="mt-2">
                        <input id="altText" class="w-full form-control form-input form-control-bordered"
                            v-model="formAltText" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between gap-x-4">
                    <DefaultButton :disabled="!mediaDetail?.name.length" class="bg-primary-500 w-full"
                        :class="[!mediaDetail?.name.length ? 'cursor-not-allowed opacity-50' : '']" @click="onUpdate">
                        Save
                    </DefaultButton>
                    <CancelButton type="button" class="border border-gray-50 w-full" @click="onCloseDetail">
                        Back
                    </CancelButton>
                </div>
            </div>
        </div>
    </div>
</template>
