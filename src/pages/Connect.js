import React, { Component } from 'react';
import Modal from '../components/Modal';
import styled from 'styled-components';
import BluetoothConnectButton from '../components/Bluetooth';
import WebScript from '../scripts/webScript';
import { Button } from '@material-ui/core';
import { EXTRA_LARGE } from '../constant';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { confirmOnCardContent } from '../ModalContents';

class Connect extends Component {
	// state = {
	// 	isConnected: false,
	// 	// device: null,
	// 	transport: null
	// };
	render() {
		// const { isConnected, transport } = this.state;
		const { device, isConnected, transport } = this.props;
		// console.log('this.state.device', this.state.device);
		// const device = this.state.device || this.props.history.location.device;
		// console.log('this.props.history', this.props.history);
		// console.log('device connect', device);
		// console.log('isConnected', isConnected);
		// console.log('transport', transport);
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
					{/* <LaptopChromebookIcon htmlColor={'#7f7f7f'} fontSize="large" />
					<BluetoothIcon htmlColor={'#7f7f7f'} fontSize="large" /> */}
					<Image src={'laptop.png'} />
					<Image src={isConnected ? 'bluetooth_connected.png' : 'bluetooth.png'} />
					<Image src={'card.png'} />
				</IconWrapper>
				{/* <Button
					variant="outlined"
					color="primary"
					onClick={() => {
						this.props.history.push({
							pathname: '/register2',
							device,
							transport
						});
					}}
				>
					To register page
				</Button>{' '} */}
				{isConnected && device ? null : (
					<BluetoothConnectButton
						history={this.props.history}
						// isConnected={(isConnected) => this.setState({ isConnected })}
						// device={(device) => this.setState({ device })}
						// transport={transport}
						// setTransport={(transport) => this.setState({ transport })}
					/>
				)}
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
