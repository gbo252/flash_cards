import "../css/FormColorField.css";
import React from "react";

export default ({ input }) => {
	return (
		<React.Fragment>
			<input
				{...input}
				id={input.value}
				className="custom-control-input"
				type="radio"
			/>
			<label
				className="color-group-item mb-0 mr-2"
				htmlFor={input.value}
				style={{ cursor: "pointer" }}
			>
				<div
					className="color-circle rounded-circle"
					style={{
						backgroundColor: input.value,
						width: "60px",
						height: "60px"
					}}
				/>
			</label>
		</React.Fragment>
	);
};
