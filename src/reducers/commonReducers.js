import * as types from '../actions/types';
// import { CommonActions } from '../actions/commonActions';

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
	// console.log('commonReducer action.type = ', action.type);
	// console.log('commonReducer action.payload = ', action.payload);
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
			console.log('SETUP_DEVICE action.payload', action.payload);
			return {
				...state,
				device: action.payload
			};
		case types.SETUP_ISCONNECTED:
			console.log('SETUP_IS_CONNECTED action.payload', action.payload);
			return {
				...state,
				isConnected: action.payload
			};
		case types.SETUP_TRANSPORT:
			console.log('SETUP_TRANSPORT action.payload', action.payload);
			return {
				...state,
				transport: action.payload
			};
		default:
			return state;
	}
};

export default commonReducer;
