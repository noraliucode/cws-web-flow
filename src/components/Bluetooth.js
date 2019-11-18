import React, { Component } from 'react';
import WebBleTransport from '@coolwallets/transport-web-ble';
import Button from './Button';

export default class Bluetooth extends Component {
	state = {
		transport: null,
	};
	connect = async () => {
		WebBleTransport.listen(async (error, device) => {
			if (device) {
        console.log('device', device);
				const transport = await WebBleTransport.connect(device);
				this.setState({
					transport,
        });
        // disconnect listener
        device.addEventListener('gattserverdisconnected', () => {
        	this.props.isConnected(false)
          this.setState({ transport: null })
        })

				// inform IFRAME ready for data
				let bc = new BroadcastChannel('coolwallets')
				bc.postMessage({ target: 'connection-success' })
				this.props.setTransport(transport)
				this.props.isConnected(true);
				this.props.device(device);
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
