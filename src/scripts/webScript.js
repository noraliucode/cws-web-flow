import { Component } from 'react'
import { getAppKeysOrGenerate, getAppIdOrNull } from '../Utils/sdkUtil'
import CoolWalletEth from '@coolwallets/eth'
import { openModal, closeModal } from '../actions'
import { connect } from 'react-redux'
import { signingContent, processingContent, confirmOnCardContent } from '../ModalContents'

let { appPrivateKey } = getAppKeysOrGenerate()

class webPageEventHandler extends Component {
  constructor(props) {
    super(props)
    if (window.parent === window) {
      this.bc = new BroadcastChannel('coolwallets')
      // Tab or open directly. Listen CWS-TAB message from BroadCastChannel
      this.setUpListeners()
    }
  }

  setUpListeners() {
    window.onbeforeunload = () => {
      this.bc.postMessage({ target: 'connection-status', connected: false })
    }
    
    this.bc.onmessage = async ({ data }) => {
      if (data && data.target === 'CWS-TAB') {
        const { action, params } = data
        const replyAction = `${action}-reply`
        await this.waitForConnection()
        switch (action) {
          case 'coolwallet-connection-check':
            this.checkConnected()
            break
          case 'coolwallet-unlock':
            this.props.openModal(processingContent)
            this.unlock(replyAction, params.addrIndex)
            break
          case 'coolwallet-sign-transaction':
            this.props.openModal(processingContent)
            this.signTransaction(replyAction, params.addrIndex, params.tx, params.publicKey)
            break
          case 'coolwallet-sign-personal-message':
            this.props.openModal(processingContent)
            this.signPersonalMessage(replyAction, params.addrIndex, params.message, params.publicKey)
            break
          case 'coolwallet-sign-typed-data':
            this.props.openModal(processingContent)
            this.signTypedData(replyAction, params.addrIndex, params.typedData, params.publicKey)
            break
          default:
            this.sendMessageToIframe(replyAction, false, { error: 'Not supported' })
            break
        }
      }
    }
  }
  async waitForConnection() {
    try {
      while (this.props.transport === null) {
        await this.sleep(1000)
      }
      const appId = getAppIdOrNull()
      this.app = new CoolWalletEth(this.props.transport, appPrivateKey, appId)
    } catch (e) {
      console.log('CWS:::CONNECTION ERROR', e)
    }
  }

  async checkConnected() {
    if (this.props.transport !== null) {
      this.bc.postMessage({ target: 'connection-status', connected: true })
    }
  }

  async unlock(replyAction, addrIndex) {
    try {
      const res = await this.app.getPublicKey(addrIndex, true)
      this.sendMessageToIframe(replyAction, true, res)
      this.props.closeModal(processingContent)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, { error: err.toString() })
    } finally {
      this.cleanUp()
    }
  }

  async signTransaction(replyAction, addrIndex, tx, publicKey) {
    try {
      const res = await this.app.signTransaction(
        tx,
        addrIndex,
        publicKey,
        ()=>this.props.openModal(confirmOnCardContent),
        ()=>this.props.openModal(signingContent)
      )
      this.sendMessageToIframe(replyAction, true, res)
      this.props.closeModal(signingContent)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, { error: err.toString() })
    } finally {
      this.cleanUp()
    }
  }

  async signPersonalMessage(replyAction, addIndex, message, publicKey) {
    try {
      const res = await this.app.signMessage(
        message,
        addIndex,
        publicKey,
        ()=>this.props.openModal(confirmOnCardContent),
        ()=>this.props.openModal(signingContent)
      )
      this.sendMessageToIframe(replyAction, true, res)
      this.props.closeModal(signingContent)
    } catch (err) {
      this.sendMessageToIframe(replyAction, false, { error: err.toString() })
    } finally {
      this.cleanUp()
    }
  }

  async signTypedData(replyAction, addrIndex, typedData, publicKey) {
    try {
      const res = await this.app.signTypedData(
        typedData,
        addrIndex,
        publicKey,
        ()=>this.props.openModal(confirmOnCardContent),
        ()=>this.props.openModal(signingContent)
      )
      this.sendMessageToIframe(replyAction, true, res)
      this.props.closeModal(signingContent)
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
    this.bc.postMessage({ action, success, payload })
  }

  render() {
    return null
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

const mapStateToProps = state => ({
  showModal: state.common.showModal,
})

const mapDispatchToProps = {
  openModal,
  closeModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(webPageEventHandler)
