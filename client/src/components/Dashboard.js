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
						to="/newCategory"
						role="button"
						className="btn btn-warning rounded-pill"
					>
						Add Category
					</Link>
				</div>
			);
		}
	};

	const renderContent = () => {
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

	const renderSort = () => {
		return (
			<form>
				<div className="form-row align-items-center">
					<div className="col-auto">
						<label htmlFor="sort-by">Sort By:</label>
						<Field
							name="sortBy"
							component="select"
							className="form-control"
							id="sort-by"
						>
							<option value="a-z">Alphabetic - ascending</option>
							<option value="z-a">Alphabetic - descending</option>
							<option value="total-asc">
								Flash Card Total - ascending
							</option>
							<option value="total-desc">
								Flash Card Total - descending
							</option>
							<option value="created-asc">
								Date Created - ascending
							</option>
							<option value="created-desc">
								Date Created - descending
							</option>
						</Field>
					</div>
				</div>
			</form>
		);
	};

	return (
		<div className="mt-3">
			<h1 className="display-4 text-center">Categories</h1>
			{renderSort()}
			{renderContent()}
			{renderButton()}
		</div>
	);
};

const sort = (categories, sortBy) => {
	if (!categories) {
		return null;
	}
	switch (sortBy) {
		case "a-z":
			return _.sortBy(categories, ["category"]);
		case "z-a":
			return _.sortBy(categories, ["category"]).reverse();
		case "total-asc":
			return _.sortBy(categories, [x => x.cards.length, "category"]);
		case "total-desc":
			return _.chain(categories)
				.sortBy(["category"])
				.reverse()
				.sortBy([x => x.cards.length])
				.reverse()
				.value();
		case "created-asc":
			return categories;
		case "created-desc":
			return [...categories].reverse();
		default:
			return categories;
	}
};

const mapStateToProps = ({ categories, form }) => {
	return { categories: sort(categories, form.categorySortBy.values.sortBy) };
};

export default reduxForm({
	form: "categorySortBy",
	initialValues: { sortBy: "a-z" },
	destroyOnUnmount: false
})(
	connect(
		mapStateToProps,
		actions
	)(Dashboard)
);
