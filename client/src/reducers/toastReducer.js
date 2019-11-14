import { SET_TOAST_CONTENT, SET_TOAST_SHOW } from "../actions/types";

export const toastContent = (state = "", action) => {
	switch (action.type) {
		case SET_TOAST_CONTENT:
			return action.payload;
		default:
			return state;
	}
};

export const toastShow = (state = false, action) => {
	switch (action.type) {
		case SET_TOAST_SHOW:
			return action.payload;
		default:
			return state;
	}
};
