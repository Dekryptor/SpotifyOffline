<template>
  <button
    class="btn btn-primary btn-large"
    type="button"
    :class="downloadStatus"
    @click="download()"
  >
    Download Playlist
  </button>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'DownloadButton',

  computed: mapState(['downloadStatus']),

  methods: {
    download () {
      this.$store.dispatch('toggleDownloadStatus')

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



</style>
