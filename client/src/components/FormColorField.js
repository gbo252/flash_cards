import "../css/FormColorField.css";
import React from "react";

export default ({ input }) => {
	return (
		<React.Fragment>
			<input {...input} id={input.value} className="radio" type="radio" />
			<label className="color-group-item m-2" htmlFor={input.value}>
				<div
					className="d-inline-block color-circle rounded-circle"
					style={{ backgroundColor: input.value }}
				/>
			</label>
		</React.Fragment>
	);
};
