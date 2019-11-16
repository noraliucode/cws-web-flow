import WebBleTransport from '@coolwallets/transport-web-ble'
import CoolWallet from '@coolwallets/wallet'
import CoolWalletEth from '@coolwallets/eth'

import { getAppKeys } from './utils'
const { appPublicKey, appPrivateKey } = getAppKeys()

export default class CoolWalletBridge {
  constructor() {
    this.bc = new BroadcastChannel('coolwallets')
    this.blockOnFirstCall = true
    this.addEventListeners()
  }

  addEventListeners() {
    const tabDomain = 'https://antoncoding.github.io'
    if (window.parent !== window) {
      onmessage = async ({ data, source, origin }) => {
        if (data.target === 'CWS-IFRAME') {
          if (source === window.parent) {
            // data from extension
            this.openOnce(tabDomain, 'coolwallets-tab')

            while (this.blockOnFirstCall === true) {
              await this.sleep(1000)
            }

            data.target = 'CWS-TAB'
            this.bc.postMessage(data, '*')
          }
        }
      }

      this.bc.onmessage = ({ data, source }) => {
        if (data.target === 'connection-success') {
          this.blockOnFirstCall = false
        } else {
          this.sendMessageToExtension(data)
        }
      }
    } else {
      this.bc.onmessage = ({ data }) => {
        if (data && data.target === 'CWS-TAB') {
          const { action, params } = data
          const replyAction = `${action}-reply`
          switch (action) {
            case 'coolwallet-unlock':
              this.unlock(replyAction, params.addrIndex)
              break
            case 'coolwallet-sign-transaction':
              this.signTransaction(replyAction, params.addrIndex, params.tx, params.publicKey)
              break
            case 'coolwallet-sign-personal-message':
              this.signPersonalMessage(replyAction, params.addrIndex, params.message, params.publicKey)
              break
            case 'coolwallet-sign-typed-data':
              this.signTypedData(replyAction, params.addrIndex, params.typedData, params.publicKey)
              break
          }
        }
      }
    }
  }

  sendMessageToExtension(msg) {
    window.parent.postMessage(msg, '*')
  }

  sendMessageToIframe(msg) {
    this.bc.postMessage(msg)
  }

  async register(password) {
    const appId = localStorage.getItem('appId')
    const wallet = new CoolWallet(this.transport, appPrivateKey, appId)
    wallet.register(appPublicKey, password, 'CoolWalletBridge').then(appId => {
      localStorage.setItem('appId', appId)
    })
  }

  async userConenct() {
    WebBleTransport.listen(async (err, device) => {
      if (err) {
        throw err
      }
      this.transport = await WebBleTransport.connect(device)
      this.bc.postMessage({ target: 'connection-success' })
    })
  }

  async waitForConnection() {
    try {
      while (this.transport === null) {
        setTimeout(console.log('Waiting for connection'), 1000)
      }
      const appId = localStorage.getItem('appId')
      this.app = new CoolWalletEth(this.transport, appPrivateKey, appId)
    } catch (e) {
      console.log('CWS:::CONNECTION ERROR', e)
    }
  }

  cleanUp() {
    this.app = null
  }

  async unlock(replyAction, addrIndex) {
    try {
      await this.waitForConnection()
      const res = await this.app.getPublicKey(addrIndex, true)
      this.sendMessageToIframe({
        action: replyAction,
        success: true,
        payload: res,
      })
    } catch (err) {
      this.sendMessageToIframe({
        action: replyAction,
        success: false,
        payload: { error: err.toString() },
      })
    } finally {
      this.cleanUp()
    }
  }

  async signTransaction(replyAction, addrIndex, tx, publicKey) {
    try {
      await this.waitForConnection()
      const res = await this.app.signTransaction(tx, addrIndex, publicKey)
      this.sendMessageToIframe({
        action: replyAction,
        success: true,
        payload: res,
      })
    } catch (err) {
      this.sendMessageToIframe({
        action: replyAction,
        success: false,
        payload: { error: err.toString() },
      })
    } finally {
      this.cleanUp()
    }
  }

  async signPersonalMessage(replyAction, addIndex, message, publicKey) {
    try {
      await this.waitForConnection()
      const res = await this.app.signMessage(message, addIndex, publicKey)

      this.sendMessageToIframe({
        action: replyAction,
        success: true,
        payload: res,
      })
    } catch (err) {
      this.sendMessageToIframe({
        action: replyAction,
        success: false,
        payload: { error: err.toString() },
      })
    } finally {
      this.cleanUp()
    }
  }

  async signTypedData(replyAction, addrIndex, typedData, publicKey) {
    try {
      await this.waitForConnection()
      const res = await this.app.signTypedData(typedData, addrIndex, publicKey)
      this.sendMessageToIframe({
        action: replyAction,
        success: true,
        payload: res,
      })
    } catch (err) {
      this.sendMessageToIframe({
        action: replyAction,
        success: false,
        payload: { error: err.toString() },
      })
    } finally {
      this.cleanUp()
    }
  }

  openOnce(url, target) {
    var winref = window.open('', target, '', true)

    // if the "target" window was just opened, change its url
    if (winref.location.href === 'about:blank') {
      winref.location.href = url
    }
    return winref
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
