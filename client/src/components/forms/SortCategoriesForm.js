import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form";

export const sortCategories = (categories, form) => {
	if (!categories || !form) {
		return null;
	}

	switch (form.categorySortBy.values.sortByMethod) {
		case "alphabetic-asc":
			return _.orderBy(
				categories,
				[category => category.category.toLowerCase()],
				["asc"]
			);
		case "alphabetic-desc":
			return _.orderBy(
				categories,
				[category => category.category.toLowerCase()],
				["desc"]
			);
		case "total-cards-asc":
			return _.orderBy(
				categories,
				["cardsTotal", category => category.category.toLowerCase()],
				["asc", "asc"]
			);
		case "total-cards-desc":
			return _.orderBy(
				categories,
				["cardsTotal", category => category.category.toLowerCase()],
				["desc", "asc"]
			);
		case "date-created-asc":
			return _.orderBy(categories, ["dateCreated"], ["asc"]);
		case "date-created-desc":
			return _.orderBy(categories, ["dateCreated"], ["desc"]);
		case "last-updated-asc":
			return _.orderBy(categories, ["lastEdited"], ["asc"]);
		case "last-updated-desc":
			return _.orderBy(categories, ["lastEdited"], ["desc"]);
		default:
			return categories;
	}
};

const sortByOptions = {
	"Alphabetic - ascending": "alphabetic-asc",
	"Alphabetic - descending": "alphabetic-desc",
	"Flash Card Total - ascending": "total-cards-asc",
	"Flash Card Total - descending": "total-cards-desc",
	"Date Created - ascending": "date-created-asc",
	"Date Created - descending": "date-created-desc",
	"Last Updated - ascending": "last-updated-asc",
	"Last Updated - descending": "last-updated-desc"
};

const SortCategoriesForm = () => {
	return (
		<form className="form-inline my-1">
			<div className="form-group">
				<label htmlFor="sort-by-method">Sort:</label>
				<Field
					name="sortByMethod"
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
	form: "categorySortBy",
	initialValues: { sortByMethod: "alphabetic-asc" },
	destroyOnUnmount: false
})(SortCategoriesForm);
