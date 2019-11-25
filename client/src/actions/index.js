import axios from "axios";
import {
	FETCH_USER,
	FETCH_CATEGORIES,
	NEW_CATEGORY,
	EDIT_CATEGORY,
	DELETE_CATEGORY,
	SET_CATEGORIES_DELETE,
	FETCH_FLASH_CARDS,
	CLEAR_FLASH_CARDS,
	SET_MODAL_INFO,
	SET_MODAL_NEW_CAT_SHOW,
	SET_MODAL_EDIT_CAT_SHOW,
	SET_MODAL_NEW_FLASH_SHOW,
	SET_MODAL_EDIT_FLASH_SHOW,
	SET_MODAL_DELETE_CAT_SHOW,
	SET_MODAL_DELETE_FLASH_SHOW,
	SET_TOAST_INFO,
	SET_TOAST_SHOW,
	SET_JUST_DELETED
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
	const res = await axios.post("/category-routes", formValues);

	dispatch({
		type: NEW_CATEGORY,
		payload: { ...res.data, cardsTotal: 0 }
	});
};

export const editCategory = (formValues, category) => async dispatch => {
	const res = await axios.patch(
		`/category-routes/edit/${category}`,
		formValues
	);

	dispatch({ type: EDIT_CATEGORY, payload: res.data[0] });
};

export const deleteCategories = idArrayToDelete => async dispatch => {
	const res = await axios.delete("/category-routes/delete", {
		data: idArrayToDelete
	});

	dispatch({ type: DELETE_CATEGORY, payload: res.data });
};

export const setCategoriesDelete = set => {
	return { type: SET_CATEGORIES_DELETE, payload: set };
};

export const setJustDeleted = idArray => {
	return { type: SET_JUST_DELETED, payload: idArray };
};

// FLASH CARDS

export const fetchFlashCards = category => async dispatch => {
	const res = await axios.get(`/flashcards/${category}`);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data });
};

export const newFlashCard = (formValues, category) => async dispatch => {
	const res = await axios.post(`/flashcards/${category}`, formValues);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data });
};

export const editFlashCard = (formValues, category, id) => async dispatch => {
	const res = await axios.patch(
		`/flashcards/${category}/edit/${id}`,
		formValues
	);

	dispatch({ type: FETCH_FLASH_CARDS, payload: res.data });
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

export const setModalNewCatShow = show => {
	return { type: SET_MODAL_NEW_CAT_SHOW, payload: show };
};

export const setModalEditCatShow = show => {
	return { type: SET_MODAL_EDIT_CAT_SHOW, payload: show };
};

export const setModalNewFlashShow = show => {
	return { type: SET_MODAL_NEW_FLASH_SHOW, payload: show };
};

export const setModalEditFlashShow = show => {
	return { type: SET_MODAL_EDIT_FLASH_SHOW, payload: show };
};

export const setModalDeleteCatShow = show => {
	return { type: SET_MODAL_DELETE_CAT_SHOW, payload: show };
};

export const setModalDeleteFlashShow = show => {
	return { type: SET_MODAL_DELETE_FLASH_SHOW, payload: show };
};

// TOASTS

export const setToastInfo = (text, color) => {
	return { type: SET_TOAST_INFO, payload: { text, color } };
};

export const setToastShow = show => {
	if (show) {
		return { type: SET_TOAST_SHOW, payload: { show, inc: 1 } };
	}
	return { type: SET_TOAST_SHOW, payload: { show, inc: 0 } };
};
