<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import { useLocalization } from 'laravel-nova-useLocalization';
import { computed, defineEmits, defineProps, onMounted } from "vue";

const props = defineProps({
    field: Object,
    files: Array,
    hasValue: Boolean,
    previewFile: Object,
    shouldShowRemoveButton: Object,
    removeModalOpen: Boolean,
    modelValue: Array,
    resourceName: String,
    resourceId: String,
})

const { __ } = useLocalization()
const state = computed(() => window.NovaMedia.state("library"))
const mediaDetail = computed(() => state.value.detail)
const loadingDetail = computed(() => state.value.loadingDetail)

const fetchMediaData = (s = undefined) => window.NovaMedia.dispatch("library", "fetchMediaData", s)
const fetchLoadMore = () => window.NovaMedia.dispatch("library", "fetchLoadMore")
const fetchMediaDetail = (id) => window.NovaMedia.dispatch("library", "fetchMediaDetail", {
    resourceName: props.resourceName,
    resourceId: props.resourceId,
    attribute: props.field.attribute,
    id,
})
const mediaData = computed(() => state.value.media)
const selected = computed({
    get: () => window.NovaMedia.state("upload").selectedFiles,
    set: (value) => window.NovaMedia.commit("upload", "setSelectedFiles", value),
})
const loading = computed(() => state.value.loading)
const emit = defineEmits(["updated"])
const totalPages = computed(() => Math.ceil(mediaData.value.meta?.total / mediaData.value.meta?.per_page))
const getMediaData = computed(() => mediaData.value.data?.sort((a, b) => {
    const aUpdatedAt = new Date(a.order_column)
    const bUpdatedAt = new Date(b.order_column)

    return aUpdatedAt - bUpdatedAt
}))
const hasNextPage = computed(() => mediaData.value.meta?.current_page < mediaData.value.meta?.last_page)
const hasPreviousPage = computed(() => mediaData.value.meta?.current_page > 1)
const resourceCountLabel = computed(() => {
    const { per_page, current_page, total } = mediaData.value.meta ?? {
        per_page: 0,
        current_page: 0,
        total: 0,
    }
    const dataLength = mediaData.value.data?.length
    const first = per_page * (current_page - 1)

    return (
        dataLength &&
        `${Nova.formatNumber(first + 1)}-${Nova.formatNumber(
            first + dataLength
        )} ${__('of')} ${Nova.formatNumber(total)}`
    )
})

const onDetail = (id) => {
    fetchMediaDetail(id).then()
}

onMounted(() => {
    fetchMediaData().then()
})

const onUpdate = async () => {
    await window.NovaMedia.dispatch("library", "updateMedia", {
        resourceName: props.resourceName,
        resourceId: props.resourceId,
        attribute: props.field.attribute,
    })
    window.NovaMedia.commit("drawer", "close");
}

const onClose = () => {
    NovaMedia.commit("library", "setDetail", undefined)
    NovaMedia.commit("drawer", "close")
}

const onCancel = () => {
    selected.value = []
    onClose()
}

const onChoose = () => {
    window.NovaMedia.dispatch("upload", "handleFileChangeLibrary")
    onClose()
}

</script>
<template>
    <div class="relative h-full">
        <div class="mt-3 flex-1 px-4 sm:px-6" v-show="!mediaDetail">
            <div class="mb-2 pr-4">
                <div class="flex rounded-md shadow-sm">
                    <div class="relative flex flex-grow items-stretch focus-within:z-10">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input type="search" class="w-full form-control form-input form-control-bordered"
                            style="text-indent: 1.5rem;" @input.debounce="fetchMediaData($event.target.value)"
                            placeholder="Search Media Library" />
                    </div>
                </div>
            </div>
            <div class="overflow-y-auto h-full pr-4" style="max-height: 85dvh;">
                <div class="grid pb-4">
                    <span v-if="loading">Loading</span>
                    <div v-else class="grid grid-cols-3 gap-4">
                        <template v-for="media in getMediaData" :key="media.id">
                            <image-card :multiple="!!field.multiple" v-model="selected" :media="media"
                                @onOpen="onDetail($event)" />
                        </template>
                    </div>
                </div>
                <pagination-load-more v-if="!loading" :allMatchingResourceCount="mediaData.meta?.total"
                    :currentResourceCount="mediaData.data?.length" :page="mediaData.meta?.current_page"
                    :per-page="mediaData.meta?.per_page" :pages="totalPages" :next="hasNextPage"
                    :previous="hasPreviousPage" @load-more="fetchLoadMore" :resource-count-label="resourceCountLabel" />
            </div>
        </div>

        <image-detail v-if="mediaDetail && !loadingDetail" :media="mediaDetail" :resourceName="resourceName"
            :resourceId="resourceId" :field="field" @onUpdate="onUpdate" />

        <div v-if="selected.length > 0 && !mediaDetail" class="absolute bottom-5 w-full p-4" style="z-index: 100;">
            <div
                class="bg-white w-full max-w-sm mx-auto border gap-x-4 border-gray-200 py-1.5 rounded-lg px-2.5 gap-x-4 flex flex-row items-center justify-between">
                <DefaultButton class="bg-primary-500 w-full" @click.prevent.stop="onChoose">
                    Choose
                </DefaultButton>
                <CancelButton class="w-full" @click.prevent.stop="onCancel">
                    Cancel
                </CancelButton>
            </div>
        </div>
    </div>
</template>
