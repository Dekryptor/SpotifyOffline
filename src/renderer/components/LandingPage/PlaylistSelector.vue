<template>
  <select v-model="playlist">
    <template v-for="playlist in playlists">
      <option :key="playlist">
        {{ playlist }}
      </option>
    </template>
  </select>
</template>

<script>
export default {
  name: 'PlaylistSelector',
  data () {
    return {
      // 'playlists' will later be a computed property
      // This should use the Vuex store to make an API call
      // to Spotify and update the vuex store with the playlist data
      playlists: ['playlist1', 'playlist2', 'playlist3']
    }
  }
}
</script>

<style scoped>

</style>
