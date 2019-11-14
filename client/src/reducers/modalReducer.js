import {
	SET_MODAL_INFO,
	SET_MODAL_NEW_SHOW,
	SET_MODAL_EDIT_SHOW,
    SET_MODAL_DELETE_SHOW
} from "../actions/types";

export const modalInfo = (state = null, action) => {
	switch (action.type) {
		case SET_MODAL_INFO:
			return action.payload;
		default:
			return state;
	}
};

export const modalNewShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_NEW_SHOW:
			return action.payload;
		default:
			return state;
	}
};

export const modalEditShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_EDIT_SHOW:
			return action.payload;
		default:
			return state;
	}
};

export const modalDeleteShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_DELETE_SHOW:
			return action.payload;
		default:
			return state;
	}
};
