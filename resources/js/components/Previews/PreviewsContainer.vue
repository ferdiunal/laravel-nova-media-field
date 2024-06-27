<script setup>
import { defineProps, computed, watch } from 'vue';
import { cn } from '../../utils';
const props = defineProps(['field', 'files'])

const listType = computed(() => window.NovaMedia.state("drawer").listType)

const gridClass = computed(() => {
    const $class = "grid transition-all mt-3.5 duration-300 ease-in-out delay-75"
    if (props.field?.multiple && listType.value === 'grid') {
        return cn($class, 'grid-cols-4 gap-6')
    } else if (listType.value === 'two-column') {
        return cn($class, 'grid-cols-2 gap-6')
    } else {
        return cn($class, 'grid-cols-1 gap-6 max-w-sm')
    }
})


const onDetail = (id) => {
    if (!props.field) {
        return
    }
    window.NovaMedia.dispatch('drawer', 'detail', id)
}
const onRemove = (file) => {
    if (!file.copy && !file.mediaId) {
        window.NovaMedia.commit("upload", "setRemovableFile", file)
        return
    }
    if (!props.field) {
        return
    }
    const drawerState = window.NovaMedia.state('drawer')
    window.NovaMedia.commit("upload", "setRemovableFile", file?.copy ? file : { resourceName: drawerState.resourceName, resourceId: drawerState.resourceId, fieldAttribute: drawerState.attribute, mediaId: file.mediaId })
}
const downloadable = computed(() => props.field?.downloadable ?? false)
const updatable = computed(() => props.field?.updatable ?? false)
const deletable = computed(() => props.field?.deletable ?? false)
const rounded = computed(() => props.field?.rounded ?? false)
const attribute = computed(() => props.field?.attribute)

</script>

<template>
    <div class="h-full pr-6 overflow-y-auto overflow-x-none fileList-container" v-if="files.length">
        <div v-show="listType !== 'list'" :class="gridClass">
            <template v-for="(file, key) in files" :key="key">
                <div v-tooltip="{
                    content: file?.mediaId === undefined || file?.mediaId && file?.copy ? 'The file has not loaded yet' : '', delay: { show: 1, hide: 0, }
                }" class="col-span-1">
                    <block-preview :file="file" :removable="deletable" @onDetail="onDetail"
                        @removed="() => onRemove(file)" :rounded="rounded" :downloadable="downloadable"
                        :dusk="`${attribute}-${key}-delete-link`" :updatable="updatable" />
                </div>
            </template>
        </div>

        <ul role="list" v-show="listType === 'list'" className="divide-y divide-gray-100">
            <row-preview v-for="(file, key) in files" v-tooltip="{
                content: file?.mediaId === undefined || file?.mediaId && file?.copy ? 'The file has not loaded yet' : '', delay: { show: 1, hide: 0, }
            }" :key="key" :file="file" :removable="deletable" :downloadable="downloadable" @onDetail="onDetail"
                :updatable="updatable" @removed="() => onRemove(file)" />

        </ul>
    </div>
</template>
