import axios from 'axios';

import { FETCH_USER, SET_IS_GUEST } from './types';

const hasStorage = () => {
  return false;
  // try {
  //   localStorage.setItem('test', 'test');
  //   localStorage.removeItem('test');
  //   return true;
  // } catch (e) {
  //   return false;
  // }
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setIsGuest = isGuest => {
  let payload;

  if (hasStorage()) {
    localStorage.setItem('isGuest', isGuest);
    payload = isGuest;
  } else {
    payload = 'error';
  }

  return { type: SET_IS_GUEST, payload };
};
