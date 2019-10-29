import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { newCategory } from "../actions";

const NewCategory = ({ handleSubmit, newCategory, history }) => {
	const renderInput = ({ input, label }) => {
		return (
			<div>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
			</div>
		);
	};

	return (
		<form
			onSubmit={handleSubmit(formValues =>
				newCategory(formValues, history)
			)}
		>
			<Field
				component={renderInput}
				label="Category Name"
				name="category"
			/>
			<button className="btn lime black-text right">New Category</button>
		</form>
	);
};

export default reduxForm({
	form: "category"
})(
	connect(
		null,
		{ newCategory }
	)(NewCategory)
);
