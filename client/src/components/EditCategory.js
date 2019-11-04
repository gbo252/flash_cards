import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import CategoryForm from "./CategoryForm";
import checkCategory from "../utils/checkCategory";

const EditCategory = ({
	fetchCategories,
	editCategory,
	history,
	match,
	categories
}) => {
	const { category } = match.params;

	React.useEffect(() => {
		checkCategory(fetchCategories, categories, category, history);
	}, [fetchCategories, categories, category, history]);

	const onSubmit = formValues => {
		editCategory(formValues, category, history);
	};

	return (
		<div>
			<CategoryForm
				onSubmit={onSubmit}
				initialValues={{ category: category }}
				buttonText="Edit Category"
			/>
		</div>
	);
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default connect(
	mapStateToProps,
	actions
)(EditCategory);
