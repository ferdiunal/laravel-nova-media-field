import Composer from '../../composer.json'

class NovaMedia {
  get name() {
    return Composer.name.replace(/\//g, '.')
  }

  get url() {
    return `/nova-vendor/${Composer.name}`
  }

  get namespaces() {
    return {
      drawer: `${this.name}.drawer`,
      library: `${this.name}.library`,
      upload: `${this.name}.upload`,
    }
  }

  store() {
    return window.Nova.store
  }

  state(module) {
    return this.store().state[this.namespaces[module]]
  }

  commit(module, mutation, payload) {
    return this.store().commit(
      `${this.namespaces[module]}/${mutation}`,
      payload
    )
  }

  dispatch(module, action, payload) {
    return this.store().dispatch(
      `${this.namespaces[module]}/${action}`,
      payload
    )
  }
}

export default new NovaMedia()
