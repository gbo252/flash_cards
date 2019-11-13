import axios from "axios";
import {
	FETCH_USER,
	FETCH_CATEGORIES,
	FETCH_FLASH_CARDS,
	CLEAR_FLASH_CARDS
} from "./types";

// USER

export const fetchUser = () => async dispatch => {
	const res = await axios.get("/auth/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

// CATEGORIES

export const fetchCategories = () => async dispatch => {
	const res = await axios.get("/category-routes");

	dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const newCategory = formValues => async dispatch => {
	await axios.post("/category-routes", formValues);

	dispatch(fetchCategories());
};

export const editCategory = (formValues, category) => async dispatch => {
	await axios.patch(`/category-routes/edit/${category}`, formValues);

	dispatch(fetchCategories());
};

export const deleteCategories = idArrayToDelete => async dispatch => {
	await axios.delete("/category-routes/delete", {
		data: idArrayToDelete
	});

	dispatch(fetchCategories());
};

// FLASH CARDS

export const fetchFlashCards = category => async dispatch => {
	const res = await axios.get(`/flashcards/${category}`);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data.cards });
};

export const newFlashCard = (formValues, category, history) => async () => {
	await axios.post(`/flashcards/${category}`, formValues);

	history.push(`/categories/${category}`);
};

export const clearFlashCards = () => {
	return { type: CLEAR_FLASH_CARDS };
};

export const deleteFlashCard = (id, category) => async dispatch => {
	await axios.delete(`/flashcards/${category}/${id}`);

	dispatch(fetchFlashCards(category));
};
