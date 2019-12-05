import * as types from '../actions/types';

const initialState = {
	modalContent: {
		logo: '',
		title: '',
		message: '',
		transport: null
	},
	showModal: false,
	device: null,
	transport: null,
	isConnected: false
};

const commonReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.OPEN_MODAL:
			return {
				...state,
				modalContent: action.payload,
				showModal: true
			};
		case types.CLOSE_MODAL:
			return {
				...state,
				showModal: false
			};
		case types.NAVIGATE_TO_REIGSTER2:
			return {
				...state,
				transport: action.payload
			};
		case types.SETUP_DEVICE:
			return {
				...state,
				device: action.payload
			};
		case types.SETUP_ISCONNECTED:
			return {
				...state,
				isConnected: action.payload
			};
		case types.SETUP_TRANSPORT:
			return {
				...state,
				transport: action.payload
			};
		default:
			return state;
	}
};

export default commonReducer;
