import React, { Component } from 'react';
import Modal from '../components/Modal';
import styled from 'styled-components';
import BluetoothConnectButton from '../components/Bluetooth';
import Iframe from '../scripts/iframeScript'
import WebScript from '../scripts/webScript'

export default class Connect extends Component {
	state = {
		isConnected: false,
		device: null,
		transport: null
	};
	render() {
		const { isConnected, device, transport } = this.state;
		return (
			<Wrapper>
				<Title>
					{isConnected && device ? (
						<TextWrapper>
							Connected with <Text>{device.name.split(' ')[1]}</Text>
						</TextWrapper>
					) : ('Wallet is not connected')}
				</Title>
				<Iframe/>
				<WebScript transport={transport} ></WebScript>
				<Modal image={'contract.png'} message={'Signing...'} title={''} />
				<IconWrapper>
					{/* <LaptopChromebookIcon htmlColor={'#7f7f7f'} fontSize="large" />
					<BluetoothIcon htmlColor={'#7f7f7f'} fontSize="large" /> */}
					<Image src={'laptop.png'} />
					<Image src={isConnected ? 'bluetooth_connected.png' : 'bluetooth.png'} />
					<Image src={'card.png'} />
				</IconWrapper>
				{isConnected && device ? null : (
					<BluetoothConnectButton
						isConnected={(isConnected) => this.setState({ isConnected })}
						device={(device) => this.setState({ device })}
						setTransport={(transport) => this.setState({ transport })}
					/>
				)}
			</Wrapper>
		);
	}
}
const TextWrapper = styled.div`display: flex;`;
const Text = styled.div`
	color: #ffba12;
	margin-left: 8px;
`;
const Image = styled.img`
	height: 40px;
	@media (max-width: 480px) {
		margin: 0 10%;
	}
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 480px;
	@media (max-width: 480px) {
		width: 100%;
	}
`;
const IconWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 115px;
	@media (max-width: 480px) {
		width: 80%;
	}
`;
const Title = styled.div`
	font-size: 25px;
	color: #7f7f7f;
	height: 500px;
	max-width: 400px;
	text-align: center;
`;
