import { FETCH_CATEGORIES, SET_CATEGORIES_DELETE } from "../actions/types";

export const categories = (state = null, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};

export const categoriesDelete = (state = false, action) => {
	switch (action.type) {
		case SET_CATEGORIES_DELETE:
			return action.payload;
		default:
			return state;
	}
};
