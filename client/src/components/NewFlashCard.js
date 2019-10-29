import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { newFlashCard } from "../actions";

const NewFlashCard = ({ handleSubmit, newFlashCard, match, history }) => {
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
				newFlashCard(formValues, match.params.category, history)
			)}
		>
			<Field component={renderInput} label="Title" name="header" />
			<Field component={renderInput} label="Content" name="content" />
			<button className="btn lime black-text right">New Flash Card</button>
		</form>
	);
};

export default reduxForm({
	form: "flashCard"
})(
	connect(
		null,
		{ newFlashCard }
	)(NewFlashCard)
);
