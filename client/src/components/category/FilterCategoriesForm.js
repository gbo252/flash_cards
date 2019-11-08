import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "../FormField";

export const filterCategories = (categories, form) => {
	if (!categories || !form) {
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
		<form className="form-inline">
			<Field
				component={FormField}
				name="filter"
				label="Filter Categories:"
			/>
		</form>
	);
};

export default reduxForm({
	form: "categoriesFilter"
})(FilterCategoriesForm);
