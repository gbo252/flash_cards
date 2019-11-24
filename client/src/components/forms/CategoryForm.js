import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { colors } from "../generic/colors";
import FormField, { FormErrorMessageTouched } from "./FormField";
import FormColorField from "./FormColorField";
import validateDuplicates from "./validateDuplicates";

const CategoryForm = ({ handleSubmit, onSubmit }) => {
	return (
		<form id="category-form" onSubmit={handleSubmit(onSubmit)}>
			<Field
				component={FormField}
				label="Category Name"
				name="category"
			/>
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

const validate = (formValues, { categories, initialValues }) => {
	const errors = {};

	if (categories) {
		errors.category = validateDuplicates(
			categories,
			formValues.category || "",
			initialValues,
			"category"
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
