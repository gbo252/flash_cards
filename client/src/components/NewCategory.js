import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

let categoriesState = [];

const renderInput = ({ input, label, meta: { error, touched } }) => {
	return (
		<div className="form-group">
			<label htmlFor={label}>{label}</label>
			<input
				id={label}
				className="form-control"
				{...input}
				autoComplete="off"
			/>
			<small className="form-text text-danger">{touched && error}</small>
		</div>
	);
};

const NewCategory = ({
	handleSubmit,
	fetchCategories,
	newCategory,
	history,
	categories
}) => {
	React.useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	categoriesState = categories;

	return (
		<form
			onSubmit={handleSubmit(formValues =>
				newCategory(formValues, history)
			)}
			style={{ marginTop: "40px" }}
		>
			<Field
				component={renderInput}
				label="Category Name"
				name="category"
			/>
			<button type="submit" className="btn btn-success">
				New Category
			</button>
		</form>
	);
};

const validateCategory = category => {
	const categoryNames = categoriesState.map(x => x.category.toLowerCase());

	if (categoryNames.includes(category.toLowerCase())) {
		return `There is already a category called ${category}`;
	}

	return null;
};

const validate = formValues => {
	const errors = {};

	errors.category = validateCategory(formValues.category || "");

	if (!formValues.category) {
		errors.category = "You must enter a category name";
	}

	return errors;
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default reduxForm({
	form: "category",
	validate
})(
	connect(
		mapStateToProps,
		actions
	)(NewCategory)
);
