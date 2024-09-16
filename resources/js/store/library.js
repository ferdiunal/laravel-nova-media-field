import { isCancel, CancelToken } from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      media: {
        data: [],
        meta: {},
        links: {},
      },
      form: {
        name: '',
        alt_text: '',
      },
      detail: undefined,
      loading: false,
      loadingDetail: false,
      fetchMediaCanceller: undefined,
      fetchMediaDetailCanceller: undefined,
      fetchLoadMoreCanceller: undefined,
    }
  },
  mutations: {
    setFormName(state, name) {
      state.form.name = name
    },
    setFormAltText(state, alt_text) {
      state.form.alt_text = alt_text
    },
    setMedia(state, media) {
      state.media = media
    },
    setDetail(state, media) {
      state.detail = media
      if (!media) {
        return
      }
      state.form.name = media.name
      state.form.alt_text = media.custom_properties?.alt_text
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setLoadingDetail(state, loading) {
      state.loadingDetail = loading
    },
    setMediaCanceller(state, canceller) {
      state.fetchMediaCanceller = canceller
    },
    setMediaDetailCanceller(state, canceller) {
      state.fetchMediaDetailCanceller = canceller
    },
    setLoadMoreCanceller(state, canceller) {
      state.fetchLoadMoreCanceller = canceller
    },
    setLoadMoreData(state, { data = [], meta = {}, links = {} }) {
      state.media.data = [...state.media.data, ...data]
      state.media.meta = meta
      state.media.links = links
    },
    resetForm(state) {
      state.form = {
        name: '',
        alt_text: '',
      }
    },
    reset(state) {
      state.media = {
        data: [],
        meta: {},
        links: {},
      }
      state.form = {
        name: '',
        alt_text: '',
      }
      state.detail = undefined
      state.loading = false
      state.loadingDetail = false
      state.fetchMediaCanceller = undefined
      state.fetchMediaDetailCanceller = undefined
      state.fetchLoadMoreCanceller = undefined
    },
  },
  actions: {
    async fetchLoadMore({ commit, state }) {
      state.fetchLoadMoreCanceller?.()

      try {
        const request = await Nova.request().get(state.media.links.next, {
          cancelToken: new CancelToken(canceller => {
            commit('setLoadMoreCanceller', canceller)
          }),
        })

        const data = request.data
        commit('setLoadMoreData', data)
      } catch (error) {
        if (isCancel(error)) {
          return
        }
      } finally {
        commit('setLoadMoreCanceller', undefined)
      }
    },
    async fetchMediaDetail(
      { commit, state },
      { resourceName, resourceId, attribute, id }
    ) {
      state.fetchMediaDetailCanceller?.()
      if (!id) {
        return
      }

      const getExistingMedia = state.media.data.find(media => media.id === id)

      if (getExistingMedia) {
        commit('setDetail', getExistingMedia)
        return
      }

      try {
        commit('setLoadingDetail', true)
        const url = new URL(
          `${window.NovaMedia.url}/${resourceName}/${resourceId}/media/${attribute}/${id}`,
          window.location.origin
        )
        const request = await Nova.request().get(url, {
          cancelToken: new CancelToken(canceller => {
            commit('setMediaDetailCanceller', canceller)
          }),
        })

        commit('setDetail', request.data)
      } catch (error) {
        if (isCancel(error)) {
          return
        }
      } finally {
        commit('setLoadingDetail', false)
        commit('setMediaCanceller', undefined)
      }
    },
    async fetchMediaData({ state, commit }, s = undefined) {
      state.fetchMediaCanceller?.()

      if (s && s.length < 3) {
        return
      }

      if (state.media.data.length > 0) {
        return
      }

      try {
        commit('setLoading', true)
        const url = new URL(window.NovaMedia.url, window.location.origin)
        if (s) {
          url.searchParams.append('s', s)
        }
        const request = await Nova.request().get(url, {
          cancelToken: new CancelToken(canceller => {
            commit('setMediaCanceller', canceller)
          }),
        })

        commit('setMedia', request.data)
      } catch (error) {
        if (isCancel(error)) {
          return
        }
      } finally {
        commit('setLoading', false)
        commit('setMediaCanceller', undefined)
      }
    },
    async updateMedia(
      { commit, state },
      { resourceName, resourceId, attribute }
    ) {
      try {
        const url = new URL(
          `${window.NovaMedia.url}/${resourceName}/${resourceId}/media/${attribute}/${state.detail.id}`,
          window.location.origin
        )
        await Nova.request().patch(url, {
          name: state.form.name,
          custom_properties: {
            alt_text: state.form.alt_text,
          },
        })

        Nova.success(`Media ${state.detail?.name} updated successfully`)

        window.NovaMedia.commit('upload', 'renameFile', {
          file: state.detail,
          name: state.form.name,
        })
        commit('setDetail', undefined)
        commit('resetForm')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
