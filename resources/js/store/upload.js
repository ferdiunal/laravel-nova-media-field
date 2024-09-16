import Vapor from 'laravel-vapor'
import app from '../app'

async function createImageFile(file) {
  const url = window.URL.createObjectURL(file)
  const image = new Image()
  image.src = url
  await image.decode()
  const { naturalWidth, naturalHeight } = image

  return {
    name: file.name,
    extension: file.name.split('.').pop(),
    type: file.type,
    originalFile: file,
    vapor: false,
    processing: false,
    progress: 0,
    deletable: true,
    copy: false,
    hide: false,
    mediaId: undefined,
    order: -1,
    previewUrl: url,
    isImage: true,
    width: naturalWidth,
    height: naturalHeight,
  }
}

function createFile(file) {
  return {
    name: file.name,
    extension: file.name.split('.').pop(),
    type: file.type,
    originalFile: file,
    vapor: false,
    processing: false,
    progress: 0,
    copy: false,
    hide: false,
    deletable: true,
    mediaId: file.id,
    order: file.order_column ?? -1,
    previewUrl: file.src,
    isImage: false,
  }
}

function createVaporFile(file, response) {
  return {
    key: response.key,
    uuid: response.uuid,
    filename: file.name.replace('.' + file.extension, ''),
    extension: file.extension,
    width: file.width,
    height: file.height,
  }
}

async function createImage(file) {
  let response = await fetch(file.src)
  let data = await response.blob()
  const { name, type, mime_type } = file
  const _file = await createImageFile(
    new File([data], name, { type: type ?? mime_type })
  )

  _file.alt = file.alt
  _file.mediaId = file.id
  _file.order = file.order_column ?? -1

  return _file
}

export default {
  namespaced: true,
  state() {
    return {
      files: [],
      previewImages: [],
      vaporFiles: [],
      selectedFiles: [],
      isVaporField: false,
      removableFile: undefined,
      removeModalOpen: false,
    }
  },
  mutations: {
    setFiles(state, files) {
      state.files = files
    },
    setVaporFiles(state, files) {
      state.vaporFiles = files
    },
    setSelectedFiles(state, files) {
      state.selectedFiles = files
    },
    setVaporField(state, isVaporField) {
      state.isVaporField = isVaporField
    },
    setRemoveModalStatus(state, status) {
      state.removeModalOpen = status
      state.removableFile = undefined
    },
    setPreviewImages(state, previewImages) {
      state.previewImages = previewImages
    },
    hidePreviewImages(state) {
      const previewImages = state.previewImages.slice().map(file => {
        file.hide = true
        return file
      })

      state.previewImages = previewImages
    },
    removeFileMediaId(state, mediaId) {
      const index = state.previewImages.findIndex(
        file => file.mediaId === mediaId
      )

      if (index > -1) {
        state.previewImages.splice(index, 1)
      }
    },
    setRemovableFile(state, file) {
      state.removableFile = file
      state.removeModalOpen = true
    },
    removeFile(state) {
      if (!state.removableFile) return
      const index = state.files.indexOf(state.removableFile)

      if (index > -1) {
        state.files.splice(index, 1)
      }

      const previewImages = state.previewImages.slice().map(file => {
        file.hide = false
        return file
      })

      state.previewImages = previewImages

      state.removableFile = undefined
    },
    renameFile(state, { file, name }) {
      const files = [...state.files]
      const index = files.findIndex(f => f.mediaId === file.id)
      if (index === -1) return
      files[index].name = name
      files[index].file_name = `${name}.${_file.extension}`
      state.files = files
    },
    clearFiles(state) {
      state.files = []
      state.previewImages = []
      state.vaporFiles = []
      state.removableFile = undefined
      state.removeModalOpen = false
      state.isVaporField = false
    },
  },
  actions: {
    async fetchPreviewImages({ commit }, files) {
      const previewImages = []
      for (const file of files) {
        if (file.type.startsWith('image')) {
          previewImages.push(await createImage(file))
        } else {
          previewImages.push(createFile(file))
        }
      }

      commit('setPreviewImages', previewImages)
    },
    async remoteRemoveFile(
      { commit },
      { resourceName, resourceId, fieldAttribute, mediaId }
    ) {
      try {
        const url = [
          app.url,
          resourceName,
          resourceId,
          'field',
          fieldAttribute,
          mediaId,
        ]
          .filter(Boolean)
          .join('/')
        await window.Nova.request().delete(url)

        commit('removeFileMediaId', mediaId)
      } catch (error) {
        await Promise.reject(error)
      }
    },
    async removeFile({ dispatch, commit, state }) {
      if (state.removableFile === undefined) return
      if (state.removableFile.mediaId && state.removableFile.resourceId) {
        await dispatch('remoteRemoveFile', {
          resourceName: state.removableFile.resourceName,
          resourceId: state.removableFile.resourceId,
          fieldAttribute: state.removableFile.fieldAttribute,
          mediaId: state.removableFile.mediaId,
        })
      } else {
        commit('removeFile')
      }

      commit('setRemoveModalStatus', false)
    },
    uploadVaporFiles({ state, dispatch }) {
      for (const fileIndex in state.files) {
        const file = state.files[fileIndex]
        if (file.vapor) {
          continue
        }

        dispatch('uploadVaporFile', fileIndex)
      }
    },
    uploadVaporFile({ state, commit }, fileIndex) {
      const files = [...state.files]
      let file = files[fileIndex]
      file.processing = true
      file.vapor = true

      Vapor.store(file.originalFile, {
        progress: progress => {
          file.progress = Math.round(progress * 100)
        },
      })
        .then(response => {
          console.log(response)
          state.vaporFiles[fileIndex] = createVaporFile(file, response)
          file.processing = false
          file.progress = 100

          files[fileIndex] = file

          commit('setFiles', files)
        })
        .catch(error => {
          if (error.response.status === 403) {
            const msg= 'Sorry! You are not authorized to perform this action.'
            Nova.error(
              Nova.config('translations')[msg] ?? msg
            )
          }
        })
    },
    async handleChange({ commit, state, dispatch }, newFiles) {
      const files = [...state.files]
      for (const file of newFiles) {
        if (file.type.startsWith('image')) {
          files.push(await createImageFile(file))
          continue
        }
        files.push(createFile(file))
      }

      commit('setFiles', files)

      if (state.isVaporField) {
        dispatch('uploadVaporFiles')
      }
    },
    async handleFileChangeLibrary({ commit, dispatch, state }) {
      const selectedFiles = state.selectedFiles
      const files = []
      for (const file of selectedFiles) {
        file.name = file.file_name
        const _file = await createImage(file)
        _file.copy = true
        _file.order = -1
        files.push(_file)
      }

      commit('setFiles', files)
      commit('setSelectedFiles', [])

      if (state.isVaporField) {
        dispatch('uploadVaporFiles')
      }
    },
  },
}
