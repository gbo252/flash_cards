import axios from 'axios';

import { FETCH_USER, SET_IS_GUEST } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setIsGuest = isGuest => {
  localStorage.setItem('isGuest', isGuest);

  return { type: SET_IS_GUEST, payload: isGuest };
};
