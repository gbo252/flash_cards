import React from "react";

export const FormErrorMessage = ({ meta: { error } }) => {
	return <small className="form-text text-danger">{error}</small>;
};

export const FormErrorMessageTouched = ({ meta: { error, touched } }) => {
	return <small className="form-text text-danger">{touched && error}</small>;
};

export default ({ input, label }) => {
	return (
		<div className="form-group">
			<label className="mr-2" htmlFor={label}>
				{label}
			</label>
			<input
				{...input}
				id={label}
				className="form-control"
				autoComplete="off"
			/>
		</div>
	);
};
