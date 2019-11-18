import { SET_TOAST_INFO, SET_TOAST_SHOW } from "../actions/types";

export const toastInfo = (state = { text: "", color: "" }, action) => {
	switch (action.type) {
		case SET_TOAST_INFO:
			return {
				...state,
				text: action.payload.text,
				color: action.payload.color
			};
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
