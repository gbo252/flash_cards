import axios from 'axios';

import {
  FETCH_CATEGORIES,
  NEW_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORIES_DELETE,
  SET_JUST_DELETED
} from './types';

export const fetchCategories = () => async (dispatch, getState) => {
  let payload;

  if (getState().auth) {
    const res = await axios.get('/category-routes');
    payload = res.data;
  } else {
    let categories = localStorage.getItem('categories');
    categories = categories ? JSON.parse(categories) : [];
    payload = categories;
  }

  dispatch({ type: FETCH_CATEGORIES, payload });
};

export const newCategory = formValues => async (dispatch, getState) => {
  let payload;

  if (getState().auth) {
    const res = await axios.post('/category-routes', formValues);
    payload = { ...res.data, cardsTotal: 0 };
  } else {
    let categories = localStorage.getItem('categories');
    categories = categories ? JSON.parse(categories) : [];
    const categoryObj = {
      _id: 'FC' + Date.now().toString(),
      category: formValues.category,
      color: formValues.color,
      lastEdited: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
      cards: [],
      cardsTotal: 0
    };
    categories.push(categoryObj);
    localStorage.setItem('categories', JSON.stringify(categories));
    payload = categoryObj;
  }

  dispatch({ type: NEW_CATEGORY, payload });
};

export const editCategory = (formValues, category) => async (
  dispatch,
  getState
) => {
  let payload;

  if (getState().auth) {
    const res = await axios.patch(
      `/category-routes/edit/${category}`,
      formValues
    );
    payload = res.data[0];
  } else {
    const categories = JSON.parse(localStorage.getItem('categories'));

    const updatedCategories = categories.map(obj => {
      if (obj.category !== category) {
        return obj;
      }
      const updatedCategory = {
        ...obj,
        ...formValues,
        lastEdited: new Date().toISOString()
      };
      payload = updatedCategory;
      return updatedCategory;
    });

    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  }

  dispatch({ type: EDIT_CATEGORY, payload });
};

export const deleteCategories = idArrayToDelete => async (
  dispatch,
  getState
) => {
  let payload;

  if (getState().auth) {
    const res = await axios.delete('/category-routes/delete', {
      data: idArrayToDelete
    });
    payload = res.data;
  } else {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const updatedCategories = categories.filter(obj => {
      return !idArrayToDelete.includes(obj._id);
    });

    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    payload = idArrayToDelete;
  }

  dispatch({ type: DELETE_CATEGORY, payload });
};

export const setCategoriesDelete = set => {
  return { type: SET_CATEGORIES_DELETE, payload: set };
};

export const setJustDeleted = idArray => {
  return { type: SET_JUST_DELETED, payload: idArray };
};
