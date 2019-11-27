import React from "react";

export default ({ color }) => {
	return (
		<div className="d-flex justify-content-center">
			<div
				className="spinner-border"
				style={{ width: "3rem", height: "3rem", color }}
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};
