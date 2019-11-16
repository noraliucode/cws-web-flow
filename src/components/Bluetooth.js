import React, { Component } from 'react';
import WebBleTransport from '@coolwallets/transport-web-ble';
import Button from './Button';

export default class Bluetooth extends Component {
	state = {
		transport: {}
	};
	connect = async () => {
		console.log('click!!');
		WebBleTransport.listen(async (error, device) => {
			if (device) {
				const transport = await WebBleTransport.connect(device);
				this.setState({
					transport
				});
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
