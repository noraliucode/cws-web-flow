import React, { Component } from 'react';
import styled from 'styled-components';
import { BROWN_GREY, DARK_GREY, ORANGEY_YELLOW, DARK_GREY2 } from '../constant';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Button from '../components/Button';

export default class GenerateWallet extends Component {
	state = {
		active: '1'
	};
	handleOnClick = () => {
		console.log('confirm your seed!!');
	};
	render() {
		const { active } = this.state;
		return (
			<Container>
				<Title>
					<AccountBalanceWalletIcon htmlColor={BROWN_GREY} fontSize="large" />Wallet is empty
				</Title>
				<NavigationBar>
					<NavigationButton onClick={() => this.setState({ active: '1' })} active={active === '1' && true}>
						Input existing seed
					</NavigationButton>
					<NavigationButton onClick={() => this.setState({ active: '2' })} active={active === '2' && true}>
						Generate seed
					</NavigationButton>
				</NavigationBar>
				<Text>Disconnect from the Internet if you want to be absolutely safe on this step</Text>
				<InfoBox placeholder={'Your seed here'} />
				<Button buttonStyle={'gray'} label={'Confirm'} handleOnClick={this.handleOnClick} />
			</Container>
		);
	}
}
const NavigationButton = styled.div`
	width: 288px;
	height: 54px;
	border-radius: 27px;
	background-color: ${(props) => (props.active ? DARK_GREY2 : DARK_GREY)};
	color: ${(props) => (props.active ? ORANGEY_YELLOW : BROWN_GREY)};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NavigationBar = styled.div`
	width: 588px;
	height: 54px;
	border-radius: 27px;
	background-color: ${DARK_GREY};
	display: flex;
`;

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
