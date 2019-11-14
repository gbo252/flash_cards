import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";

export const filterCategories = (categories, form) => {
	if (form && categories) {
		if (form.categoriesFilter) {
			if (form.categoriesFilter.values) {
				const { filter } = form.categoriesFilter.values;
				const regex = new RegExp(filter, "gi");
				return categories.filter(({ category }) =>
					category.match(regex)
				);
			}
			return categories;
		}
		return null;
	}
	return null;
};

const FilterCategoriesForm = () => {
	return (
		<form className="form-inline d-flex flex-column align-items-lg-end">
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
