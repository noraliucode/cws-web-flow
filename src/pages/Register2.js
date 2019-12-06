import React, { Component, Fragment } from 'react';
import { BROWN_GREY, ORANGEY_YELLOW, EXTRA_LARGE, MEDIUM, SMALL } from '../constant';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import styled from 'styled-components';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { resetContent } from '../ModalContents';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';

import CWSWallet from '@coolwallets/wallet';
import { getAppKeysOrGenerate, setAppId } from '../Utils/sdkUtil';

class Register2 extends Component {
	constructor(props) {
		super(props);
		const { appPrivateKey } = getAppKeysOrGenerate();
		const { transport } = this.props;
		this.state = {
			test: [ 'CoolBitX Crypto (Android)', 'Zerion' ],
			showModal: false,
			pairingPassword: '',
			wallet: new CWSWallet(transport, appPrivateKey)
		};
	}

	toggle = () => {
		const { showModal } = this.state;
		this.setState({ showModal: !showModal });
	};
	whitelist = () => {
		const { test, showModal } = this.state;
		return (
			<Dialog
				aria-describedby="alert-dialog-description"
				onClose={this.toggle}
				aria-labelledby="simple-dialog-title"
				open={showModal}
				fullWidth={true}
				maxWidth={'xs'}
				PaperProps={{
					style: {
						backgroundColor: '#202124',
						color: '#fff',
						boxShadow: '10px 10px 20px 0px rgba(0,0,0,0.2)',
						borderRadius: 15
					}
				}}
			>
				<DialogTitle id="simple-dialog-title">Your device</DialogTitle>
			</Dialog>
		);
	};
	handleOnClick = async () => {
		const { walletCreated, device } = this.props.history.location;
		const { appPublicKey } = getAppKeysOrGenerate();
		try {
			const appId = await this.state.wallet.register(
				appPublicKey,
				this.state.pairingPassword,
				'CoolWalletConnect'
			);
			await setAppId(appId);
			if (!walletCreated) {
				console.log('walletCreated!!', walletCreated);
				this.props.history.push({
					pathname: '/generateWallet'
				});
			} else {
				console.log('wallet has been created, walletCreated');
				this.props.history.push({
					pathname: '/',
					device
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	renderConditionalComponent = (comp1, comp2) => {
		const { paired } = this.props.history.location;
		return paired ? comp1 : comp2;
	};
	render() {
		const { openModal } = this.props;
		return (
			<Container>
				{this.whitelist()}
				<Title>
					{this.renderConditionalComponent(
						<Fragment>
							<AccountBalanceWalletIcon htmlColor={ORANGEY_YELLOW} fontSize="large" />Wallet is registered
						</Fragment>,
						<Fragment>
							<AccountBalanceWalletOutlinedIcon htmlColor={BROWN_GREY} fontSize="large" />Wallet is brand
							new
						</Fragment>
					)}
				</Title>
				<InfoBox>
					{this.renderConditionalComponent(
						<Fragment>
							'Please use the pairing password to add CoolWallet Connect to'{' '}
							<TextUnderline onClick={() => this.setState({ showModal: true })}>whitelist.</TextUnderline>
						</Fragment>,
						'Please click register to connect CoolWalletS with CoolWalletConnect.'
					)}
				</InfoBox>
				<Wrapper>
					<PairingPasswordInput
						placeholder={'Pairing Password'}
						style={{ color: 'white' }}
						onChange={({ target }) => this.setState({ pairingPassword: target.value })}
					/>
					<Button width={200} label={'Register'} handleOnClick={this.handleOnClick} />
				</Wrapper>
				{this.renderConditionalComponent(
					<Hint onClick={() => openModal(resetContent(() => this.state.wallet.resetCard()))}>
						Lost your device?
					</Hint>,
					null
				)}
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	showModal: state.common.showModal,
	modalContent: state.common.modalContent,
	transport: state.common.transport
});

const mapDispatchToProps = {
	openModal,
	closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Register2);

const Container = styled.div`
	max-width: 604px;
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TextUnderline = styled.div`
	text-decoration: underline;
	cursor: pointer;
`;
const Title = styled.div`
	font-size: ${EXTRA_LARGE};
	color: ${BROWN_GREY};
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30px;
	width: 265px;
	display: flex;
`;
const InfoBox = styled.div`
	height: 300px;
	width: 100%;
	border-radius: 5px;
	border: solid 1px ${BROWN_GREY};
	background-color: #202124;
	line-height: 1.64;
	color: ${BROWN_GREY};
	padding: 20px;
	box-sizing: border-box;
`;
const Wrapper = styled.div`
	margin: 50px;
	display: flex;
	width: 100%;
	justify-content: space-between;
`;
const PairingPasswordInput = styled.input`
	width: 100%;
	max-width: 371px;
	height: 55px;
	border-radius: 27px;
	background-color: #212529;
	border: 0;
	padding: 5px 20px;
	box-sizing: border-box;
	&:focus {
		outline: none;
	}
	::placeholder {
		color: #4c4c4c;
		font-size: ${SMALL};
	}
`;
const Hint = styled.div`
	width: 212px;
	height: 21px;
	font-size: ${MEDIUM};
	text-align: center;
	color: ${BROWN_GREY};
	text-decoration: underline;
	cursor: pointer;
`;
