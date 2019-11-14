import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import { categories, categoriesDelete } from "./categoryReducer";
import flashCardReducer from "./flashCardReducer";
import {
	modalInfo,
	modalNewShow,
	modalEditShow,
	modalDeleteShow
} from "./modalReducer";
import { toastContent, toastShow } from "./toastReducer";
import { dotsMenuShow } from "./dotsMenuReducer";

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	categories,
	categoriesDelete,
	flashCards: flashCardReducer,
	modalInfo,
	modalNewShow,
	modalEditShow,
	modalDeleteShow,
	toastContent,
	toastShow,
	dotsMenuShow
});
