import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const FlashCardList = ({ category, flashCards, deleteFlashCard }) => {
	const flashCardArray = flashCards.map(
		({ lastEdited, header, content, _id }) => {
			return (
				<div
					key={_id}
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
							{new Date(lastEdited).toLocaleDateString("en-GB")}
						</small>
					</div>
				</div>
			);
		}
	);

	const blankSpaces = () => {
		let space = [];

		for (let i = 0; i < 3; i++) {
			space.push(
				<div
					key={i}
					className="mx-3"
					style={{ width: "15rem", height: "0" }}
				></div>
			);
		}

		return space;
	};

	return [...flashCardArray, ...blankSpaces()];
};

export default connect(
	null,
	actions
)(FlashCardList);
