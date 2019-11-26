import React, { Component } from 'react';
import WebBleTransport from '@coolwallets/transport-web-ble';
import CoolWallet from '@coolwallets/wallet'
import Button from './Button';

import { getAppIdOrNull, getAppKeysOrGenerate } from '../Utils/sdkUtil'

export default class Bluetooth extends Component {
	state = {
		transport: null,
	};
	connect = async () => {
		WebBleTransport.listen(async (error, device) => {
			if (device) {
				console.log('device', device);
				const transport = await WebBleTransport.connect(device);
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
				this.props.isConnected(true);
				this.props.device(device);

				// Go to regsiter page if no appId found.
				const appId = getAppIdOrNull()
				if(appId === null){
					console.log(`no appId foun`)
					this.props.history.push({
						pathname: '/register2',
						device,
						transport
					});
				}
				return transport;
			}
			throw error;
		});
	};

	disconnect = () => {
		const transport = this.props.transport;
		WebBleTransport.disconnect(transport.device.id);
		this.props.isConnected(false);
		// this.setState({ transport: null });
		this.props.setTransport(null)
	};
	render() {
		return <Button label={'Connect'} handleOnClick={this.connect} />;
	}
}
