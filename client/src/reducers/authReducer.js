import { FETCH_USER, SET_IS_GUEST } from '../actions/types';

export const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

let localIsGuest;
try {
  localIsGuest = localStorage.getItem('isGuest') || 'false';
} catch (error) {
  localIsGuest = 'error';
}


export const isGuest = (state = localIsGuest, action) => {
  switch (action.type) {
    case SET_IS_GUEST:
      return action.payload;
    default:
      return state;
  }
};
