import React, { Component } from 'react';
import CoolWallet from '@coolwallets/wallet';
import { getAppKeysOrGenerate, getAppIdOrNull } from './Utils/sdkUtil';
import Settings from './Settings';

const { appPublicKey, appPrivateKey } = getAppKeysOrGenerate();
const appId = getAppIdOrNull();

export default class Wallet extends Component {
	render() {
		const { transport } = this.state;
		const wallet = new CoolWallet(transport, appPrivateKey, appId);
		return (
			<div>
				<Settings wallet={wallet} appPublicKey={appPublicKey} />
			</div>
		);
	}
}
