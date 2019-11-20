import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";

import FlashCardList from "./FlashCardList";
import Spinner from "../generic/Spinner";

const Category = ({
	match: {
		params: { category }
	},
	fetchFlashCards,
	flashCards,
	categories
}) => {
	React.useEffect(() => {
		fetchFlashCards(category);
	}, [fetchFlashCards, category]);

	const getColor = () => {
		return categories.find(cat => cat.category === category).color;
	};

	const renderButtons = () => {
		return (
			<React.Fragment>
				<Link
					to="/"
					className="btn btn-info rounded-pill"
					role="button"
				>
					Back
				</Link>
				<Link
					to={`/categories/${category}/new-flash-card`}
					role="button"
					className="btn btn-warning rounded-pill"
				>
					Add Flash Card
				</Link>
			</React.Fragment>
		);
	};

	const renderContent = () => {
		if (!flashCards) {
			return <Spinner />;
		} else if (flashCards.length > 0) {
			return (
				<div className="d-flex flex-wrap justify-content-center mb-4">
					<FlashCardList
						category={category}
						flashCards={flashCards}
					/>
				</div>
			);
		} else {
			return <div className="h5 text-center">No Flash Cards</div>;
		}
	};

	return (
		<div className="main d-flex flex-column">
			<h1
				className="mb-3 py-4 px-5 display-3 text-center rounded-pill align-self-center"
				style={{
					color: getColor(),
					textShadow: "3px 3px 2px rgba(0, 0, 0, 0.7)",
					borderBottom: `10px solid ${getColor()}`,
					boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.3) inset"
				}}
			>
				{category}
			</h1>
			<div className="d-flex justify-content-between">
				{renderButtons()}
			</div>
			{renderContent()}
		</div>
	);
};

const mapStateToProps = ({ flashCards, categories }) => {
	return { flashCards, categories };
};

export default connect(mapStateToProps, actions)(Category);
