import { FETCH_FLASH_CARDS, CLEAR_FLASH_CARDS } from "../actions/types";

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
