<script>
import PhotoSwipeLightbox from '../../lib/PhotoSwipe/js/lightbox/lightbox';
import '../../lib/PhotoSwipe/photoswipe.css';
import GalleryItem from './GalleryItem.vue';
import PhotoSwipe from '../../lib/PhotoSwipe/js/photoswipe';

export default {
    name: 'Gallery',
    props: {
        id: {
            type: String,
            default: 'gallery',
        },
        files: {
            type: Array,
            default: () => [],
        },
        resourceView: String,
    },
    data() {
        return {
            lightbox: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.lightbox) {
                this.lightbox = new PhotoSwipeLightbox({
                    gallery: '#' + this.$props.id,
                    showHideAnimationType: 'fade',
                    children: 'a',
                    pswpModule: PhotoSwipe,
                });
                this.lightbox.on('contentLoad', (e) => {
                    const { content, isLazy } = e;

                    console.log(content.data.type.startsWith('video'));

                    if (content.data.type === 'application/pdf') {
                        e.preventDefault();

                        content.element = document.createElement('div');
                        content.element.className = 'pswp__pdf-content';

                        const iframe = document.createElement('iframe');
                        iframe.setAttribute('allowfullscreen', '');
                        iframe.src = content.data.src;
                        content.element.appendChild(iframe);

                        if (content.element.complete) {
                            content.onLoaded();
                        } else {
                            content.element.onload = () => {
                                content.onLoaded();
                            };

                            content.element.onerror = () => {
                                content.onError();
                            };
                        }
                    } else if (content.data.type.startsWith('image')) {
                        const imgContainer = document.createElement('div');
                        imgContainer.className = 'pswp__img-content';
                        const img = new Image();
                        img.src = content.data.src;
                        img.alt = content.data.alt;
                        imgContainer.appendChild(img);
                        img.onload = () => {
                            content.element.appendChild(imgContainer);
                            content.onLoaded();
                        };
                    } else if (content.data.type.startsWith('video')) {
                        const videoContainer = document.createElement('div');
                        videoContainer.className = 'pswp__video-content';
                        const video = document.createElement('video');
                        video.src = content.data.src;
                        video.controls = true;
                        video.autoplay = false;
                        video.muted = true;
                        video.loop = true;
                        video.playsinline = true;
                        videoContainer.appendChild(video);
                        video.addEventListener('loadeddata', () => {
                            content.element.appendChild(videoContainer);
                            content.onLoaded();
                        });
                    } else if (content.data.type.startsWith('audio')) {
                        const audioContainer = document.createElement('div');
                        audioContainer.className = 'pswp__audio-content';
                        const audio = document.createElement('audio');
                        audio.src = content.data.src;
                        audio.controls = true;
                        audio.autoplay = false;
                        audio.muted = true;
                        audio.loop = true;
                        audioContainer.appendChild(audio);
                        audio.addEventListener('loadeddata', () => {
                            content.element.appendChild(audioContainer);
                            content.onLoaded();
                        });
                    } else {
                        e.preventDefault();
                    }
                })
                this.lightbox.on('contentAppend', (e) => {
                    const { content } = e;
                    if (content.element && !content.element.parentNode) {
                        e.preventDefault();
                        content.slide.container.appendChild(content.element);
                    }
                });

                this.lightbox.on('contentRemove', (e) => {
                    const { content } = e;
                    if (content.element && content.element.parentNode) {
                        e.preventDefault();
                        content.element.remove();
                    }
                });

                this.lightbox.init();
            }
        })
    },
    unmounted() {
        if (this.lightbox) {
            this.lightbox.destroy();
            this.lightbox = null;
        }
    },
    methods: {
        onOpen() {
            document.querySelectorAll(`#${this.id} a`)?.[0].click();
        }
    }
}
</script>
<template>
    <div :id="id" class="flex items-center group" @click.prevent.stop="onOpen">
        <div class="flex overflow-hidden" :class="{
            '-space-x-3': resourceView === 'index',
            '-space-x-5': resourceView === 'detail'
        }">
            <gallery-item :resourceView="resourceView" v-for="(file, index) in files" :key="index" :index="index"
                :file="file" />
        </div>
        <div @click="onOpen" v-if="files.length > 2"
            class="select-none text-xs rounded-full ring-2 ring-white inline-flex items-center justify-center bg-gray-50 text-gray-600 cursor-pointerxw"
            :class="{
                'h-6 w-6 -ml-3': resourceView === 'index',
                'h-8 w-8 -ml-5': resourceView === 'detail'
            }">
            +{{ files.length - 2 }}
        </div>
    </div>
</template>
