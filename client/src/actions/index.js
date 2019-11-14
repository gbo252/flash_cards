import axios from "axios";
import {
	FETCH_USER,
	FETCH_CATEGORIES,
	SET_CATEGORIES_DELETE,
	FETCH_FLASH_CARDS,
	CLEAR_FLASH_CARDS,
	SET_MODAL_INFO,
	SET_MODAL_NEW_SHOW,
	SET_MODAL_EDIT_SHOW,
	SET_MODAL_DELETE_SHOW,
	SET_TOAST_CONTENT,
	SET_TOAST_SHOW,
	SET_DOTS_MENU_SHOW
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

export const setCategoriesDelete = set => {
	return { type: SET_CATEGORIES_DELETE, payload: set };
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

// MODALS

export const setModalInfo = info => {
	return { type: SET_MODAL_INFO, payload: info };
};

export const setModalNewShow = show => {
	return { type: SET_MODAL_NEW_SHOW, payload: show };
};

export const setModalEditShow = show => {
	return { type: SET_MODAL_EDIT_SHOW, payload: show };
};

export const setModalDeleteShow = show => {
	return { type: SET_MODAL_DELETE_SHOW, payload: show };
};

// TOASTS

export const setToastContent = content => {
	return { type: SET_TOAST_CONTENT, payload: content };
};

export const setToastShow = show => {
	return { type: SET_TOAST_SHOW, payload: show };
};

// DOTS MENU

export const setDotsMenuShow = show => {
	return { type: SET_DOTS_MENU_SHOW, payload: show };
};
