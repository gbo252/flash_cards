import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import FormField from "./FormField";
import FormTextField from "./FormTextField";
import validateDuplicates from "./validateDuplicates";

const FlashCardForm = ({ handleSubmit, onSubmit }) => {
	return (
		<form id="flash-card-form" onSubmit={handleSubmit(onSubmit)}>
			<Field component={FormField} label="Title" name="header" />
			<Field component={FormTextField} label="Content" name="content" />
		</form>
	);
};

const validate = (formValues, { flashCards, initialValues }) => {
	const errors = {};

	if (flashCards) {
		errors.header = validateDuplicates(
			flashCards,
			formValues.header || "",
			initialValues,
			"header"
		);
	}

	if (formValues.header) {
		if (formValues.header.length > 90) {
			errors.header = "Header must be 90 characters or less";
		}
	}

	if (!formValues.header) {
		errors.header = "You must enter a header";
	}

	if (!formValues.content) {
		errors.content = "You must enter some content";
	}

	return errors;
};

const mapStateToProps = ({ flashCards }) => {
	return { flashCards };
};

export default connect(mapStateToProps)(
	reduxForm({
		form: "flashCard",
		enableReinitialize: true,
		validate
	})(FlashCardForm)
);
