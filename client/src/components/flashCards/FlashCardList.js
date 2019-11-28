import "../../css/FlashCardList.css";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { CSSTransition } from "react-transition-group";

import FlashCardListLabel from "./FlashCardListLabel";

const FlashCardList = ({
	category,
	color,
	flashCards,
	flashCardsDelete,
	justDeleted,
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
				<div>
					<input
						{...input}
						id={input.name}
						className="flash-card-input custom-control-input"
						type="checkbox"
						onClick={e => e.currentTarget.blur()}
					/>
					<label
						className="mb-0 align-top"
						htmlFor={input.name}
						style={{ cursor: "pointer" }}
						onClick={e => {
							if (!flashCardsDelete) {
								e.preventDefault();
							}
						}}
					>
						<FlashCardListLabel
							flashCard={flashCard}
							flashCardsDelete={flashCardsDelete}
							category={category}
							color={color}
						/>
					</label>
				</div>
			);
		};

		return (
			<CSSTransition
				key={flashCard._id}
				in={!justDeleted.includes(flashCard._id)}
				timeout={500}
				classNames="opacity-transition"
				appear
			>
				<Field
					component={flashCardComponent}
					name={flashCard._id}
					type="checkbox"
				/>
			</CSSTransition>
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

const mapStateToProps = ({ flashCardsDelete, justDeleted }) => {
	return { flashCardsDelete, justDeleted };
};

export default reduxForm({
	form: "flashCardDelete"
})(connect(mapStateToProps)(FlashCardList));
