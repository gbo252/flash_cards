import React from "react";
import CategoryList from "./CategoryList";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
			<h1 className="display-4 text-center mb-5">Categories</h1>

			<div className="d-flex flex-wrap justify-content-center">
				<CategoryList />
				{space}
			</div>

			<div className="d-flex justify-content-end">
				<Link
					to="/newCategory"
					role="button"
					className="btn btn-warning rounded-pill"
				>
					Add Category
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
