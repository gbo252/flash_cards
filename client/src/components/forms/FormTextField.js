import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div className="form-group">
			<label htmlFor={input.name}>{label}</label>
			<textarea
				{...input}
				id={input.name}
                className="form-control"
                rows="5"
				autoComplete="off"
			/>
			<small className="form-text text-danger">{touched && error}</small>
		</div>
	);
};
