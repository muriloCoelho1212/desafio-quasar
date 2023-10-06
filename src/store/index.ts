import { api } from 'src/boot/axios'
import { IListNews, IVersions } from 'src/interfaces'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    versions: [] as IVersions[],
    listNews: [] as IListNews[]
  },
  mutations: {
    GET_VERSIONS (state, data) {
      state.versions = data
    },
    GET_VERSION (state, data) {
      state.versions = data
    },
    ADD_VERSION (state, payload) {
      state.versions.push(payload)
    },
    EDIT_VERSION (state, newVersion) {
      const index = state.versions.findIndex(v => v.id === newVersion.id)
      state.versions[index] = newVersion
    },
    DELETE_VERSION (state, id) {
      state.versions = state.versions.filter(v => v.id !== id)
    }
  },
  actions: {
    async getVersions ({ commit }) {
      const { data } = await api.get('versions/1')
      console.log(data)
      // commit('GET_VERSION', data)
    },
    async getVersion ({ commit }, id) {
      const { data } = await api.get(`versions/${id}`)
      commit('GET_VERSION', data)
    },
    async postVersion ({ commit }, payload) {
      await api.post('versions', payload)
      commit('ADD_VERSION', payload)
    },
    async putVersion ({ commit }, newVersion) {
      const id = newVersion.id
      await api.put(`versions/${id}`, newVersion)
      commit('EDIT_VERSION', newVersion)
    },
    async delVersion ({ commit }, id) {
      await api.delete(`versions/${id}`)
      commit('DELETE_VERSION', id)
    }
  }
})

export default store
