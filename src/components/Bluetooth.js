import React, { Component } from 'react';
import WebBleTransport from '@coolwallets/transport-web-ble';
import Button from './Button';

export default class Bluetooth extends Component {
	state = {
		transport: {},
		device: {}
	};
	connect = async () => {
		WebBleTransport.listen(async (error, device) => {
			if (device) {
				console.log('device', device);
				const transport = await WebBleTransport.connect(device);
				this.setState({
					transport,
					device
				});
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
		this.setState({
			transport: {}
		});
	};
	render() {
		return <Button label={'Connect'} handleOnClick={this.connect} />;
	}
}
