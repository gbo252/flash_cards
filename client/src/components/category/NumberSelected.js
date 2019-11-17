import React from "react";
import { connect } from "react-redux";

const NumberSelected = ({ form, categoriesDelete }) => {
	if (!categoriesDelete) {
		return (
			<small className="form-text text-white">
				0 categories selected
			</small>
		);
	}
	if (form.categoryDelete) {
		if (form.categoryDelete.values) {
			const { values } = form.categoryDelete;
			const total = Object.keys(values).filter(id => values[id]).length;
			return (
				<small className="form-text text-danger">
					{total} categories selected
				</small>
			);
		}
	}
	return (
		<small className="form-text text-danger">0 categories selected</small>
	);
};

const mapStateToProps = ({ form, categoriesDelete }) => {
	return { form, categoriesDelete };
};

export default connect(mapStateToProps)(NumberSelected);
