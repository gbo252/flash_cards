import { SET_TOAST_INFO, SET_TOAST_SHOW } from "../actions/types";

export const toastInfo = (state = null, action) => {
	switch (action.type) {
		case SET_TOAST_INFO:
			return action.payload;
		default:
			return state;
	}
};

export const toastShow = (state = { show: false, inc: 0 }, action) => {
	switch (action.type) {
		case SET_TOAST_SHOW:
			return {
				...state,
				show: action.payload.show,
				inc: state.inc + action.payload.inc
			};
		default:
			return state;
	}
};
