<template>
  <button
    id="download_btn"
    class="btn btn-primary btn-large"
    type="button"
    :disabled="downloadStatus"
    @click="download()"
  >
    Download Playlist
  </button>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'DownloadButton',

  computed: mapState({
    downloadStatus: state => state.spotify.downloadStatus
  }),

  methods: {
    download () {
      this.$store.dispatch('toggleDownloadStatus')

      console.log('downloadStatus', this.$store.state.spotify.downloadStatus)
      // [!!!] Fake function to emulate downloading
      // TODO: Replace with actual downloading
      setTimeout(() => {
        this.$store.dispatch('toggleDownloadStatus')
      }, 5000)
    }
  }
}
</script>

<style scoped>

  #download_btn {
    padding: 20px;
  }

</style>
