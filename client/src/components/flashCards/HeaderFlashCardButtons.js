import React from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import * as actions from "../../actions";

const HeaderFlashCardButtons = ({
	categories,
	setModalInfo,
	setModalNewFlashShow
}) => {
	let color;
	const { category } = useRouteMatch("/categories/:category").params;

	if (categories) {
		color = categories.find(cat => cat.category === category).color;
	}

	return (
		<React.Fragment>
			<button
				className="btn btn-outline-success rounded-pill align-self-center m-1"
				onClick={e => {
					setModalInfo({ category, color });
					setModalNewFlashShow(true);
					e.currentTarget.blur();
				}}
			>
				Add Flash Card
			</button>
		</React.Fragment>
	);
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default connect(mapStateToProps, actions)(HeaderFlashCardButtons);
