import "../../css/FlashCardList.css";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import FlashCardListLabel from "./FlashCardListLabel";

const FlashCardList = ({
	category,
	color,
	flashCards,
	flashCardsDelete,
	reset
}) => {
	React.useEffect(() => {
		if (!flashCardsDelete) {
			reset("flashCardDelete");
		}
	}, [flashCardsDelete, reset]);

	const flashCardArray = flashCards.map(flashCard => {
		const flashCardComponent = ({ input }) => {
			return (
				<React.Fragment>
					<input
						{...input}
						id={input.name}
						className="custom-control-input"
						type="checkbox"
						onClick={e => e.currentTarget.blur()}
					/>
					<label htmlFor={input.name} style={{ cursor: "pointer" }}>
						<FlashCardListLabel
							flashCard={flashCard}
							flashCardsDelete={flashCardsDelete}
							category={category}
							color={color}
						/>
					</label>
				</React.Fragment>
			);
		};

		return (
			<React.Fragment key={flashCard._id}>
				<Field
					component={flashCardComponent}
					name={flashCard._id}
					type="checkbox"
				/>
			</React.Fragment>
		);
	});

	const blankSpaces = () => {
		let space = [];
		for (let i = 0; i < 2; i++) {
			space.push(
				<div
					key={i}
					className="mx-3"
					style={{ width: "330px", height: "0" }}
				></div>
			);
		}
		return space;
	};

	return [...flashCardArray, ...blankSpaces()];
};

const mapStateToProps = ({ flashCardsDelete }) => {
	return { flashCardsDelete };
};

export default reduxForm({
	form: "flashCardDelete"
})(connect(mapStateToProps)(FlashCardList));
