import "../css/CategoryList.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories, deleteCategory } from "../actions";

const CategoryList = ({ categories, fetchCategories, deleteCategory }) => {
	React.useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return categories.map(({ category, lastEdited, _id, cards }) => {
		return (
			<div
				key={_id}
				className="card shadow m-3"
				id="category-card"
				style={{ width: "15rem" }}
			>
				<div className="d-flex flex-column m-1">
					<button
						className="btn btn-danger py-0 px-1 align-self-end"
						onClick={() => deleteCategory(_id)}
					>
						X
					</button>
				</div>
				<Link
					to={`/dashboard/${category}`}
					style={{ textDecoration: "none" }}
				>
					<div className="card-body">
						<h5 className="card-title text-body">{category}</h5>
						<p className="card-text text-body">Total: {cards.length}</p>
					</div>
					<div className="card-footer">
						<small className="text-muted">
							Last Updated:{" "}
							{new Date(lastEdited).toLocaleDateString()}
						</small>
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
