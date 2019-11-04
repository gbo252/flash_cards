import "../css/CategoryList.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

const CategoryList = ({ categories, deleteCategory }) => {
	const categoriesArray = categories.map(
		({ category, lastEdited, _id, cardsTotal }) => {
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
						to={`/categories/${category}`}
						style={{ textDecoration: "none" }}
					>
						<div className="card-body">
							<h5 className="card-title text-body">{category}</h5>
							<p className="card-text text-body">
								Total: {cardsTotal}
							</p>
						</div>
						<div className="card-footer">
							<small className="text-muted">
								Last Updated:{" "}
								{new Date(lastEdited).toLocaleDateString(
									"en-GB"
								)}
							</small>
						</div>
					</Link>
				</div>
			);
		}
	);

	const blankSpaces = () => {
		let space = [];

		for (let i = 0; i < 3; i++) {
			space.push(
				<div
					key={i}
					className="mx-3"
					style={{ width: "15rem", height: "0" }}
				></div>
			);
		}

		return space;
	};

	return [...categoriesArray, ...blankSpaces()];
};

export default connect(
	null,
	actions
)(CategoryList);
