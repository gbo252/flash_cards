import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, deleteCategory } from "../actions";

const CategoryList = ({ categories, fetchCategories, deleteCategory }) => {
	React.useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return categories.map(({ category, lastEdited, _id }) => {
		return (
			<div key={category}>
				<button
					className="btn right deep-orange waves-effect waves-light"
					onClick={() => deleteCategory(_id)}
				>
					<i className="material-icons">close</i>
				</button>
				<Link to={`/dashboard/${category}`}>
					<div className="card-panel z-depth-3 deep-orange lighten-5">
						<h5 className="black-text">{category}</h5>
						<p className="black-text">
							Last Edited:{" "}
							{new Date(lastEdited).toLocaleDateString()}
						</p>
					</div>
				</Link>
			</div>
		);
	});
};

const mapStateToProps = ({ categories }) => {
	return { categories };
};

export default connect(
	mapStateToProps,
	{ fetchCategories, deleteCategory }
)(CategoryList);
