import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";

import FlashCardList from "./FlashCardList";
import Spinner from "../generic/Spinner";
import FilterForm, {
	filterArray
} from "../forms/FilterForm";

const Category = ({
	match: {
		params: { category }
	},
	fetchFlashCards,
	flashCards,
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
		} else {
			return <div className="h5 text-center">No Flash Cards</div>;
		}
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
				className="mb-3 mt-1 py-4 px-5 display-3 text-center rounded-pill align-self-center text-wrap text-break"
				style={{
					color,
					textShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)",
					borderBottom: `10px solid ${color}`,
					backgroundColor: "rgb(248, 249, 250)",
					boxShadow:
						"2px 4px 7px 2px rgba(146, 146, 146, 0.7), 0 0 10px 2px rgba(0, 0, 0, 0.3) inset"
				}}
			>
				{category}
			</h1>
			<FilterForm forms={form} />
			{renderContent()}
		</div>
	);
};

const mapStateToProps = ({ flashCards, categories, form }) => {
	return {
		flashCards: filterArray(flashCards, form, "header"),
		categories,
		form
	};
};

export default connect(mapStateToProps, actions)(Category);
