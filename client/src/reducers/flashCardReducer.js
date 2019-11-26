import {
	FETCH_FLASH_CARDS,
	CLEAR_FLASH_CARDS,
	SET_FLASH_CARDS_DELETE
} from "../actions/types";

export const flashCards = (state = null, action) => {
	switch (action.type) {
		case FETCH_FLASH_CARDS:
			return action.payload;
		case CLEAR_FLASH_CARDS:
			return null;
		default:
			return state;
	}
};

export const flashCardsDelete = (state = false, action) => {
	switch (action.type) {
		case SET_FLASH_CARDS_DELETE:
			return action.payload;
		default:
			return state;
	}
};
