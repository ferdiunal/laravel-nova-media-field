<script setup>
import { Button } from 'laravel-nova-ui';
import { useDragAndDrop } from 'laravel-nova-useDragAndDrop';
import { useLocalization } from 'laravel-nova-useLocalization';
import { ref } from 'vue';

const emit = defineEmits(['fileChanged', 'fileRemoved'])
const { __ } = useLocalization()

const props = defineProps({
    files: { type: Array, default: [] },
    field: { type: Object, required: true },
})

const { startedDrag, handleOnDragEnter, handleOnDragLeave } =
    useDragAndDrop(emit)

const { multiple, allowedExtensions, allowedMimeTypes, minSize, size, maxSize, disabled } = props.field
const fileInput = ref()

const handleClick = () => fileInput.value.click()

const handleOnDrop = e => {
    const files = fileInput.value.files
    if (!props.field.multiple) {
        window.NovaMedia.commit("upload", "hidePreviewImages")
        window.NovaMedia.commit("upload", "setFiles", [])
        window.NovaMedia.commit("upload", "setVaporFiles", [])
    }
    window.NovaMedia.dispatch("upload", "handleChange", files)
}

const handleChange = (e) => {
    const files = e.target.files

    if (!props.field.multiple) {
        window.NovaMedia.commit("upload", "hidePreviewImages")
        window.NovaMedia.commit("upload", "setFiles", [])
        window.NovaMedia.commit("upload", "setVaporFiles", [])
    }

    const _files = []
    for (const file of files) {
        const extension = file.name.split('.').pop()
        const fileSize = file.size

        if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
            window.Nova.error(__(`The file (${file.name}) extension is not allowed.`))
            continue;
        }

        if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(file.type)) {
            window.Nova.error(__(`The file (${file.name}) mime type is not allowed.`))
            continue;
        }

        console.log({
            fileSize, minSize, maxSize
        })
        if (minSize > 0 && fileSize < (minSize * 1_000)) {
            window.Nova.error(__(`The file (${file.name}) size is too small.`))
            continue;
        }

        if (size > 0 && fileSize === (size * 1_000)) {
            window.Nova.error(__(`The file (${file.name}) size is not allowed.`))
            continue;
        }

        if (maxSize > 0 && fileSize > (maxSize * 1_000)) {
            window.Nova.error(__(`The file (${file.name}) size is too large.`))
            continue;
        }

        _files.push(file)
    }

    window.NovaMedia.dispatch("upload", "handleChange", _files).then()
}
</script>
<template>
    <div>
        <input class="visually-hidden" :dusk="$attrs['input-dusk']" @change.prevent="handleChange" type="file"
            ref="fileInput" :multiple="multiple" :accept="allowedMimeTypes.join(',')" :disabled="disabled"
            tabindex="-1" />

        <div tabindex="0" role="button" @click="handleClick" @keydown.space.prevent="handleClick"
            @keydown.enter.prevent="handleClick"
            class="focus:outline-none focus:!border-primary-500 block cursor-pointer p-4 bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-900 border-4 border-dashed hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 rounded-lg"
            :class="{ 'border-gray-300 dark:border-gray-600': startedDrag }" @dragenter.prevent="handleOnDragEnter"
            @dragleave.prevent="handleOnDragLeave" @dragover.prevent @drop.prevent="handleOnDrop">
            <div class="flex items-center space-x-4 pointer-events-none">
                <p class="text-center pointer-events-none">
                    <Button as="div">
                        {{ multiple ? __('Choose Files') : __('Choose File') }}
                    </Button>
                </p>

                <p class="pointer-events-none text-center text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    {{
                        multiple
                            ? __('Drop files or click to choose')
                            : __('Drop file or click to choose')
                    }}
                </p>
            </div>
        </div>
    </div>
</template>
