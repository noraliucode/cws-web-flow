import React, { Component } from 'react';
import Modal from '../components/Modal';
// import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
// import BluetoothIcon from '@material-ui/icons/Bluetooth';
import styled from 'styled-components';
import BluetoothConnectButton from '../components/Bluetooth';

export default class Connect extends Component {
	state = {
		isConnected: false,
		device: null
	};
	render() {
		const { isConnected, device } = this.state;
		return (
			<Wrapper>
				<Title>
					{isConnected && device ? (
						<TextWrapper>
							Connected with <Text>{device.name.split(' ')[1]}</Text>
						</TextWrapper>
					) : (
						'Wallet is not connected'
					)}
				</Title>
				{/* <Modal image={'contract.png'} message={'Signing...'} title={''} /> */}
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
	height: 150px;
	max-width: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
