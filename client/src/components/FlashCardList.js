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
			<div
				key={lastEdited}
				className="card border-success shadow m-3"
				style={{ width: "15rem" }}
			>
				<div className="card-header">
					<div className="d-flex flex-column mr-n3 mt-n2">
						<button
							className="btn btn-danger py-0 px-1 align-self-end"
							onClick={() => deleteFlashCard(_id, category)}
						>
							X
						</button>
					</div>
					<h5>{header}</h5>
				</div>
				<div className="card-body">
					<p className="card-text">{content}</p>
				</div>
				<div className="card-footer">
					<small className="text-muted">
						Last Updated:{" "}
						{new Date(lastEdited).toLocaleDateString()}
					</small>
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
