export default class IframeEventHandler {
  /**
   *
   * @param {BroadcastChannel} bc
   */
  constructor(bc) {
    this.blockOnFirstCall = true
    const tabDomain = 'https://coolwallets-connect.herokuapp.com/'
    if (window.parent !== window) {
      console.log(`setting up listeners as iframe...`)
      // IFRAME
      onmessage = async ({ data, source, origin }) => {
        if (data.target === 'CWS-IFRAME' && source === window.parent) {
          
          // Open CoolWalletConnect in new tab.
          this.openOnce(tabDomain, 'coolwallets-tab')

          while (this.blockOnFirstCall === true) {
            console.log(`blocking`)
            await this.sleep(1000)
          }

          data.target = 'CWS-TAB'
          bc.postMessage(data, '*')
        }
      }

      bc.onmessage = ({ data, source }) => {
        if (data.target === 'connection-success') {
          console.log(`unblocking call to tab`)
          this.blockOnFirstCall = false
        } else {
          this.sendMessageToExtension(data)
        }
      }
    }
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
}