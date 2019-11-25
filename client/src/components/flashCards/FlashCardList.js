import "../../css/FlashCardList.css";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const FlashCardList = ({
	category,
	color,
	flashCards,
	setModalInfo,
	setModalEditFlashShow,
	setModalDeleteFlashShow
}) => {
	const flashCardArray = flashCards.map(
		({ lastEdited, dateCreated, header, content, _id }) => {
			return (
				<div
					key={_id}
					className="scene m-3"
					onClick={e =>
						e.currentTarget.children[0].classList.toggle(
							"is-flipped"
						)
					}
				>
					<div className="flash-card-container text-center text-wrap text-break">
						<div
							className="flash-card rounded-lg p-2"
							style={{ backgroundColor: color }}
						>
							<div className="w-100 dropleft position-absolute">
								<button
									onClick={e => e.stopPropagation()}
									className="close pr-1"
									type="button"
									id="dropdownFlashButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="icon-size text-black-50 material-icons">
										more_vert
									</i>
								</button>
								<div
									className="dropdown-menu"
									aria-labelledby="dropdownFlashButton"
									onClick={e => e.stopPropagation()}
								>
									<button
										className="dropdown-item mr-5"
										type="button"
										onClick={e => {
											setModalInfo({
												_id,
												category,
												color,
												header,
												content
											});
											setModalEditFlashShow(true);
											e.currentTarget.blur();
											e.stopPropagation();
										}}
									>
										Edit Flash Card
									</button>
									<button
										className="dropdown-item mr-5"
										type="button"
										onClick={e => {
											setModalInfo({
												_id,
												category,
												color,
												flashCard: header
											});
											setModalDeleteFlashShow(true);
											e.currentTarget.blur();
											e.stopPropagation();
										}}
									>
										Delete Flash Card
									</button>
									<div className="dropdown-divider"></div>
									<span className="dropdown-item-text">
										<small className="d-block text-muted">
											{"Last Updated: "}
											{new Date(
												lastEdited
											).toLocaleDateString("en-GB")}
										</small>
										<small className="d-block text-muted">
											{"Date Created: "}
											{new Date(
												dateCreated
											).toLocaleDateString("en-GB")}
										</small>
									</span>
								</div>
							</div>
							<div
								className="h-100 mx-auto d-flex justify-content-center align-items-center"
								style={{ width: "85%" }}
							>
								<p className="h5 mb-0">{header}</p>
							</div>
						</div>
						<div className="d-flex justify-content-center align-items-start flash-card flash-card-back rounded-lg overflow-auto p-2">
							<div
								className="d-flex flex-column align-items-center"
								style={{ margin: "auto 0" }}
							>
								<p className="h6 mb-0">{content}</p>
							</div>
						</div>
					</div>
				</div>
			);
		}
	);

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

export default connect(null, actions)(FlashCardList);
