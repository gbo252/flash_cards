import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Textfit } from "react-textfit";
import * as actions from "../../actions";

import FlashCardList from "./FlashCardList";
import ButtonCircleAdd from "../generic/ButtonCircleAdd";
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
	form,
	setModalNewFlashShow
}) => {
	React.useEffect(() => {
		fetchFlashCards(category);
	}, [fetchFlashCards, category]);

	const { color } = categories.find(cat => cat.category === category);

	const renderContent = () => {
		if (!flashCards) {
			return (
				<div className="mt-5">
					<Spinner color={color} />
				</div>
			);
		} else if (flashCards.length > 0) {
			return (
				<React.Fragment>
					<div className="d-flex flex-wrap justify-content-center mt-2">
						<FlashCardList
							category={category}
							flashCards={flashCards}
							color={color}
						/>
					</div>
					<ButtonCircleAdd
						setModal={setModalNewFlashShow}
						info={{ category, color }}
					/>
				</React.Fragment>
			);
		} else if (rawFlashCards.length > 0) {
			return (
				<div className="mt-5 text-center">
					<p className="h4 mb-0 mx-3 font-weight-light">
						No Filtered Flash Cards Found
					</p>
				</div>
			);
		} else {
			return (
				<div className="mt-5 text-center">
					<p className="h4 mb-0 mx-3 font-weight-light">
						Click the button below to add a flash card!
					</p>
					<ButtonCircleAdd
						setModal={setModalNewFlashShow}
						info={{ category, color }}
					/>
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
			<div
				className="mb-4 mt-2 py-3 px-4 text-center rounded-pill align-self-center"
				style={{
					color,
					textShadow: "2px 2px 2px rgba(0, 0, 0, 0.8)",
					borderBottom: `10px solid ${color}`,
					backgroundColor: "rgb(248, 249, 250)",
					boxShadow:
						"2px 4px 7px 2px rgba(146, 146, 146, 0.7), 0 0 10px 2px rgba(0, 0, 0, 0.3) inset",
					userSelect: "none",
					width: "95%"
				}}
			>
				<Textfit mode="single" max={50}>
					{category}
				</Textfit>
			</div>
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
