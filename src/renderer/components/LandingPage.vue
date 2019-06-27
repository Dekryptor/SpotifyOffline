<template>
  <div id="wrapper">
    <img
      id="logo"
      src="~@/assets/logo.png"
      alt="electron-vue"
    >
    <main>
      <div class="container">
        <span class="title">
          Spotify Offline
        </span>

        <div
          v-if="logged_in"
          id="pipeline"
        >
          <playlist-selector />
          <download-button />
          <download-status />
        </div>
        <div v-else>
          <button
            class="login_btn"
            @click="login"
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import DownloadButton from './LandingPage/DownloadButton'
import DownloadStatus from './LandingPage/DownloadStatus'
import PlaylistSelector from './LandingPage/PlaylistSelector'
import { ipcRenderer } from 'electron'

export default {
  name: 'LandingPage',
  components: {
    DownloadStatus,
    DownloadButton,
    PlaylistSelector
  },
  data () {
    return {
      logged_in: false
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },

    login () {
      ipcRenderer.send('spotify-oauth', 'getToken')
      this.logged_in = true
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #pipeline {
    display: flex;
    justify-content: space-evenly;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    width: 100vw;
    padding: 60px 80px;
    margin: auto;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .login_btn {
    padding: 10px;
    color: white;
    background-color: green;
    border-radius: 20px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

</style>
