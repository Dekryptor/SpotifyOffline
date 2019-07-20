
// REFERENCE
// https://alligator.io/vuejs/vue-electron/

const state = {

  // States: Ideal = false or Downloading = true
  downloadStatus: false

  // Playlist to be downloaded
  // selectedPlaylist: null
}

const mutations = {
  setAccessToken (state, accessToken) {
    console.log('accessToken', accessToken)
  },
  // setPlaylist (state, selectedPlaylist) {
  //   state.selectedPlaylist = selectedPlaylist
  // },
  toggleDownloadStatus (state) {
    state.downloadStatus = !state.downloadStatus
  }
}

const actions = {
  setAccessToken ({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
  // setPlaylist ({ commit }, selectedPlaylist) {
  //   commit('setPlaylist', selectedPlaylist)
  // },
  toggleDownloadStatus ({ commit }) {
    commit('toggleDownloadStatus')
  }
}

export default {
  state,
  mutations,
  actions
}
