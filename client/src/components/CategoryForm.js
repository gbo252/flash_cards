import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";
import FormColorField from "./FormColorField";

let categoriesState = [];

const ErrorMessage = ({ meta: { error, touched } }) => {
	return <small className="form-text text-danger">{touched && error}</small>;
};

const CategoryForm = ({ handleSubmit, onSubmit, categories }) => {
	categoriesState = categories;

	const colors = [
		"rgba(255, 157, 157, 0.8)",
		"rgba(244, 239, 137, 0.8)",
		"rgba(157, 203, 255, 0.8)",
		"rgba(169, 255, 157, 0.8)",
		"rgba(255, 157, 239, 0.8)",
		"rgba(255, 204, 157, 0.8)",
		"rgba(183, 157, 255, 0.8)"
	];

	return (
		<form
			id="category-form"
			onSubmit={handleSubmit(onSubmit)}
			style={{ marginTop: "40px" }}
		>
			<Field
				component={FormField}
				label="Category Name"
				name="category"
			/>
			<div className="color-group mb-3">
				<label>Colour</label>
				<div>
					{colors.map(color => (
						<Field
							key={color}
							component={FormColorField}
							value={color}
							name="color"
							type="radio"
						/>
					))}
					<Field name="color" component={ErrorMessage} />
				</div>
			</div>
		</form>
	);
};

const validateCategory = (category, initialValues) => {
	let categoryNames = categoriesState.map(x => x.category.toLowerCase());

	if (initialValues) {
		const index = categoryNames.indexOf(
			initialValues.category.toLowerCase()
		);

		categoryNames.splice(index, 1);

		if (categoryNames.includes(category.toLowerCase())) {
			return `There is already a category called ${category}`;
		}
	}

	if (categoryNames.includes(category.toLowerCase())) {
		return `There is already a category called ${category}`;
	}

	return null;
};

const validate = (formValues, props) => {
	const errors = {};

	if (categoriesState) {
		errors.category = validateCategory(
			formValues.category || "",
			props.initialValues
		);
	}

	if (!formValues.category) {
		errors.category = "You must enter a category name";
	}

	if (!formValues.color) {
		errors.color = "Please select a color";
	}

	return errors;
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default reduxForm({
	form: "category",
	enableReinitialize: true,
	validate
})(connect(mapStateToProps)(CategoryForm));
