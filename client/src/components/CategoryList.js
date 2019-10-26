import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../actions";

const CategoryList = ({ categories, fetchCategories }) => {
	React.useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return categories.map(({ category, _id, lastEdited }) => {
		return (
			<Link to={`/dashboard/${_id}`} key={_id}>
				<div className="card-panel z-depth-3 deep-orange lighten-5">
					<h5 className="black-text">{category}</h5>
					<p className="black-text">
						Last Edited:{" "}
						{new Date(lastEdited).toLocaleDateString()}
					</p>
				</div>
			</Link>
		);
	});
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default connect(
	mapStateToProps,
	{ fetchCategories }
)(CategoryList);
