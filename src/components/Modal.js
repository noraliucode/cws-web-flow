import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class Modal extends Component {
	state = {
		visibility: false
	};
	handleClose = () => {
		this.setState({ visibility: false });
	};

	open = () => {
		this.setState({ visibility: true });
	};

	render() {
		const { visibility } = this.state;
		const { image, message, title } = this.props;
		return (
			<div>
				<Dialog
					aria-describedby="alert-dialog-description"
					onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={visibility}
				>
					<DialogTitle id="simple-dialog-title">{title}</DialogTitle>
					<DialogContent>
						<Image alt="img" src={image} />
						<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
					</DialogContent>
				</Dialog>
				<Button variant="outlined" color="primary" onClick={this.open}>
					{message}
				</Button>
			</div>
		);
	}
}

const Image = styled.img`width: 100px;`;
