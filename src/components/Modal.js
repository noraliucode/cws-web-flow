import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
// import { signingContent, processingContent, confirmOnCardContent } from '../ModalContents';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from './Button';
import { BROWN_GREY, GREYISH_BROWN, DARK_GREY, LARGE } from '../constant';

const themeLightGray = {
	button: {
		background: BROWN_GREY,
		color: GREYISH_BROWN,
		hoverBackground: DARK_GREY,
		hoverColor: BROWN_GREY
	}
};

class Modal extends Component {
	render() {
		const { showModal, closeModal } = this.props;
		// const { image, message, title } = this.props;
		const { logo, message, title, action } = this.props.modalContent;
		return (
			<div>
				<Dialog
					aria-describedby="alert-dialog-description"
					onClose={closeModal}
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
					<DialogTitle id="simple-dialog-title">{title ? title : ''}</DialogTitle>
					<DialogContent>
						<DialogContentWrapper>
							{logo === 'Processing' ? (
								<CircularProgress />
							) : logo ? (
								<Image alt="img" src={logo} />
							) : null}
						</DialogContentWrapper>
						<TextWhite>{message}</TextWhite>
					</DialogContent>
					<ActionWrapper>
						{action ? <Button width={150} label={action.okText} handleOnClick={action.okCallback} /> : null}
						{action && action.CancelText ? (
							<Button
								width={150}
								label={action.CancelText}
								handleOnClick={closeModal}
								theme={themeLightGray}
							/>
						) : null}
					</ActionWrapper>
				</Dialog>
				{/* <Button variant="outlined" color="primary" onClick={() => this.props.openModal(signingContent)}>
					Signing...
				</Button>
				<Button variant="outlined" color="primary" onClick={() => this.props.openModal(processingContent)}>
					Processing...
				</Button>
				<Button variant="outlined" color="primary" onClick={() => this.props.openModal(confirmOnCardContent)}>
					Confirm on your card
				</Button> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

const Image = styled.img`width: 40px;`;
const TextWhite = styled.div`
	color: white;
	display: flex;
	justify-content: center;
	margin: 50px 0;
	font-size: ${LARGE};
`;
const DialogContentWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
const ActionWrapper = styled.div`
	display: flex;
	margin-bottom: 30px;
	justify-content: space-around;
`;
