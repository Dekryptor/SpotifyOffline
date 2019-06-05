
const state = {

  // Mock playlists
  // playlists: ['playlist1', 'playlist2', 'playlist3'],

  // States: Ideal = false or Downloading = true
  downloadStatus: false
}

const mutations = {
  toggleDownloadStatus () {
    this.state.downloadStatus = !this.state.downloadStatus
  }
}

const actions = {
  toggleDownloadStatus (store) {
    store.commit('toggleDownloadStatus')
  }
}

export default {
  state,
  mutations,
  actions
}
