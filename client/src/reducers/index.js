import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import { authReducer, isGuest } from './authReducer';
import { categories, categoriesDelete, justDeleted } from './categoryReducer';
import { flashCards, flashCardsDelete } from './flashCardReducer';
import {
  modalInfo,
  modalNewCatShow,
  modalEditCatShow,
  modalNewFlashShow,
  modalEditFlashShow,
  modalDeleteCatShow,
  modalDeleteFlashShow
} from './modalReducer';
import { toastInfo, toastShow } from './toastReducer';

export default combineReducers({
  auth: authReducer,
  isGuest,
  form: reduxForm,
  categories,
  categoriesDelete,
  justDeleted,
  flashCards,
  flashCardsDelete,
  modalInfo,
  modalNewCatShow,
  modalEditCatShow,
  modalNewFlashShow,
  modalEditFlashShow,
  modalDeleteCatShow,
  modalDeleteFlashShow,
  toastInfo,
  toastShow
});
