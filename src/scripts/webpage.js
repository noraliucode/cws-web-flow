export default class webPageEventHandler {
  /**
   * 
   * @param {BroadcastChannel} bc 
   */
  constructor(bc){
    if (window.parent === window) {
      // Tab or open directly!
      console.log(`Setting up BC channel... open directly.`)
      bc.onmessage = ({ data }) => {
        console.log(`got bc message`)
        console.log(data)
        // if (data && data.target === 'CWS-TAB') {
        //   const { action, params } = data
        //   const replyAction = `${action}-reply`
        //   switch (action) {
        //     case 'coolwallet-unlock':
        //       this.unlock(replyAction, params.addrIndex)
        //       break
        //     case 'coolwallet-sign-transaction':
        //       this.signTransaction(replyAction, params.addrIndex, params.tx, params.publicKey)
        //       break
        //     case 'coolwallet-sign-personal-message':
        //       this.signPersonalMessage(replyAction, params.addrIndex, params.message, params.publicKey)
        //       break
        //     case 'coolwallet-sign-typed-data':
        //       this.signTypedData(replyAction, params.addrIndex, params.typedData, params.publicKey)
        //       break
        //   }
        // }
      }
    }
  }
}