import React from "react";
import FlashCardList from "./FlashCardList";
import { Link } from "react-router-dom";

const Category = ({ match }) => {
	return (
		<div>
			<FlashCardList category={match.params.category} />
			<Link
				to={`/dashboard/${match.params.category}/new`}
				className="btn-floating right btn-large waves-effect waves-light red"
			>
				<i className="material-icons">add</i>
			</Link>
		</div>
	);
};

export default Category;
