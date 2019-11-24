import {
	SET_MODAL_INFO,
	SET_MODAL_NEW_CAT_SHOW,
	SET_MODAL_EDIT_CAT_SHOW,
	SET_MODAL_NEW_FLASH_SHOW,
	SET_MODAL_EDIT_FLASH_SHOW,
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

export const modalNewCatShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_NEW_CAT_SHOW:
			return action.payload;
		default:
			return state;
	}
};

export const modalEditCatShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_EDIT_CAT_SHOW:
			return action.payload;
		default:
			return state;
	}
};

export const modalNewFlashShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_NEW_FLASH_SHOW:
			return action.payload;
		default:
			return state;
	}
};

export const modalEditFlashShow = (state = false, action) => {
	switch (action.type) {
		case SET_MODAL_EDIT_FLASH_SHOW:
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
