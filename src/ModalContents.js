export const signingContent = {
	logo: 'contract.png',
	message: 'Signing...'
};

export const processingContent = (message) => ({
	logo: 'Processing',
	message: message || 'Processing...',
	disableBackdropClick: true
});

export const confirmOnCardContent = {
	logo: 'card.png',
	message: 'Confirm on your card',
	disableBackdropClick: true
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

export const checkSumFail = (callback) => ({
	logo: '',
	message: 'Check sum fail, please check your seed and try again',
	action: {
		okCallback: callback,
		okText: 'ok'
	}
});

export const errorMessageContent = (error) => ({
	title: 'Error',
	logo: '',
	message: error
});

export const hintMessageContent = (message) => ({
	title: 'Notice',
	logo: '',
	message: message
});
