import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField, { FormErrorMessage } from "./FormField";

export const filterCategories = (categories, form) => {
	if (!categories || !form) {
		return null;
	}

	if (!form.categoriesFilter) {
		return null;
	}

	if (!form.categoriesFilter.values) {
		return categories;
	}

	const { filter } = form.categoriesFilter.values;
	const regex = new RegExp(filter, "gi");
	return categories.filter(({ category }) => category.match(regex));
};

const FilterCategoriesForm = () => {
	return (
		<div>
			<form className="form-inline">
				<Field component={FormField} name="filter" label="Filter:" />
			</form>
			<Field name="filter" component={FormErrorMessage} />
		</div>
	);
};

const validate = formValues => {
	const errors = {};

	if (formValues.filter) {
		errors.filter = "FILTER: ON";
	}

	return errors;
};

export default reduxForm({
	form: "categoriesFilter",
	validate
})(FilterCategoriesForm);
