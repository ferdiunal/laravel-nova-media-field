import App from './app'
import DrawerStore from './store/drawer'
import LibraryStore from './store/library'
import UploadStore from './store/upload'

import DetailField from './fields/DetailField.vue'
import FormField from './fields/FormField.vue'
import IndexField from './fields/IndexField.vue'

import Drawer from './components/drawer.vue'
import UploadField from './components/UploadField.vue'

import ImageCard from './components/Tabs/ImageCard.vue'
import ImageDetail from './components/Tabs/ImageDetail.vue'
import LibraryTab from './components/Tabs/LibraryTab.vue'
import Tabs from './components/Tabs/Tabs.vue'
import UploadTab from './components/Tabs/UploadTab.vue'

import Gallery from './components/Gallery/Gallery.vue'
import GalleryItem from './components/Gallery/GalleryItem.vue'
import BlockPreview from './components/Previews/Block.vue'
import Preview from './components/Previews/Preview.vue'
import PreviewsContainer from './components/Previews/PreviewsContainer.vue'
import RowPreview from './components/Previews/Row.vue'
import Tools from './components/Previews/Tools.vue'

Nova.booting((app, store) => {
  window.NovaMedia = App
  store.registerModule(App.namespaces.library, LibraryStore)
  store.registerModule(App.namespaces.drawer, DrawerStore)
  store.registerModule(App.namespaces.upload, UploadStore)

  // Register the components
  app.component('tools', Tools)
  app.component('row-preview', RowPreview)
  app.component('block-preview', BlockPreview)
  app.component('preview', Preview)
  app.component('previews-container', PreviewsContainer)

  app.component('gallery', Gallery)
  app.component('gallery-item', GalleryItem)

  app.component('upload-field', UploadField)
  app.component('upload-tab', UploadTab)
  app.component('library-tab', LibraryTab)
  app.component('image-card', ImageCard)
  app.component('image-detail', ImageDetail)
  app.component('tabs', Tabs)
  app.component('drawer', Drawer)

  // Register the fields
  app.component('index-nova-media', IndexField)
  app.component('detail-nova-media', DetailField)
  app.component('form-nova-media', FormField)
})
