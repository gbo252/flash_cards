import React from "react";
import CategoryList from "./CategoryList";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			<CategoryList />
			<Link
				to={"/newCategory"}
				className="btn-floating right btn-large waves-effect waves-light red"
			>
				<i className="material-icons">add</i>
			</Link>
		</div>
	);
};

export default Dashboard;
