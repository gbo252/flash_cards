import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form";

export const sortArray = (array, form, sortBy, formName) => {
	if (!array || !form) {
		return null;
	}

	switch (form.sortArrayForm.values[formName]) {
		case "alphabetic-asc":
			return _.orderBy(
				array,
				[obj => obj[sortBy].toLowerCase()],
				["asc"]
			);
		case "alphabetic-desc":
			return _.orderBy(
				array,
				[obj => obj[sortBy].toLowerCase()],
				["desc"]
			);
		case "total-cards-asc":
			return _.orderBy(
				array,
				["cardsTotal", obj => obj[sortBy].toLowerCase()],
				["asc", "asc"]
			);
		case "total-cards-desc":
			return _.orderBy(
				array,
				["cardsTotal", obj => obj[sortBy].toLowerCase()],
				["desc", "asc"]
			);
		case "date-created-asc":
			return _.orderBy(array, ["dateCreated"], ["asc"]);
		case "date-created-desc":
			return _.orderBy(array, ["dateCreated"], ["desc"]);
		case "last-updated-asc":
			return _.orderBy(array, ["lastEdited"], ["asc"]);
		case "last-updated-desc":
			return _.orderBy(array, ["lastEdited"], ["desc"]);
		default:
			return array;
	}
};

const SortForm = ({ name, sortByOptions }) => {
	return (
		<form className="form-inline my-1">
			<div className="form-group">
				<label htmlFor="sort-by-method">Sort:</label>
				<Field
					name={name}
					id="sort-by-method"
					component="select"
					className="form-control mx-2"
				>
					{Object.keys(sortByOptions).map(sortByOption => {
						let sortByOptionValue = sortByOptions[sortByOption];
						return (
							<option
								key={sortByOptionValue}
								value={sortByOptionValue}
							>
								{sortByOption}
							</option>
						);
					})}
				</Field>
			</div>
		</form>
	);
};

export default reduxForm({
	form: "sortArrayForm",
	initialValues: {
		categorySortBy: "alphabetic-asc",
		flashCardSortBy: "alphabetic-asc"
	},
	destroyOnUnmount: false
})(SortForm);
