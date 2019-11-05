import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import CategoryForm from "./CategoryForm";

const EditCategory = ({ editCategory, history, match }) => {
	const { category } = match.params;

	const onSubmit = formValues => {
		editCategory(formValues, category, history);
	};

	return (
		<div>
			<CategoryForm
				onSubmit={onSubmit}
				initialValues={{ category }}
				buttonText="Edit Category"
			/>
		</div>
	);
};

export default connect(
	null,
	actions
)(EditCategory);
