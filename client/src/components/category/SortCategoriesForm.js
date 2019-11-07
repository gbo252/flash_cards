import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form";

export const sortCategories = (categories, form) => {
	if (!categories || !form) {
		return null;
	}

	const { values } = form.categorySortBy;
	const sortBy = values.sortByMethod + "-" + values.direction;

	switch (sortBy) {
		case "alphabetic-asc":
			return _.sortBy(categories, ["category"]);
		case "alphabetic-desc":
			return _.sortBy(categories, ["category"]).reverse();
		case "total-cards-asc":
			return _.sortBy(categories, ["cardsTotal", "category"]);
		case "total-cards-desc":
			return _.chain(categories)
				.sortBy(["category"])
				.reverse()
				.sortBy(["cardsTotal"])
				.reverse()
				.value();
		case "date-created-asc":
			return categories;
		case "date-created-desc":
			return [...categories].reverse();
		case "last-updated-asc":
			return _.sortBy(categories, ["lastEdited"]);
		case "last-updated-desc":
			return _.sortBy(categories, ["lastEdited"]).reverse();
		default:
			return categories;
	}
};

const sortByOptions = {
	Alphabetic: "alphabetic",
	"Flash Card Total": "total-cards",
	"Date Created": "date-created",
	"Last Updated": "last-updated"
};

const SortCategoriesForm = () => {
	return (
		<form className="form-inline">
			<div className="form-group">
				<label htmlFor="sort-by-method">Sort By:</label>
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
			<div className="form-group">
				<label className="sr-only" htmlFor="direction" />
				<Field
					name="direction"
					id="direction"
					component="select"
					className="form-control mx-2"
				>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</Field>
			</div>
		</form>
	);
};

export default reduxForm({
	form: "categorySortBy",
	initialValues: { sortByMethod: "alphabetic", direction: "asc" },
	destroyOnUnmount: false
})(SortCategoriesForm);
