export const signingContent = {
	logo: 'contract.png',
	message: 'Signing...'
};

export const processingContent = {
	logo: 'Processing',
	message: 'Processing...'
};

export const confirmOnCardContent = {
	logo: 'card.png',
	message: 'Confirm on your card'
};

export const resetContent = (callback) => ({
	title: 'Lost your device?',
	logo: '',
	message: 'Would you like to reset your wallet?',
	action: {
		okCallback: callback,
		okText: 'Reset',
		CancelText: 'Cancel'
	}
});

export const checkSumFail = {
	logo: '',
	message: 'Check sum fail, please check your seed and try again',
	action: {
		CancelText: 'ok'
	}
};
