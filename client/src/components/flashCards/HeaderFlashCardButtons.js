import React from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import * as actions from "../../actions";

const HeaderFlashCardButtons = ({
	categories,
	flashCards,
	form,
	flashCardsDelete,
	setFlashCardsDelete,
	setModalInfo,
	setModalNewFlashShow,
	setModalDeleteFlashShow
}) => {
	let color;
	let total = 0;
	const atts = {};

	const { category } = useRouteMatch("/categories/:category").params;
	if (categories) {
		color = categories.find(cat => cat.category === category).color;
	}

	if (form.flashCardDelete && flashCardsDelete) {
		if (form.flashCardDelete.values) {
			const { values } = form.flashCardDelete;
			const checked = Object.keys(values).some(id => values[id]);
			total = Object.keys(values).filter(id => values[id]).length;
			if (!checked) {
				atts.disabled = true;
			}
		} else {
			atts.disabled = true;
		}
	}

	const deleteSelected = () => {
		const { values } = form.flashCardDelete;
		const flashIdArray = Object.keys(values).filter(id => values[id]);
		const flashCardHeaders = flashIdArray.map(id => {
			return flashCards.find(card => card._id === id).header;
		});
		setModalInfo({ flashCardHeaders, flashIdArray, category, color });
		setModalDeleteFlashShow(true);
	};

	return (
		<React.Fragment>
			<button
				{...atts}
				data-toggle="collapse"
				data-target="#header-bar"
				className={
					"btn rounded-pill align-self-center m-1 " +
					(flashCardsDelete
						? "btn-outline-danger"
						: "btn-outline-success")
				}
				onClick={e => {
					if (!flashCardsDelete) {
						setModalInfo({ category, color });
						setModalNewFlashShow(true);
					} else {
						deleteSelected();
					}
					e.currentTarget.blur();
				}}
			>
				{flashCardsDelete ? "Delete Selected" : "Add Flash Card"}
			</button>
			<button
				className="btn btn-outline-info align-self-center rounded-pill m-1"
				onClick={e => {
					setFlashCardsDelete(!flashCardsDelete);
					e.currentTarget.blur();
				}}
			>
				{flashCardsDelete ? `Deselect ${total} Cards` : "Select Cards"}
			</button>
		</React.Fragment>
	);
};

const mapStateToProps = ({
	categories,
	flashCards,
	form,
	flashCardsDelete
}) => {
	return { categories, flashCards, form, flashCardsDelete };
};

export default connect(mapStateToProps, actions)(HeaderFlashCardButtons);
