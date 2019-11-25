import React from "react";
import { reduxForm, Field } from "redux-form";
import FormField from "./FormField";

export const filterArray = (array, form, filterBy) => {
	const regexEscape = text => {
		// eslint-disable-next-line
		return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	};

	if (form && array) {
		if (form.filterArrayForm) {
			if (form.filterArrayForm.values) {
				const { filter } = form.filterArrayForm.values;
				const regex = new RegExp(regexEscape(filter), "gi");
				if (filterBy === "header") {
					return array.filter(
						obj =>
							obj.header.match(regex) || obj.content.match(regex)
					);
				}
				return array.filter(obj => obj.category.match(regex));
			}
			return array;
		}
		return null;
	}
	return null;
};

const FilterForm = ({ forms }) => {
	const inputStyle = () => {
		if (forms.filterArrayForm) {
			if (forms.filterArrayForm.values) {
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
	form: "filterArrayForm"
})(FilterForm);
