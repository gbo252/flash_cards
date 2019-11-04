import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import FlashCardList from "./FlashCardList";
import checkCategory from "../utils/checkCategory";

const Category = ({
	match,
	categories,
	fetchCategories,
	fetchFlashCards,
	flashCards,
	history
}) => {
	const { category } = match.params;

	React.useEffect(() => {
		checkCategory(
			fetchCategories,
			categories,
			category,
			history,
			fetchFlashCards
		);
	}, [fetchFlashCards, fetchCategories, categories, category, history]);

	const renderButton = () => {
		if (flashCards) {
			return (
				<div className="d-flex justify-content-end">
					<Link
						to={`/dashboard/${category}/new`}
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
			<h1 className="display-4 text-center">
				{category}
				<span>
					<Link
						to={`/edit/${category}`}
						className="btn btn-danger rounded-pill mb-3"
						role="button"
					>
						Edit
					</Link>
				</span>
			</h1>
			<Link
				to="/dashboard"
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

const mapStateToProps = ({ categories, flashCards }) => {
	return { categories, flashCards };
};

export default connect(
	mapStateToProps,
	actions
)(Category);
