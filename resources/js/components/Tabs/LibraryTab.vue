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
    <div class="ln-relative ln-h-full">
        <div class="ln-mt-3 ln-flex-1 ln-px-4 ln-sm:ln-px-6" v-show="!mediaDetail">
            <div class="ln-mb-2 ln-pr-4">
                <div class="ln-flex ln-rounded-md ln-shadow-sm">
                    <div class="ln-relative ln-flex ln-flex-grow ln-items-stretch ln-focus-within:ln-z-10">
                        <div
                            class="ln-pointer-events-none ln-absolute ln-inset-y-0 ln-left-0 ln-flex ln-items-center ln-pl-3">
                            <MagnifyingGlassIcon class="ln-h-5 ln-w-5 ln-text-gray-400" aria-hidden="true" />
                        </div>
                        <input type="search" class="ln-w-full form-control form-input form-control-bordered"
                            style="text-indent: 1.5rem;" @input.debounce="fetchMediaData($event.target.value)"
                            placeholder="Search Media Library" />
                    </div>
                </div>
            </div>
            <div class="ln-overflow-y-auto ln-h-full ln-pr-4" style="max-height: 85dvh;">
                <div class="ln-grid pb-4">
                    <span v-if="loading">Loading</span>
                    <div v-else class="ln-grid ln-grid-cols-3 ln-gap-4">
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

        <div v-if="selected.length > 0 && !mediaDetail" class="ln-absolute ln-bottom-5 ln-w-full ln-p-4"
            style="z-index: 100;">
            <div
                class="ln-bg-white ln-w-full ln-max-w-sm ln-mx-auto ln-border ln-border-gray-200 ln-py-1.5 ln-rounded-lg ln-px-2.5 ln-gap-x-4 ln-flex ln-flex-row ln-items-center ln-justify-between">
                <DefaultButton class="ln-bg-primary-500 ln-w-full" @click.prevent.stop="onChoose">
                    Choose
                </DefaultButton>
                <CancelButton class="ln-w-full" @click.prevent.stop="onCancel">
                    Cancel
                </CancelButton>
            </div>
        </div>
    </div>
</template>
