<template>
  <label>
    <select v-model="selectedPlaylist">
      <option
        disabled
        value=""
      >Please select one</option>
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
import { mapState } from 'vuex'

export default {
  name: 'PlaylistSelector',
  data () {
    return {
      selectedPlaylist: 'playlist1'
    }
  },

  computed: mapState(['playlists'])
}
</script>

<style scoped>

</style>
