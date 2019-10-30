import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { newCategory } from "../actions";

let categoriesState = [];

const NewCategory = ({ handleSubmit, newCategory, history, categories }) => {
	categoriesState = categories;

	const renderError = ({ error, touched }) => {
		if (error && touched) {
			return (
				<div>
					<small className="form-text text-danger">{error}</small>
				</div>
			);
		}
	};

	const renderInput = ({ input, label, meta }) => {
		return (
			<div className="form-group">
				<label htmlFor={label}>{label}</label>
				<input
					id={label}
					className="form-control"
					{...input}
					autoComplete="off"
				/>
				{renderError(meta)}
			</div>
		);
	};

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
		{ newCategory }
	)(NewCategory)
);
