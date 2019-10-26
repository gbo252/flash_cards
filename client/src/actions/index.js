import axios from "axios";
import { FETCH_USER, FETCH_CATEGORIES, FETCH_FLASH_CARDS } from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/auth/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCategories = () => async dispatch => {
	const res = await axios.get("/categories");

	dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const fetchFlashCards = categoryId => async dispatch => {
	const res = await axios.get(`/flashcards/${categoryId}`);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data.cards });
};
