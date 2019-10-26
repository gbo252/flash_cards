import { combineReducers } from "redux";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import flashCardReducer from "./flashCardReducer";

export default combineReducers({
	auth: authReducer,
	categories: categoryReducer,
	flashCards: flashCardReducer
});
