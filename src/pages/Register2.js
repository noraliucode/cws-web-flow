import React, { Component } from 'react';
import { BROWN_GREY, ORANGEY_YELLOW } from '../constant';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import styled from 'styled-components';
import Button from '../components/Button';

export default class Register2 extends Component {
	handleOnClick = () => {
		console.log('handleOnClick!');
	};
	render() {
		return (
			<div>
				<Title>
					<AccountBalanceWalletIcon htmlColor={ORANGEY_YELLOW} fontSize="large" />Wallet is registered
				</Title>
				<InfoBox>
					Please use the pairing password to add CoolWallet Connect to{' '}
					<TextUnderline>whitelist.</TextUnderline>
				</InfoBox>
				<Wrapper>
					<PairingPasswordInput />
					<Button width={200} label={'Register'} handleOnClick={this.handleOnClick} />
				</Wrapper>
				<Hint>Lost your device?</Hint>
			</div>
		);
	}
}

const TextUnderline = styled.div`
	text-decoration: underline;
	cursor: pointer;
`;
const Title = styled.div`
	font-size: 25px;
	color: ${BROWN_GREY};
	display: flex;
	align-items: center;
	justify-content: center;
`;
const InfoBox = styled.div`
	width: 604px;
	height: 298px;
	border-radius: 5px;
	border: solid 1px ${BROWN_GREY};
	background-color: #202124;
	line-height: 1.64;
	color: ${BROWN_GREY};
	padding: 20px;
	box-sizing: border-box;
`;
const Wrapper = styled.div`display: flex;`;
const PairingPasswordInput = styled.input`
	width: 371px;
	height: 54px;
	border-radius: 27px;
	background-color: #212529;
	border: 0;
	&:focus {
		outline: none;
	}
`;
const Hint = styled.div`
	width: 212px;
	height: 21px;
	font-size: 18px;
	text-align: center;
	color: ${BROWN_GREY};
	text-decoration: underline;
	cursor: pointer;
`;
