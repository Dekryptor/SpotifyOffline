
const state = {
  playlists: ['playlist1', 'playlist2', 'playlist3'],

  // States: Ideal = false or Downloading = true
  downloadStatus: false
}

const mutations = {
}

const actions = {
  updatePlaylists () {
    // Make API call to Spotify for playlists data
    this.state.playlists = []

    return Promise.resolve(0)
  },
  toggleDownloadStatus () {
    this.state.downloadStatus = !this.state.downloadStatus

    return Promise.resolve(0)
  }
}

export default {
  state,
  mutations,
  actions
}
