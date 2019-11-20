import React, { Component } from 'react';
import { BROWN_GREY, ORANGEY_YELLOW } from '../constant';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
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
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import { withStyles } from '@material-ui/core/styles';
import { resetContent } from '../ModalContents';

class Register2 extends Component {
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
		// const classes = {
		// 	closeButton: {
		// 		position: 'absolute',
		// 		right: '10px',
		// 		top: '10px',
		// 		color: BROWN_GREY
		// 	}
		// };
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
				<DialogTitle id="simple-dialog-title">
					Your device
					{/* <IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={() => this.setState({ showModal: false })}
						color={'secondary'}
					>
						<CloseIcon />
					</IconButton> */}
				</DialogTitle>
				<List>
					{test.map((x, index) => (
						<ListItem button onClick={() => console.log('device', x)} key={index}>
							<ListItemAvatar>
								{/* <Avatar className={classes.avatar}> */}
								{/* <PersonIcon />
								</Avatar> */}
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
		return (
			<div>
				{this.whitelist()}
				<Title>
					<AccountBalanceWalletIcon htmlColor={ORANGEY_YELLOW} fontSize="large" />Wallet is registered
				</Title>
				<InfoBox>
					Please use the pairing password to add CoolWallet Connect to{' '}
					<TextUnderline onClick={() => this.setState({ showModal: true })}>whitelist.</TextUnderline>
				</InfoBox>
				<Wrapper>
					<PairingPasswordInput onChange={({ target }) => this.setState({ pairingPassword: target.value })} />
					<Button width={200} label={'Register'} handleOnClick={this.handleOnClick} />
				</Wrapper>
				<Hint onClick={() => openModal(resetContent(() => console.log('reset!')))}>Lost your device?</Hint>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register2);

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
	padding: 5px 20px;
	box-sizing: border-box;
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
