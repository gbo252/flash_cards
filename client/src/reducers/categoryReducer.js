import {
	FETCH_CATEGORIES,
	SET_CATEGORIES_DELETE,
	SET_JUST_DELETED
} from "../actions/types";

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

export const justDeleted = (state = [], action) => {
	switch (action.type) {
		case SET_JUST_DELETED:
			return action.payload;
		default:
			return state;
	}
};
