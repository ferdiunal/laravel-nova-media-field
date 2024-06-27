<script>
import InlineFormData from 'inline-form-data';
import { DependentFormField, Errors, HandlesValidationErrors } from 'laravel-nova';

export default {
    emits: ['file-upload-started', 'file-upload-finished', 'file-deleted'],

    mixins: [HandlesValidationErrors, DependentFormField],

    inject: ['removeFile'],

    expose: ['beforeRemove'],

    props: ['resourceName', 'resourceId', 'field'],

    data: () => ({
        previewFiles: [],
        files: [],
        missing: false,
        deleted: false,
        uploadErrors: new Errors(),
        vaporFiles: [],
        uploadProgress: 0,
        startedDrag: false,
        uploadModalShown: false,
        mediaDetailId: null,
    }),

    async mounted() {
        await this.init()
        this.field.fill = formData => {
            const files = window.NovaMedia.state('upload').files
            let attribute = this.fieldAttribute

            if (!Array.isArray(files) || Array.isArray(files) && files.length === 0) {
                return
            }

            if (Array.isArray(files) && !this.isVaporField) {
                let index = 0
                for (const file of files) {
                    if (!file.copy) {
                        formData.append(attribute + '[]', file.originalFile, file.name)
                    } else {
                        formData.append(`${attribute}[${index}][mediaId]`, file.mediaId)
                        formData.append(`${attribute}[${index}][copy]`, file.copy)
                        index++
                    }
                }
            } else if (Array.isArray(files) && this.isVaporField) {
                for (const file of files) {
                    if (!file.copy) {
                        formData.append(attribute + '[]', file.name)
                    }
                }

                this.fillVaporFilePayload(formData, attribute)
            }

            window.NovaMedia.commit('upload', 'clearFiles')
            this.init().then()
        }
    },

    methods: {
        async init() {
            window.NovaMedia.commit('upload', 'setVaporField', this.isVaporField)
            window.NovaMedia.commit('drawer', 'setResource', {
                resourceName: this.resourceName,
                resourceId: this.resourceId,
                attribute: this.field.attribute,
            })
            await window.NovaMedia.dispatch('upload', 'fetchPreviewImages', this.field.value)
        },
        async removeUploadedFile() {
            await window.NovaMedia.dispatch('upload', 'removeFile')
            this.$emit('file-deleted')
            Nova.success(this.__('The file was deleted!'))
        },

        fillVaporFilePayload(formData, attribute) {
            const vaporFiles = window.NovaMedia.state('upload').vaporFiles
            const vaporAttribute =
                formData instanceof InlineFormData
                    ? formData.slug(attribute)
                    : attribute

            const vaporFormData =
                formData instanceof InlineFormData ? formData.formData : formData

            let c = 0;
            for (const vaporFile of vaporFiles) {
                vaporFormData.append(
                    `vaporFiles[${vaporAttribute}][${c}][key]`,
                    vaporFile.key
                )
                vaporFormData.append(
                    `vaporFiles[${vaporAttribute}][${c}][uuid]`,
                    vaporFile.uuid
                )
                vaporFormData.append(
                    `vaporFiles[${vaporAttribute}][${c}][filename]`,
                    vaporFile.filename
                )
                vaporFormData.append(
                    `vaporFiles[${vaporAttribute}][${c}][extension]`,
                    vaporFile.extension
                )
                vaporFormData.append(
                    `vaporFiles[${vaporAttribute}][${c}][width]`,
                    vaporFile.width
                )
                vaporFormData.append(
                    `vaporFiles[${vaporAttribute}][${c}][height]`,
                    vaporFile.height
                )
                c++
            }
        },
    },
    computed: {
        /**
         * The current field attribute.
         */
        tab: {
            get() {
                return window.NovaMedia.state('drawer').tab
            },
            set(value) {
                window.NovaMedia.commit('drawer', 'setTab', value)
            },
        },

        /**
         * The current field attribute.
         */
        removeModalOpen: {
            get() {
                return window.NovaMedia.state('upload').removeModalOpen
            },
            set(value) {
                window.NovaMedia.commit('upload', 'setRemoveModalStatus', value)
            },
        },

        /**
         * Determining if the field is a Vapor field.
         */
        isVaporField() {
            return this.field.vapor
        },

        /**
         * Determine if the field has a help text.
         */
        showHelpText() {
            return this.field.helpText && this.field.helpText.length > 0
        },
    },
}
</script>

<template>
    <DefaultField :field="field" :errors="errors" :show-help-text="showHelpText" :full-width-content="fullWidthContent">
        <template #field>
            <drawer :field="field" :files="files" :resourceId="resourceId" :resourceName="resourceName">
                <template #default>
                    <tabs v-model="tab" />
                    <upload-tab v-if="tab === 'upload'" :field="field" />
                    <library-tab v-else-if="tab === 'library'" :resourceId="resourceId" :resourceName="resourceName"
                        :field="field" />
                </template>
            </drawer>


            <ConfirmUploadRemovalModal :show="removeModalOpen" @confirm="removeUploadedFile" @close="(e) => {
                removeModalOpen = false
            }" />
        </template>
    </DefaultField>
</template>
