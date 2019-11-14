import { SET_DOTS_MENU_SHOW } from "../actions/types";

export const dotsMenuShow = (state = false, action) => {
	switch (action.type) {
		case SET_DOTS_MENU_SHOW:
			return action.payload;
		default:
			return state;
	}
};
