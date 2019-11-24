import "../../css/FormField.css";
import React from "react";

export const FormErrorMessageTouched = ({ meta: { error, touched } }) => {
	return <small className="form-text text-danger">{touched && error}</small>;
};

export default ({ input, label, style, meta: { error, touched } }) => {
	return (
		<div className="form-group">
			<label
				className="mr-2"
				htmlFor={input.name}
				style={{ color: style }}
			>
				{label}
			</label>
			<input
				style={{ borderColor: style }}
				{...input}
				id={input.name}
				className="form-control"
				autoComplete="off"
			/>
			<small className="form-text text-danger">{touched && error}</small>
		</div>
	);
};
