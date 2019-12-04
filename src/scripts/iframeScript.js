import { Component } from 'react'

export default class IframeComponent extends Component {
  constructor(props) {
    super(props)
    if (window.parent !== window) {
      this.tabConnected = false
      this.bc = new BroadcastChannel('coolwallets')
      this.setupListeners()
    }
  }

  setupListeners() {
    const tabDomain = 'https://coolwallets-connect.herokuapp.com'
    // const tabDomain = 'http://localhost:3000'

    // Open as IFRAME
    onmessage = async ({ data, source, origin }) => {
      if (data.target === 'CWS-IFRAME' && source === window.parent) {
        // Open CoolWalletConnect in new tab.
        const tab = this.openOnce(tabDomain, 'coolwallets-tab')
        
        tab.onbeforeunload = ()=>{
          this.tabConnected = false
        }

        if (!this.tabConnected) this.pingTab()
        while (!this.tabConnected) {
          console.log(`blocking`)
          await this.sleep(1000)
        }

        data.target = 'CWS-TAB'
        this.bc.postMessage(data, '*')
      }
    }

    this.bc.onmessage = ({ data, source }) => {
      if (data.target === 'connection-status' ) {
        this.tabConnected = data.connected
      } else {
        this.sendMessageToExtension(data)
      }
    }
  }

  pingTab(){
    this.bc.postMessage({ target: 'CWS-TAB', action: 'coolwallet-connection-check' })
  }

  sendMessageToExtension(msg) {
    window.parent.postMessage(msg, '*')
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

  render() {
    return null
  }
}
