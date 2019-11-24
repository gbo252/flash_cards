import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";

export const filterCategories = (categories, form) => {
	const regexEscape = text => {
		// eslint-disable-next-line
		return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	};

	if (form && categories) {
		if (form.categoriesFilter) {
			if (form.categoriesFilter.values) {
				const { filter } = form.categoriesFilter.values;
				const regex = new RegExp(regexEscape(filter), "gi");
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

const FilterCategoriesForm = ({ forms }) => {
	const inputStyle = () => {
		if (forms.categoriesFilter) {
			if (forms.categoriesFilter.values) {
				return "#dc3545";
			}
		}
	};

	return (
		<form className="form-inline my-1">
			<Field
				component={FormField}
				style={inputStyle()}
				name="filter"
				label="Filter:"
			/>
		</form>
	);
};

export default reduxForm({
	form: "categoriesFilter"
})(FilterCategoriesForm);
