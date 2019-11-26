import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import CategoryList from "./CategoryList";
import SortForm, { sortArray } from "../forms/SortForm";
import FilterForm, { filterArray } from "../forms/FilterForm";
import Spinner from "../generic/Spinner";
import { colors } from "../generic/colors";

const Dashboard = ({
	fetchCategories,
	clearFlashCards,
	categories,
	rawCategories,
	form,
	setFlashCardsDelete
}) => {
	React.useEffect(() => {
		fetchCategories();
		clearFlashCards();
		setFlashCardsDelete(false);
	}, [fetchCategories, clearFlashCards, setFlashCardsDelete]);

	const [shuffledColors, setShuffledColors] = React.useState([]);

	React.useEffect(() => {
		setShuffledColors(_.shuffle(colors));
	}, []);

	const renderSquares = () => {
		return shuffledColors.map(color => {
			return (
				<div
					key={color}
					className="mx-2"
					style={{
						width: "2rem",
						height: "2rem",
						borderRadius: "5px",
						backgroundColor: color
					}}
				/>
			);
		});
	};

	const renderCategories = () => {
		if (!categories) {
			return <Spinner />;
		} else if (categories.length > 0) {
			return <CategoryList categories={categories} />;
		} else if (rawCategories.length > 0) {
			return (
				<div className="h5 mt-4 text-center">
					No Filtered Categories Found
				</div>
			);
		} else {
			return (
				<div className="h5 mt-4 text-center">
					No Categories, Click Add Category
				</div>
			);
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

	return (
		<div className="main d-flex flex-column">
			<h1 className="display-3 text-center mt-1 mt-sm-2 mt-md-3 mt-lg-4 mb-0">
				Flash Cards Online
			</h1>
			<p className="h4 mb-2 font-weight-light text-center">
				A simple online flash card maker!
			</p>
			<div className="d-flex justify-content-center mb-2">
				{renderSquares()}
			</div>
			<div className="d-flex flex-wrap justify-content-center justify-content-md-between">
				<SortForm name="categorySortBy" sortByOptions={sortByOptions} />
				<FilterForm forms={form} />
			</div>
			<div className="mt-lg-2">{renderCategories()}</div>
		</div>
	);
};

const mapStateToProps = ({ categories, form }) => {
	return {
		categories: sortArray(
			filterArray(categories, form, "category"),
			form,
			"category",
			"categorySortBy"
		),
		rawCategories: categories,
		form
	};
};

export default connect(mapStateToProps, actions)(Dashboard);
