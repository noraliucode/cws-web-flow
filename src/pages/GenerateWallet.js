import React, { Component } from 'react';
import styled from 'styled-components';
import { BROWN_GREY } from '../constant';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Button from '../components/Button';

export default class GenerateWallet extends Component {
	handleOnClick = () => {
		console.log('confirm your seed!!');
	};
	render() {
		return (
			<Container>
				<Title>
					<AccountBalanceWalletIcon htmlColor={BROWN_GREY} fontSize="large" />Wallet is empty
				</Title>
				<Text>Disconnect from the Internet if you want to be absolutely safe on this step</Text>
				<InfoBox placeholder={'Your seed here'} />
				<Button buttonStyle={'gray'} label={'Confirm'} handleOnClick={this.handleOnClick} />
			</Container>
		);
	}
}

const InfoBox = styled.textarea`
	height: 140px;
	width: 100%;
	border-radius: 5px;
	border: solid 1px ${BROWN_GREY};
	background-color: #202124;
	line-height: 1.64;
	color: ${BROWN_GREY};
	padding: 20px;
	box-sizing: border-box;
	border-radius: 23px;
	::placeholder {
		color: #4c4c4c;
		font-size: 16px;
	}
`;
const Container = styled.div`
	max-width: 604px;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Text = styled.div`
	height: 82px;
	font-size: 25px;
	line-height: 1.64;
	color: ${BROWN_GREY};
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
