import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import FlashCardList from "./FlashCardList";

const Category = ({ match, fetchFlashCards, flashCards }) => {
	const { category } = match.params;

	React.useEffect(() => {
		fetchFlashCards(category);
	}, [fetchFlashCards, category]);

	const renderButton = () => {
		if (flashCards) {
			return (
				<div className="d-flex justify-content-end">
					<Link
						to={`/categories/${category}/new-flash-card`}
						role="button"
						className="btn btn-warning rounded-pill"
					>
						Add Flash Card
					</Link>
				</div>
			);
		}
	};

	const renderContent = () => {
		if (!flashCards) {
			return (
				<div className="d-flex justify-content-center mt-5">
					<div className="spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
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
		<div className="mt-3">
			<h1 className="display-4 text-center">{category}</h1>
			<Link
				to="/"
				className="btn btn-info rounded-pill mb-3"
				role="button"
			>
				Back
			</Link>
			{renderContent()}
			{renderButton()}
		</div>
	);
};

const mapStateToProps = ({ flashCards }) => {
	return { flashCards };
};

export default connect(
	mapStateToProps,
	actions
)(Category);
