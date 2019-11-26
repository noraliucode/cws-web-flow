import React, { Component } from 'react'
import WebBleTransport from '@coolwallets/transport-web-ble'
import CoolWallet from '@coolwallets/wallet'
import Button from './Button'

import { getAppIdOrNull, getAppKeysOrGenerate } from '../Utils/sdkUtil'

export default class Bluetooth extends Component {
  state = {
    transport: null,
  }
  connect = async () => {
    WebBleTransport.listen(async (error, device) => {
      if (device) {
        console.log('device', device)
        const transport = await WebBleTransport.connect(device)
        this.props.setTransport(transport)
        // this.setState({ transport });

        // disconnect listener
        WebBleTransport.setOnDisconnect(device, () => {
          this.props.isConnected(false)
          // this.setState({ transport: null })
          this.props.setTransport(null)
        })

        // inform IFRAME ready for data
        let bc = new BroadcastChannel('coolwallets')
        bc.postMessage({ target: 'connection-status', connected: true })
        this.props.setTransport(transport)
        this.props.isConnected(true)
        this.props.device(device)

        // Go to regsiter page if no appId found.
        let appId = getAppIdOrNull()
        const { appPrivateKey } = getAppKeysOrGenerate()
        const wallet = new CoolWallet(transport, appPrivateKey, appId)

        if (appId !== null) {
          // Has local appId
          const isRegistered = await wallet.checkRegistered()
          if (isRegistered) return transport
          // Card has been reset / Different card
          console.log(`card reset/ different card`)
          appId = null
        }

        if (appId === null) {
          // Has no appId. Must go to register page
          const { paired, walletCreated } = await wallet.getCardInfo()
          if (paired) {
            // Device already paired with other Apps, go to register 2
            this.props.history.push({
              pathname: '/register2',
              walletCreated,
              device,
              transport,
            })
          } else {
            // Device has no pairing record (like a New Card!!!). Go to register 1
            this.props.history.push({
              pathname: '/register',
              device,
              transport,
            })
          }
        }
      }
      if (error) throw error
    })
  }

  disconnect = () => {
    const transport = this.props.transport
    WebBleTransport.disconnect(transport.device.id)
    this.props.isConnected(false)
    // this.setState({ transport: null });
    this.props.setTransport(null)
  }
  render() {
    return <Button label={'Connect'} handleOnClick={this.connect} />
  }
}
