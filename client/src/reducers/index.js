import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import flashCardReducer from "./flashCardReducer";

export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	categories: categoryReducer,
	flashCards: flashCardReducer
});
