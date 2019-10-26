import { FETCH_FLASH_CARDS } from "../actions/types";

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_FLASH_CARDS:
			return action.payload;
		default:
			return state;
	}
};
