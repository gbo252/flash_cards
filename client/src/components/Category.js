import React from "react";
import FlashCardList from "./FlashCardList";
import { Link } from "react-router-dom";

const Category = ({ match }) => {
	const { category } = match.params;

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

	return (
		<div className="mt-3">
			<h1 className="display-4 text-center mb-5">{category}</h1>

			<div className="d-flex flex-wrap justify-content-center">
				<FlashCardList category={category} />
				{space}
			</div>

			<div className="d-flex justify-content-end">
				<Link
					to={`/dashboard/${category}/new`}
					role="button"
					className="btn btn-warning rounded-pill"
				>
					Add Flash Card
				</Link>
			</div>
		</div>
	);
};

export default Category;
