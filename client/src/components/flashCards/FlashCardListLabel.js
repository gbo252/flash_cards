import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const FlashCardListLabel = ({
	category,
	color,
	setModalInfo,
	setModalEditFlashShow,
	setModalDeleteFlashShow,
	flashCard: { lastEdited, dateCreated, header, content, _id },
	flashCardsDelete,
	setFlashCardsDelete
}) => {
	return (
		<div
			className="scene mx-0 mx-sm-3 my-2 my-sm-3"
			onClick={e => {
				if (!flashCardsDelete) {
					e.currentTarget.children[0].classList.toggle("is-flipped");
					e.preventDefault();
				}
			}}
		>
			<div className="flash-card-container text-center text-wrap text-break">
				<div
					className={
						"flash-card p-2" +
						(flashCardsDelete ? " flash-cards-delete" : "")
					}
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
									setFlashCardsDelete(false);
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
									setFlashCardsDelete(false);
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
									{new Date(lastEdited).toLocaleDateString(
										"en-GB"
									)}
								</small>
								<small className="d-block text-muted">
									{"Date Created: "}
									{new Date(dateCreated).toLocaleDateString(
										"en-GB"
									)}
								</small>
							</span>
						</div>
					</div>
					<div
						className="h-100 mx-auto d-flex justify-content-center align-items-center"
						style={{ width: "85%" }}
					>
						<p
							className={
								"flash-header h5 mb-0" +
								(flashCardsDelete ? " text-muted" : "")
							}
						>
							{header}
						</p>
					</div>
				</div>
				<div className="d-flex justify-content-center align-items-start flash-card flash-card-back overflow-auto p-2">
					<div
						className="d-flex flex-column align-items-center"
						style={{ margin: "auto 0" }}
					>
						<p className="h6 mb-0 p-2">{content}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, actions)(FlashCardListLabel);
