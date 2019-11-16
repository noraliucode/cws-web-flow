import React, { Component } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default class Connect extends Component {
	render() {
		return (
			<Container>
				<Modal image={'contract.png'} message={'Signing...'} title={''} />
				<Button label={'Connect'} />
			</Container>
		);
	}
}
