import React, { Component } from 'react';
import { BROWN_GREY, ORANGEY_YELLOW, EXTRA_LARGE, MEDIUM, SMALL, DARK_GREY } from '../constant';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import styled from 'styled-components';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { resetContent } from '../ModalContents';

class Register1 extends Component {
	state = {
		test: [ 'My pixel3', 'Zerion' ],
		showModal: false,
		pairingPassword: ''
	};
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
				<List>
					{test.map((x, index) => (
						<ListItem button onClick={() => console.log('device', x)} key={index}>
							<ListItemAvatar>
								<PhoneAndroidIcon />
							</ListItemAvatar>
							<ListItemText primary={x} />
						</ListItem>
					))}
				</List>
			</Dialog>
		);
	};
	handleOnClick = () => {
		console.log('this.state.pairingPassword!!', this.state.pairingPassword);
	};
	render() {
		const { openModal } = this.props;
		console.log('this.props.location', this.props.location);
		return (
			<Container>
				{this.whitelist()}
				<Title>
					<AccountBalanceWalletOutlinedIcon htmlColor={BROWN_GREY} fontSize="large" />Wallet is brand new
				</Title>
				<InfoBox>Please click register to connect CoolWalletS with CoolWalletConnect.</InfoBox>
				<Wrapper>
					<PairingPasswordInput
						placeholder={'Pairing Password'}
						style={{ color: 'white' }}
						onChange={({ target }) => this.setState({ pairingPassword: target.value })}
					/>
					<Button width={200} label={'Register'} handleOnClick={this.handleOnClick} />
				</Wrapper>
				{/* <Hint onClick={() => openModal(resetContent(() => console.log('reset!')))}>Lost your device?</Hint> */}
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	showModal: state.common.showModal,
	modalContent: state.common.modalContent
});

const mapDispatchToProps = {
	openModal,
	closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Register1);

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
