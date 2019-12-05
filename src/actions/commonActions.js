import * as types from './types';

export const openModal = (payload) => ({
	type: types.OPEN_MODAL,
	payload
});

export const closeModal = () => ({
	type: types.CLOSE_MODAL
});

export const navigateToRegister2 = () => ({
	type: types.NAVIGATE_TO_REIGSTER2
});

export const setupDevice = (payload) => ({
	type: types.SETUP_DEVICE,
	payload
});

export const setupIsConnected = (payload) => ({
	type: types.SETUP_ISCONNECTED,
	payload
});

export const setupTransport = (payload) => ({
	type: types.SETUP_TRANSPORT,
	payload
});
