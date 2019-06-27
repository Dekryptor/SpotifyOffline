'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { existsSync, mkdir } from 'fs'
import electronOauth2 from 'electron-oauth2'

import oauthConfig from '../renderer/components/services/secrets'
import '../renderer/store'

const PATH_TO_PLAYLISTS = require('path').join(app.getPath('home'), '/Music/SpotifyPlaylists')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`

/**
 * Initial window options
 */

const windowParams = {
  height: 563,
  width: 1000,
  useContentSize: true,
  resizable: false
}

function createWindow () {
  mainWindow = new BrowserWindow(windowParams)

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// REFERENCE
// https://medium.com/linagora-engineering/using-oauth-in-an-electron-application-abb0376c2ae0
const spotifyOAuth = electronOauth2(oauthConfig, windowParams)

ipcMain.on('spotify-oauth', (event, arg) => {
  spotifyOAuth.getAccessToken({})
    .then(token => {
      event.sender.send('spotify-oauth-reply', token)
    }, err => {
      console.log('Error while getting token', err)
    })
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Checking if playlists dir already exists
  if (!existsSync(PATH_TO_PLAYLISTS)) mkdir(PATH_TO_PLAYLISTS)

  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
