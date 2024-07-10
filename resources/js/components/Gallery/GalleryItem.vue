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
        :data-pswp-height="file.height" target="_blank" rel="noreferrer" class="ln-inline-block ln-rounded-full" :class="{
            'ln-h-6 ln-w-6': resourceView === 'index',
            'ln-h-8 ln-w-8': resourceView === 'detail'
        }" v-show="index <= 2">
        <img v-if="isImage" :src="file.src" :srcset="file.srcset" :alt="file.alt" loading="lazy" decoding="async"
            class="ln-inline-block ln-rounded-full ln-aspect-auto ln-bg-gray-200 ln-object-scale-down" :class="{
                'ln-h-6 ln-w-6': resourceView === 'index',
                'ln-h-8 ln-w-8': resourceView === 'detail'
            }" />
        <div v-else class="ln-inline-block ln-rounded-md ln-bg-gray-200" :class="{
            'ln-h-6 ln-w-6': resourceView === 'index',
            'ln-h-8 ln-w-8': resourceView === 'detail'
        }">
            <Icon type="document-text" class="ln-h-4 ln-w-4" />
        </div>
    </a>
</template>
