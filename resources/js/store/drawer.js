export default {
  namespaced: true,
  state() {
    return {
      open: false,
      listType: localStorage.getItem('media-drawer-list-type') ?? 'grid',
      tab: 'upload',
      attribute: null,
      resourceId: null,
      resourceName: null,
    }
  },
  mutations: {
    open(state) {
      state.open = true
    },
    setResource(state, { resourceName, resourceId, attribute }) {
      state.resourceName = resourceName
      state.resourceId = resourceId
      state.attribute = attribute
    },
    close(state) {
      setTimeout(() => {
        state.tab = 'upload'
        window.NovaMedia.commit('library', 'reset')
      }, 1000)
      state.open = false
    },
    setListType(state, listType) {
      state.listType = listType
      localStorage.setItem('media-drawer-list-type', listType)
    },
    setTab(state, tab) {
      state.tab = tab
    },
    setUploadTab(state) {
      state.tab = 'upload'
    },
    setLibraryTab(state) {
      state.tab = 'library'
    },
  },
  actions: {
    async detail({ commit, state }, id) {
      await window.NovaMedia.dispatch('library', 'fetchMediaDetail', {
        resourceName: state.resourceName,
        resourceId: state.resourceId,
        attribute: state.attribute,
        id,
      })
      commit('setLibraryTab')
      commit('open')
    },
  },
}
