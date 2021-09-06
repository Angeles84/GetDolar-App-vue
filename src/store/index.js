import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {
      titulo: '',
      estado: false
    }
  },
  mutations: {
    SHOW_LOADING(state, payload) {
      state.loading.titulo = payload.titulo
      state.loading.estado = true
    },
    HIDE_LOADING(state) {
      state.loading.estado = false
    }
  },
  actions: {
  },
  modules: {
  }
})
