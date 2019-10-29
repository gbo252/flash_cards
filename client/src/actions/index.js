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

export const fetchFlashCards = category => async dispatch => {
	const res = await axios.get(`/flashcards/${category}`);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data.cards });
};

export const newCategory = (formValues, history) => async () => {
	await axios.post("/categories", formValues);

	history.push("/dashboard");
};

export const newFlashCard = (formValues, category, history) => async () => {
	await axios.post(`/flashcards/${category}`, formValues);

	history.push(`/dashboard/${category}`);
};

export const clearFlashCards = () => {
	return { type: FETCH_FLASH_CARDS, payload: [] };
};

export const deleteCategory = id => async dispatch => {
	await axios.delete(`/categories/${id}`);

	dispatch(fetchCategories());
};

export const deleteFlashCard = (id, category) => async dispatch => {
	await axios.delete(`/flashcards/${category}/${id}`);

	dispatch(fetchFlashCards(category));
};
