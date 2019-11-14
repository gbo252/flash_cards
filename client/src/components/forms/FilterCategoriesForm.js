import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";

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
		<form
			className="py-2 form-inline d-flex flex-column align-items-end"
			style={{ flex: "1 1 0px" }}
		>
			<Field component={FormField} name="filter" label="Filter:" />
		</form>
	);
};

const validate = formValues => {
	const errors = {};

	if (formValues.filter) {
		errors.filter = "filter ON";
	}

	return errors;
};

export default reduxForm({
	form: "categoriesFilter",
	validate
})(FilterCategoriesForm);
