import React, { Component } from 'react';
import Modal from '../components/Modal';
import styled from 'styled-components';
import BluetoothConnectButton from '../components/Bluetooth';
import WebScript from '../scripts/webScript';
import { Button } from '@material-ui/core';
import { EXTRA_LARGE } from '../constant';
import { connect } from 'react-redux';

class Connect extends Component {
	render() {
		const { device, isConnected, transport } = this.props;
		return (
			<Wrapper>
				<Title>
					{isConnected && transport && device ? (
						<TextWrapper>
							Connected with <Text>{device.name.split(' ')[1]}</Text>
						</TextWrapper>
					) : (
						'Wallet is not connected'
					)}
				</Title>
				<WebScript transport={transport} />
				<Modal image={'contract.png'} message={'Signing...'} title={''} />
				<IconWrapper>
					<Image src={'laptop.png'} />
					<Image src={isConnected ? 'bluetooth_connected.png' : 'bluetooth.png'} />
					<Image src={'card.png'} />
				</IconWrapper>
				{isConnected && device ? null : <BluetoothConnectButton history={this.props.history} />}
			</Wrapper>
		);
	}
}

const mapStateToProps = (state) => ({
	device: state.common.device,
	transport: state.common.transport,
	isConnected: state.common.isConnected
});

export default connect(mapStateToProps, null)(Connect);
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
	height: 500px;
	flex-flow: column;
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
	font-size: ${EXTRA_LARGE};
	color: #7f7f7f;
	height: 150px;
	max-width: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
