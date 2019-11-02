import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import CategoryForm from "./CategoryForm";

const EditCategory = ({ fetchCategories, editCategory, history, match }) => {
	React.useEffect(() => {
		fetchCategories();
    }, [fetchCategories]);
    
    const category = match.params.category;

	const onSubmit = formValues => {
		editCategory(formValues, category, history);
	};

	return (
		<div>
			<CategoryForm onSubmit={onSubmit} initialValues={{ category: category }} buttonText="Edit Category" />
		</div>
	);
};

export default connect(
	null,
	actions
)(EditCategory);
