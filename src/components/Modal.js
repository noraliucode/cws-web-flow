import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import { signingContent, processingContent, confirmOnCardContent } from '../ModalContents';
import CircularProgress from '@material-ui/core/CircularProgress';
class Modal extends Component {
	render() {
		const { showModal } = this.props;
		// const { image, message, title } = this.props;
		const { logo, message, title } = this.props.modalContent;
		return (
			<div>
				<Dialog
					aria-describedby="alert-dialog-description"
					onClose={this.props.closeModal}
					aria-labelledby="simple-dialog-title"
					open={showModal}
				>
					<DialogTitle id="simple-dialog-title">{title ? title : ''}</DialogTitle>
					<DialogContent>
						{logo === 'Processing' ? <CircularProgress /> : <Image alt="img" src={logo} />}
						<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
					</DialogContent>
				</Dialog>
				<Button variant="outlined" color="primary" onClick={() => this.props.openModal(signingContent)}>
					Signing...
				</Button>
				<Button variant="outlined" color="primary" onClick={() => this.props.openModal(processingContent)}>
					Processing...
				</Button>
				<Button variant="outlined" color="primary" onClick={() => this.props.openModal(confirmOnCardContent)}>
					Confirm on your card
				</Button>
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

const Image = styled.img`width: 100px;`;
