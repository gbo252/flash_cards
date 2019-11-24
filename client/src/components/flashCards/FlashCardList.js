import "../../css/FlashCardList.css";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const FlashCardList = ({ category, color, flashCards, deleteFlashCard }) => {
	const flashCardArray = flashCards.map(
		({ lastEdited, header, content, _id }) => {
			return (
				<div
					key={_id}
					className="scene my-2"
					onClick={e =>
						e.currentTarget.children[0].classList.toggle(
							"is-flipped"
						)
					}
				>
					<div className="flash-card-container">
						<div
							className="flash-card d-flex justify-content-center align-items-center rounded-lg p-2"
							style={{ backgroundColor: color }}
						>
							<p className="h4 text-center">{header}</p>
						</div>
						<div
							className="flash-card flash-card-back d-flex justify-content-center align-items-center rounded-lg p-2"
							style={{ backgroundColor: color }}
						>
							<p className="h6 text-center">{content}</p>
						</div>
					</div>
				</div>
			);
		}
	);

	const blankSpaces = () => {
		// let space = [];

		// for (let i = 0; i < 3; i++) {
		// 	space.push(
		// 		<div
		// 			key={i}
		// 			className="mx-3"
		// 			style={{ width: "15rem", height: "0" }}
		// 		></div>
		// 	);
		// }

		// return space;
		return [];
	};

	return [...flashCardArray, ...blankSpaces()];
};

export default connect(null, actions)(FlashCardList);
