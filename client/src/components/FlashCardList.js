import React from "react";
import { connect } from "react-redux";
import { fetchFlashCards } from "../actions";

const FlashCardList = ({ categoryId, flashCards, fetchFlashCards }) => {
	React.useEffect(() => {
		fetchFlashCards(categoryId);
	}, [fetchFlashCards, categoryId]);

	return flashCards.map(({ lastEdited, header, content }) => {
		return (
			<div key={lastEdited}>
				<div className="card-panel z-depth-3 deep-orange lighten-5">
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
	{ fetchFlashCards }
)(FlashCardList);
