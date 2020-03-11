import {
  SET_MODAL_INFO,
  SET_MODAL_NEW_CAT_SHOW,
  SET_MODAL_EDIT_CAT_SHOW,
  SET_MODAL_NEW_FLASH_SHOW,
  SET_MODAL_EDIT_FLASH_SHOW,
  SET_MODAL_DELETE_CAT_SHOW,
  SET_MODAL_DELETE_FLASH_SHOW
} from './types';

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
