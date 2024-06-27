<script setup>
import { defineProps, computed, ref, onMounted } from 'vue';
const props = defineProps({
    file: Object,
    resourceView: String,
    index: Number,
});

const isImage = computed(() => props.file.type.startsWith('image'));

</script>
<template>
    <a :href="file.src" :data-pswp-srcset="file.srcset" :data-pswp-width="file.width" :data-pswp-type="file.type"
        :data-pswp-height="file.height" target="_blank" rel="noreferrer" class="inline-block rounded-full" :class="{
            'h-6 w-6': resourceView === 'index',
            'h-8 w-8': resourceView === 'detail'
        }" v-show="index <= 2">
        <img v-if="isImage" :src="file.src" :srcset="file.srcset" :alt="file.alt" loading="lazy" decoding="async"
            class="inline-block rounded-full aspect-auto bg-gray-200 object-scale-down" :class="{
                'h-6 w-6': resourceView === 'index',
                'h-8 w-8': resourceView === 'detail'
            }" />
        <div v-else class="inline-block rounded-md bg-gray-200" :class="{
            'h-6 w-6': resourceView === 'index',
            'h-8 w-8': resourceView === 'detail'
        }">
            <Icon type="document-text" class="h-4 w-4" />
        </div>
    </a>
</template>
