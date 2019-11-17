import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';

class Modal extends Component {
	render() {
		const { showModal } = this.props;
		const { image, message, title } = this.props;
		return (
			<div>
				<Dialog
					aria-describedby="alert-dialog-description"
					onClose={this.props.closeModal}
					aria-labelledby="simple-dialog-title"
					open={showModal}
				>
					<DialogTitle id="simple-dialog-title">{title}</DialogTitle>
					<DialogContent>
						<Image alt="img" src={image} />
						<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
					</DialogContent>
				</Dialog>
				<Button variant="outlined" color="primary" onClick={this.props.openModal}>
					{message}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	showModal: state.common.showModal
});

const mapDispatchToProps = {
	openModal,
	closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

const Image = styled.img`width: 100px;`;
