
// REFERENCE
// https://alligator.io/vuejs/vue-electron/

const state = {

  // States: Ideal = false or Downloading = true
  downloadStatus: false,
  logged_in: false

  // Playlist to be downloaded
  // selectedPlaylist: null
}

const mutations = {
  setAccessToken (state, accessToken) {
    console.log(accessToken)
  },
  toggleDownloadStatus (state) {
    state.downloadStatus = !state.downloadStatus
  }
}

const actions = {
  setAccessToken ({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
  toggleDownloadStatus ({ commit }) {
    commit('toggleDownloadStatus')
  }
}

export default {
  state,
  mutations,
  actions
}
