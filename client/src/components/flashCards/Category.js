import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";

import FlashCardList from "./FlashCardList";
import SortForm, { sortArray } from "../forms/SortForm";
import FilterForm, { filterArray } from "../forms/FilterForm";
import Spinner from "../generic/Spinner";

const Category = ({
	match: {
		params: { category }
	},
	fetchFlashCards,
	flashCards,
	rawFlashCards,
	categories,
	form
}) => {
	React.useEffect(() => {
		fetchFlashCards(category);
	}, [fetchFlashCards, category]);

	const { color } = categories.find(cat => cat.category === category);

	const renderContent = () => {
		if (!flashCards) {
			return <Spinner />;
		} else if (flashCards.length > 0) {
			return (
				<div className="d-flex flex-wrap justify-content-center mt-3">
					<FlashCardList
						category={category}
						flashCards={flashCards}
						color={color}
					/>
				</div>
			);
		} else if (rawFlashCards.length > 0) {
			return (
				<div className="h5 mt-4 text-center">
					No Filtered Flash Cards Found
				</div>
			);
		} else {
			return (
				<div className="h5 mt-4 text-center">
					No Flash Cards, Click Add Flash Card
				</div>
			);
		}
	};

	const sortByOptions = {
		"Alphabetic - ascending": "alphabetic-asc",
		"Alphabetic - descending": "alphabetic-desc",
		"Date Created - ascending": "date-created-asc",
		"Date Created - descending": "date-created-desc",
		"Last Updated - ascending": "last-updated-asc",
		"Last Updated - descending": "last-updated-desc"
	};

	return (
		<div className="main d-flex flex-column">
			<Link
				to="/"
				className="btn btn-outline-secondary rounded-pill align-self-start"
				role="button"
			>
				Back
			</Link>
			<h1
				className="mb-4 mt-1 py-3 py-md-4 px-3 px-md-5 display-4 text-center rounded-pill align-self-center text-wrap text-break"
				style={{
					color,
					textShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)",
					borderBottom: `10px solid ${color}`,
					backgroundColor: "rgb(248, 249, 250)",
					boxShadow:
						"2px 4px 7px 2px rgba(146, 146, 146, 0.7), 0 0 10px 2px rgba(0, 0, 0, 0.3) inset",
					userSelect: "none"
				}}
			>
				{category}
			</h1>
			<div className="d-flex flex-wrap justify-content-center justify-content-md-between">
				<SortForm
					name="flashCardSortBy"
					sortByOptions={sortByOptions}
				/>
				<FilterForm forms={form} />
			</div>
			{renderContent()}
		</div>
	);
};

const mapStateToProps = ({ flashCards, categories, form }) => {
	return {
		flashCards: sortArray(
			filterArray(flashCards, form, "header"),
			form,
			"header",
			"flashCardSortBy"
		),
		rawFlashCards: flashCards,
		categories,
		form
	};
};

export default connect(mapStateToProps, actions)(Category);
