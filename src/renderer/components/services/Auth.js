
import { login } from './spotify'
import secrets from './secrets'

export default {
  getAuthCode () {
    return secrets.access_token
  },
  setAuthCode (authCode) {
    secrets.access_token = authCode
  },
  stripAuthCode (url) {
    return url.substring(url.indexOf('=') + 1, url.length - 2)
  },
  authorize (authCode) {
    authCode = authCode || this.getAuthCode()
    console.log('No auth code ', authCode)

    if (!authCode) {
      window.location.replace(login())
      const code = this.stripAuthCode(window.location.href)
      this.setAuthCode(code)
    }
  }
}
