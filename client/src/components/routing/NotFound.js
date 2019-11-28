import React from "react";

const NotFound = ({ location, history }) => {
	if (location.pathname !== "/404") {
		history.push("/404");
	}

	return (
		<div className="display-4 text-center" style={{ marginTop: "100px" }}>
			404 PAGE NOT FOUND
		</div>
	);
};

export default NotFound;
