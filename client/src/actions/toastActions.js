import { SET_TOAST_INFO, SET_TOAST_SHOW } from './types';

export const setToastInfo = (text, color) => {
  return { type: SET_TOAST_INFO, payload: { text, color } };
};

export const setToastShow = show => {
  if (show) {
    return { type: SET_TOAST_SHOW, payload: { show, inc: 1 } };
  }
  return { type: SET_TOAST_SHOW, payload: { show, inc: 0 } };
};
