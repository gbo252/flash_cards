import axios from 'axios';

import {
  FETCH_FLASH_CARDS,
  CLEAR_FLASH_CARDS,
  SET_FLASH_CARDS_DELETE
} from './types';

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

export const deleteFlashCard = (
  idArrayToDelete,
  category
) => async dispatch => {
  const res = await axios.delete(`/flashcards/${category}`, {
    data: idArrayToDelete
  });

  dispatch({ type: FETCH_FLASH_CARDS, payload: res.data });
};

export const clearFlashCards = () => {
  return { type: CLEAR_FLASH_CARDS };
};

export const setFlashCardsDelete = set => {
  return { type: SET_FLASH_CARDS_DELETE, payload: set };
};
