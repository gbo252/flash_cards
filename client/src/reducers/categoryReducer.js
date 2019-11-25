import {
	FETCH_CATEGORIES,
	NEW_CATEGORY,
	EDIT_CATEGORY,
	DELETE_CATEGORY,
	SET_CATEGORIES_DELETE,
	SET_JUST_DELETED
} from "../actions/types";

export const categories = (state = null, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.payload;
		case NEW_CATEGORY:
			return [...state, action.payload];
		case EDIT_CATEGORY:
			return state.map(obj => {
				if (obj._id !== action.payload._id) {
					return obj;
				}
				return {
					...obj,
					...action.payload
				};
			});
		case DELETE_CATEGORY:
			return state.filter(obj => {
				return !action.payload.some(id => id === obj._id);
			});
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
