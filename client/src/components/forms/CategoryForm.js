import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { colors } from "../generic/colors";
import FormField, { FormErrorMessageTouched } from "./FormField";
import FormColorField from "./FormColorField";

const CategoryForm = ({ handleSubmit, onSubmit }) => {
	return (
		<form id="category-form" onSubmit={handleSubmit(onSubmit)}>
			<Field
				component={FormField}
				label="Category Name"
				name="category"
			/>
			<Field name="category" component={FormErrorMessageTouched} />
			<div className="color-group">
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
					<Field name="color" component={FormErrorMessageTouched} />
				</div>
			</div>
		</form>
	);
};

const validateCategory = (categories, category, initialValues) => {
	let categoryNames = categories.map(x => x.category.toLowerCase());

	if (initialValues) {
		const index = categoryNames.indexOf(
			initialValues.category.toLowerCase()
		);

		categoryNames.splice(index, 1);
	}

	if (categoryNames.includes(category.toLowerCase())) {
		return `There is already a category called ${category}`;
	}

	return null;
};

const validate = (formValues, { categories, initialValues }) => {
	const errors = {};

	if (categories) {
		errors.category = validateCategory(
			categories,
			formValues.category || "",
			initialValues
		);
	}

	if (formValues.category) {
		if (formValues.category.length > 18) {
			errors.category = "Category name must be 18 characters or less";
		}
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

export default connect(mapStateToProps)(
	reduxForm({
		form: "category",
		enableReinitialize: true,
		validate
	})(CategoryForm)
);
