import React, { Component } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import Modal from '../components/Modal';
// import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
// import BluetoothIcon from '@material-ui/icons/Bluetooth';
import styled from 'styled-components';

const styles = {
	largeIcon: {
		width: 60,
		height: 60
	}
};

export default class Connect extends Component {
	render() {
		return (
			<Wrapper>
				<Title>Wallet is not connected</Title>
				<Modal image={'contract.png'} message={'Signing...'} title={''} />
				<IconWrapper>
					{/* <LaptopChromebookIcon htmlColor={'#7f7f7f'} fontSize="large" />
					<BluetoothIcon htmlColor={'#7f7f7f'} fontSize="large" /> */}
					<Image src={'laptop.png'} />
					<Image src={'bluetooth.png'} />
					<Image src={'card.png'} />
				</IconWrapper>
				<Button label={'Connect'} />
			</Wrapper>
		);
	}
}

const Image = styled.img`
	height: 40px;
	// margin: 0 50px;
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
