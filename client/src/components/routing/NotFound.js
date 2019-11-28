import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({ location, history }) => {
	if (location.pathname !== "/404") {
		history.push("/404");
	}

	return (
		<div className="mx-2 text-center" style={{ marginTop: "100px" }}>
			<h1 className="h3 font-weight-light mb-3">Page Not Found</h1>
			<p className="h5 font-weight-light mb-4">
				Sorry, the page you were looking for does not exist.
			</p>
			<Link to="/" className="btn btn-secondary rounded-pill">
				Home
			</Link>
		</div>
	);
};

export default NotFound;
