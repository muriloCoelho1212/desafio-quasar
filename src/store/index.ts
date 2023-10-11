import { api } from 'src/boot/axios'
import { IVersions, IListNews } from 'src/interfaces'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    versions: [] as IVersions[],
    modeView: ''
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
      console.log(index)
      state.versions[index] = newVersion
    },
    DELETE_VERSION (state, id) {
      state.versions = state.versions.filter(v => v.id !== id)
    },
    DEL_ROW (state, newVersion) {
      const index = state.versions.findIndex(v => v.id === newVersion.id)
      state.versions[index] = newVersion
    },
    EDIT_STATE (state) {
      state.modeView = 'edit'
    },
    VIEW_STATE (state) {
      state.modeView = 'view'
    },
    POST_STATE (state) {
      state.modeView = 'post'
    }
  },
  actions: {
    async getVersions ({ commit }) {
      const { data } = await api.get('versions')
      commit('GET_VERSION', data)
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
    },
    async delRow ({ commit }, { idRow, version }) {
      const { data } = await api.get<IVersions>(`versions/${version.id}`)
      let listNews = data.listNews
      listNews = listNews.filter((lNew: IListNews) => lNew.id !== idRow)
      data.listNews = listNews
      console.log(data)
      await api.put(`versions/${version.id}`, data)
      commit('DEL_ROW', data)
    }
  }
})

export default store
