<template>
  <p v-if="downloadStatus">
    Downloading...
  </p>
  <p v-else>
    READY!
  </p>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'DownloadStatus',

  computed: mapState({
    downloadStatus: state => state.spotify.downloadStatus
  })
}
</script>

<style scoped>

</style>
