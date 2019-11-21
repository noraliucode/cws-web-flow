import React, { Component } from 'react';
import WebBleTransport from '@coolwallets/transport-web-ble';
import Button from './Button';

import { getAppIdOrNull } from '../Utils/sdkUtil'

export default class Bluetooth extends Component {
	state = {
		transport: null,
	};
	connect = async () => {
		WebBleTransport.listen(async (error, device) => {
			if (device) {
				console.log('device', device);
				const transport = await WebBleTransport.connect(device);
				this.setState({ transport });
				
				// disconnect listener
				WebBleTransport.setOnDisconnect(device, () => {
					this.props.isConnected(false)
					this.setState({ transport: null })
				})

				// inform IFRAME ready for data
				let bc = new BroadcastChannel('coolwallets')
				bc.postMessage({ target: 'connection-success' })
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
		const { transport } = this.state;
		WebBleTransport.disconnect(transport.device.id);
		this.props.isConnected(false);
		this.setState({
			transport: null
		});
	};
	render() {
		return <Button label={'Connect'} handleOnClick={this.connect} />;
	}
}
