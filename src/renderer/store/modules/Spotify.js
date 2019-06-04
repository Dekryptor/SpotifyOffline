
const state = {
    playlists: []
};

const mutations = {
};


const actions = {
    updatePlaylists() {
        // Make API call to Spotify for playlists data
        this.state.playlists = [];
    }
};

export default {
    state,
    mutations,
    actions
};