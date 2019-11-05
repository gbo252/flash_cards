import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import CategoryList from "./CategoryList";

const Dashboard = ({ fetchCategories, clearFlashCards, categories }) => {
	React.useEffect(() => {
		fetchCategories();
		clearFlashCards();
	}, [fetchCategories, clearFlashCards]);

	const renderButton = () => {
		if (categories) {
			return (
				<div className="d-flex justify-content-end">
					<Link
						to="/new-category"
						role="button"
						className="btn btn-warning rounded-pill"
					>
						Add Category
					</Link>
				</div>
			);
		}
	};

	const renderCategories = () => {
		if (!categories) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else if (categories.length > 0) {
			return (
				<div className="d-flex flex-wrap justify-content-center my-4">
					<CategoryList categories={categories} />
				</div>
			);
		} else {
			return <div className="h5 text-center">No Categories</div>;
		}
	};

	const renderSortOptions = () => {
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
						<option value="alphabetic">Alphabetic</option>
						<option value="total-cards">Flash Card Total</option>
						<option value="date-created">Date Created</option>
						<option value="last-updated">Last Updated</option>
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

	return (
		<div className="mt-3">
			<h1 className="display-4 text-center">Categories</h1>
			{renderSortOptions()}
			{renderCategories()}
			{renderButton()}
		</div>
	);
};

const sort = (categories, formValues) => {
	if (!categories) {
		return null;
	}

	const sortBy = formValues.sortByMethod + "-" + formValues.direction;

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

const mapStateToProps = ({ categories, form }) => {
	return { categories: sort(categories, form.categorySortBy.values) };
};

export default reduxForm({
	form: "categorySortBy",
	initialValues: { sortByMethod: "alphabetic", direction: "asc" },
	destroyOnUnmount: false
})(
	connect(
		mapStateToProps,
		actions
	)(Dashboard)
);
