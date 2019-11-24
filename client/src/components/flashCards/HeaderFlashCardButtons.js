import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Path from "path-parser";
import * as actions from "../../actions";

const HeaderFlashCardButtons = ({
	categories,
	setModalInfo,
	setModalNewFlashShow,
	location
}) => {
	let color;
	const p = new Path("/categories/:category");
	const { category } = p.test(location.pathname);

	if (categories) {
		color = categories.find(cat => cat.category === category).color;
	}

	return (
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
	);
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default connect(
	mapStateToProps,
	actions
)(withRouter(HeaderFlashCardButtons));
