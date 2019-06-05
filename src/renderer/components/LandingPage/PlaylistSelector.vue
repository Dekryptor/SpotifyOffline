<template>
  <label>
    <select v-model="selectedPlaylist">
      <option
        disabled
        value="">
        Please select one
      </option>
      <option
          v-for="(playlist, key) in playlists"
          :value="key"
          :key="key">
        {{ playlist }}
      </option>
    </select>
  </label>
</template>

<script>

export default {
  name: 'PlaylistSelector',
  data () {
    return {
      selectedPlaylist: null,
      playlists: ['playlist1', 'playlist2', 'playlist3']
    }
  }

}
</script>

<style scoped>

</style>
