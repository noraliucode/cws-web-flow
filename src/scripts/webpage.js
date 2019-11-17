import { getAppKeysOrGenerate } from '../Utils/sdkUtil'
import CoolWalletEth from '@coolwallets/eth'
let { appPrivateKey } = getAppKeysOrGenerate()
appPrivateKey = "8c803d11e3f2a8231d87340f20ebeadf7256835d1b94c03e566cea6cc0075838";

export default class webPageEventHandler {
  /**
   *
   * @param {BroadcastChannel} bc
   */
  constructor(bc) {
    this.bc = bc
    if (window.parent === window) {
      // Tab or open directly. Listen CWS-TAB message from BroadCastChannel
      this.setUpListeners()
    }

    this.transport = null
  }

  setTransport(transport) {
    this.transport = transport
  }

  setUpListeners() {
    this.bc.onmessage = async ({ data }) => {
      if (data && data.target === 'CWS-TAB') {
        const { action, params } = data
        const replyAction = `${action}-reply`
        await this.waitForConnection()
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
          default :
            this.sendMessageToIframe(replyAction, false, {error: 'Not supported'})
            break
        }
      }
    }
  }
  async waitForConnection() {
    try {
      while (this.transport === null) {
        setTimeout(console.log('Waiting for connection'), 1000)
      }
      // const appId = localStorage.getItem('appId')
      const appId = "f281736a18e6078624abbaa458faafc958c6dcf8"
      this.app = new CoolWalletEth(this.transport, appPrivateKey, appId)
    } catch (e) {
      console.log('CWS:::CONNECTION ERROR', e)
    }
  }

  async unlock(replyAction, addrIndex) {
    try {
      const res = await this.app.getPublicKey(addrIndex, true)
      this.sendMessageToIframe(replyAction, true, res)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, {error: err.toString()})
    } finally {
      this.cleanUp()
    }
  }

  async signTransaction(replyAction, addrIndex, tx, publicKey) {
    try {
      const res = await this.app.signTransaction(tx, addrIndex, publicKey)
      this.sendMessageToIframe(replyAction, true, res)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, {error: err.toString()})
    } finally {
      this.cleanUp()
    }
  }

  async signPersonalMessage(replyAction, addIndex, message, publicKey) {
    try {
      const res = await this.app.signMessage(message, addIndex, publicKey)
      this.sendMessageToIframe(replyAction, true, res)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, {error: err.toString()})
    } finally {
      this.cleanUp()
    }
  }

  async signTypedData(replyAction, addrIndex, typedData, publicKey) {
    try {
      const res = await this.app.signTypedData(typedData, addrIndex, publicKey)
      this.sendMessageToIframe(replyAction, true, res)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, { error: err.toString() })
    } finally {
      this.cleanUp()
    }
  }

  cleanUp() {
    this.app = null
  }

  /**
   * 
   * @param {String} action 
   * @param {Boolean} success 
   * @param {any} payload 
   */
  sendMessageToIframe(action, success, payload) {
    this.bc.postMessage({action, success, payload})
  }


}
