import React, { Component } from 'react';
import Modal from '../components/Modal';
import styled from 'styled-components';
import BluetoothConnectButton from '../components/Bluetooth';

// const styles = {
// 	largeIcon: {
// 		width: 60,
// 		height: 60
// 	}
// };

export default class Connect extends Component {
	state = {
		isConnected: false,
		device: null
	};
	render() {
		const { isConnected, device } = this.state;
		return (
			<Wrapper>
				<Title> {isConnected && device ? `Connected with ${device.name}` : 'Wallet is not connected'}</Title>
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
						webpageHandler ={this.props.webpageHandler}
					/>
				)}
			</Wrapper>
		);
	}
}

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
	margin-top: 120px;
	margin-bottom: 105px;
`;
