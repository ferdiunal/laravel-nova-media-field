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
    <div class="ln-absolute ln-z-50 ln-mt-1.5 ln-inset-0 ln-bg-white ln-flex ln-flex-col ln-py-1.5 h-dvh">
        <div>
            <div
                class="ln-flex ln-flex-row ln-items-center ln-gap-x-2.5 ln-py-2.5 ln-px-3.5 ln-border-b ln-border-gray-100">
                <Button @click="onCloseDetail">
                    <ArrowLeftIcon class="ln-h-5 ln-w-5" aria-hidden="true" />
                </Button>
                <span class="ln-font-normal ln-text-lg ln-truncate">
                    {{ mediaDetail?.name?.length ? mediaDetail?.name : "No Name" }}</span>
            </div>
        </div>
        <div class="ln-overflow-y-auto ln-h-full ln-px-6 ln-pt-3.5 ln-pb-8" style="max-height: 88dvh;">
            <div class="ln-flex ln-flex-col ln-gap-y-1.5">
                <template v-if="isImage">
                    <img :src="mediaDetail?.src" :srcset="mediaDetail?.srcset" :alt="mediaDetail?.name"
                        class="ln-w-full ln-max-w-xs ln-mx-auto ln-rounded-md ln-mb-4" />
                </template>
                <template v-else>
                    <div class="ln-max-w-xs ln-mx-auto ln-mb-4">
                        <div
                            class="ln-rounded-md ln-bg-gray-200 ln-w-full ln-h-full ln-border-2 ln-inline-flex ln-justify-center ln-items-center ln-border-gray-200 ln-p-4">
                            <Icon type="document-text" width="180" height="180" />
                        </div>
                    </div>
                </template>
                <div class="ln-flex ln-flex-col ln-gap-y-4">
                    <div class="ln-grid ln-grid-cols-8 ln-items-start">
                        <span class="ln-font-bold ln-col-span-3">File Name:</span>
                        <span class="text-sm ln-col-span-5">{{ mediaDetail?.file_name }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="ln-font-bold ln-col-span-3">File Type:</span>
                        <span class="text-sm ln-col-span-5">{{ mediaDetail?.mime_type }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="ln-font-bold ln-col-span-3">File Size:</span>
                        <span class="text-sm ln-col-span-5">{{ formatBytes(mediaDetail?.size) }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="ln-font-bold ln-col-span-3">Last modification:</span>
                        <span class="text-sm ln-col-span-5" v-tooltip="{
                            content: mediaDetail?.updated_at,
                            delay: {
                                show: 1,
                                hide: 0
                            }
                        }">{{
                            mediaDetail?.readable_updated_at
                            }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="font-bold ln-col-span-3">Upload Date:</span>
                        <span class="text-sm ln-col-span-5" v-tooltip="{
                            content: mediaDetail?.created_at,
                            delay: {
                                show: 1,
                                hide: 0
                            }
                        }">{{
                            mediaDetail?.readable_created_at
                            }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="ln-font-bold ln-col-span-3">Collection:</span>
                        <span class="ln-text-sm ln-col-span-5">{{ mediaDetail?.collection_name }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="ln-font-bold ln-col-span-3">Disk:</span>
                        <span class="ln-text-sm ln-col-span-5">{{ mediaDetail?.disk }}</span>
                    </div>
                    <div class="ln-grid ln-grid-cols-8 ln-items-center">
                        <span class="ln-font-bold ln-col-span-3">URL:</span>
                        <input class="ln-w-full ln-col-span-5 form-control form-input form-control-bordered"
                            :value="mediaDetail?.src" readonly @click="onSelect" />
                    </div>
                </div>
            </div>

            <div class="ln-flex ln-flex-col ln-mt-5 ln-gap-y-4">
                <div>
                    <label for="name" class="ln-block ln-text-sm ln-font-medium ln-leading-6 ln-text-gray-900">
                        File Name
                    </label>
                    <div class="ln-mt-2">
                        <input id="name" class="ln-w-full form-control form-input form-control-bordered"
                            v-model="formName" />
                    </div>
                </div>
                <div v-if="isImage">
                    <label for="altText" class="ln-block ln-text-sm ln-font-medium ln-leading-6 ln-text-gray-900">
                        Alt Text
                    </label>
                    <div class="ln-mt-2">
                        <input id="altText" class="ln-w-full form-control form-input form-control-bordered"
                            v-model="formAltText" />
                    </div>
                </div>
                <div class="ln-flex ln-flex-row ln-items-center ln-justify-between ln-gap-x-4">
                    <DefaultButton :disabled="!mediaDetail?.name.length" class="ln-bg-primary-500 ln-w-full"
                        :class="[!mediaDetail?.name.length ? 'ln-cursor-not-allowed ln-opacity-50' : '']"
                        @click="onUpdate">
                        Save
                    </DefaultButton>
                    <CancelButton type="button" class="ln-border ln-border-gray-50 ln-w-full" @click="onCloseDetail">
                        Back
                    </CancelButton>
                </div>
            </div>
        </div>
    </div>
</template>
