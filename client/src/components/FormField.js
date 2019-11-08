import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
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
			<small className="form-text text-danger">{touched && error}</small>
		</div>
	);
};
