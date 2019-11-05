import axios from "axios";
import {
	FETCH_USER,
	FETCH_CATEGORIES,
	FETCH_FLASH_CARDS,
	CLEAR_FLASH_CARDS
} from "./types";

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/auth/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchCategories = () => async dispatch => {
	const res = await axios.get("/category-routes");

	dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const fetchFlashCards = category => async dispatch => {
	const res = await axios.get(`/flashcards/${category}`);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data.cards });
};

export const newCategory = (formValues, history) => async () => {
	await axios.post("/category-routes", formValues);

	history.push("/");
};

export const newFlashCard = (formValues, category, history) => async () => {
	await axios.post(`/flashcards/${category}`, formValues);

	history.push(`/categories/${category}`);
};

export const clearFlashCards = () => {
	return { type: CLEAR_FLASH_CARDS };
};

export const editCategory = (formValues, category, history) => async () => {
	await axios.patch(`/category-routes/edit/${category}`, formValues);

	history.push("/");
};

export const deleteCategory = id => async dispatch => {
	await axios.delete(`/category-routes/delete/${id}`);

	dispatch(fetchCategories());
};

export const deleteFlashCard = (id, category) => async dispatch => {
	await axios.delete(`/flashcards/${category}/${id}`);

	dispatch(fetchFlashCards(category));
};
