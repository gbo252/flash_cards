import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const FlashCardList = ({
	category,
	flashCards,
	fetchFlashCards,
	clearFlashCards,
	deleteFlashCard
}) => {
	React.useEffect(() => {
		fetchFlashCards(category);

		return () => {
			clearFlashCards();
		};
	}, [fetchFlashCards, clearFlashCards, category]);

	return flashCards.map(({ lastEdited, header, content, _id }) => {
		return (
			<div key={lastEdited}>
				<div className="card-panel z-depth-3 lime lighten-5">
					<button
						className="btn right deep-orange waves-effect waves-light"
						onClick={() => deleteFlashCard(_id, category)}
					>
						<i className="material-icons">close</i>
					</button>
					<h5 className="black-text">{header}</h5>
					<p className="black-text">{content}</p>
					<p className="black-text">
						Last Edited: {new Date(lastEdited).toLocaleDateString()}
					</p>
				</div>
			</div>
		);
	});
};

const mapStateToProps = ({ flashCards }) => {
	return { flashCards };
};

export default connect(
	mapStateToProps,
	actions
)(FlashCardList);
