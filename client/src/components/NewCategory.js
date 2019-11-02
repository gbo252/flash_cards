import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import CategoryForm from "./CategoryForm";

const NewCategory = ({ fetchCategories, newCategory, history }) => {
	React.useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const onSubmit = formValues => {
		newCategory(formValues, history);
	};

	return (
		<div>
			<CategoryForm onSubmit={onSubmit} buttonText="New Category" />
		</div>
	);
};

export default connect(
	null,
	actions
)(NewCategory);
