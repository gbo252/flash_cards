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

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	categories,
	categoriesDelete,
	flashCards: flashCardReducer,
	modalInfo,
	modalNewShow,
	modalEditShow,
	modalDeleteShow
});
