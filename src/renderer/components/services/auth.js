import { ipcRenderer } from 'electron'

export const init = (store) => {
  ipcRenderer.on('spotify-oauth-reply', (event, {accessToken}) => {
    // TODO: Set access token from store
    store.commit('setAccessToken', accessToken)
    // store.dispatch('getUser').then(user => {
    //   store.commit(store.AUTHENTICATED, user)
    // })
  })
}
