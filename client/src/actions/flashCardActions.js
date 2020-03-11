import axios from 'axios';

import {
  FETCH_FLASH_CARDS,
  CLEAR_FLASH_CARDS,
  SET_FLASH_CARDS_DELETE
} from './types';

export const fetchFlashCards = category => async (dispatch, getState) => {
  let payload;

  if (getState().auth) {
    const res = await axios.get(`/flashcards/${category}`);
    payload = res.data;
  } else {
    const categories = JSON.parse(localStorage.getItem('categories'));
    payload = categories.find(obj => obj.category === category).cards;
  }

  dispatch({ type: FETCH_FLASH_CARDS, payload });
};

export const newFlashCard = (formValues, category) => async (
  dispatch,
  getState
) => {
  let payload;

  if (getState().auth) {
    const res = await axios.post(`/flashcards/${category}`, formValues);
    payload = res.data;
  } else {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const index = categories.findIndex(obj => obj.category === category);
    const newCard = {
      _id: 'FC' + Date.now().toString(),
      header: formValues.header,
      content: formValues.content,
      lastEdited: new Date().toISOString(),
      dateCreated: new Date().toISOString()
    };
    categories[index].cards.push(newCard);
    categories[index].lastEdited = new Date().toISOString();
    categories[index].cardsTotal = categories[index].cards.length;
    localStorage.setItem('categories', JSON.stringify(categories));
    payload = categories[index].cards;
  }

  dispatch({ type: FETCH_FLASH_CARDS, payload });
};

export const editFlashCard = (formValues, category, id) => async (
  dispatch,
  getState
) => {
  let payload;

  if (getState().auth) {
    const res = await axios.patch(
      `/flashcards/${category}/edit/${id}`,
      formValues
    );
    payload = res.data;
  } else {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const categoryIndex = categories.findIndex(
      obj => obj.category === category
    );
    const categoryObj = categories[categoryIndex];
    const flashCardIndex = categoryObj.cards.findIndex(obj => obj._id === id);
    const updatedFlashCard = {
      ...categoryObj.cards[flashCardIndex],
      ...formValues,
      lastEdited: new Date().toISOString()
    };
    categoryObj.lastEdited = new Date().toISOString();
    categoryObj.cards[flashCardIndex] = updatedFlashCard;
    localStorage.setItem('categories', JSON.stringify(categories));
    payload = categoryObj.cards;
  }

  dispatch({ type: FETCH_FLASH_CARDS, payload });
};

export const deleteFlashCard = (idArrayToDelete, category) => async (
  dispatch,
  getState
) => {
  let payload;

  if (getState().auth) {
    const res = await axios.delete(`/flashcards/${category}`, {
      data: idArrayToDelete
    });
    payload = res.data;
  } else {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const index = categories.findIndex(obj => obj.category === category);
    const categoryObj = categories[index];
    const updatedCards = categoryObj.cards.filter(obj => {
      return !idArrayToDelete.includes(obj._id);
    });
    categoryObj.cards = updatedCards;
    categoryObj.lastEdited = new Date().toISOString();
    localStorage.setItem('categories', JSON.stringify(categories));
    payload = categoryObj.cards;
  }

  dispatch({ type: FETCH_FLASH_CARDS, payload });
};

export const clearFlashCards = () => {
  return { type: CLEAR_FLASH_CARDS };
};

export const setFlashCardsDelete = set => {
  return { type: SET_FLASH_CARDS_DELETE, payload: set };
};
