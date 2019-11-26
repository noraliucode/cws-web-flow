import React, { Component } from 'react';

export default class Settings extends Component {
	getPassword = () => {
		this.props.wallet.getPairingPassword().then((pwd) => {
			console.log(`Got pairing password: ${pwd}`);
		});
	};

	render() {
		return (
			<div>
				<Button
					variant="outline-danger"
					style={{ margin: 20 }}
					onClick={() => {
						this.props.wallet.resetCard();
					}}
				>
					Reset
				</Button>
				<Button
					style={{ margin: 20 }}
					variant="outline-light"
					onClick={() => {
						this.props.wallet.register(this.props.appPublicKey, '2799548', 'CoolWalletS Bridge').then((appId) => {
							localStorage.setItem('appId', appId);
							this.props.wallet.setAppId(appId);
							console.log(`Store AppId complete! ${appId}`);
						});
					}}
				>
					Register
				</Button>

				<Button variant="outline-light" style={{ margin: 20 }} onClick={this.getPassword}>
					{' '}
					Get password
				</Button>
			</div>
		);
	}
}
