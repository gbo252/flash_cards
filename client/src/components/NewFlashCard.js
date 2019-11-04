import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import checkCategory from "../utils/checkCategory";

let flashCardsState = [];

const renderInput = ({ input, label, meta: { error, touched } }) => {
	return (
		<div className="form-group">
			<label htmlFor={label}>{label}</label>
			<input
				id={label}
				className="form-control"
				{...input}
				autoComplete="off"
			/>
			<small className="form-text text-danger">{touched && error}</small>
		</div>
	);
};

const NewFlashCard = ({
	fetchCategories,
	categories,
	fetchFlashCards,
	flashCards,
	match,
	handleSubmit,
	newFlashCard,
	history
}) => {
	const { category } = match.params;

	React.useEffect(() => {
		checkCategory(
			fetchCategories,
			categories,
			category,
			history,
			fetchFlashCards
		);
	}, [fetchFlashCards, fetchCategories, categories, category, history]);

	flashCardsState = flashCards;

	return (
		<form
			onSubmit={handleSubmit(formValues =>
				newFlashCard(formValues, category, history)
			)}
			style={{ marginTop: "40px" }}
		>
			<Field component={renderInput} label="Title" name="header" />
			<Field component={renderInput} label="Content" name="content" />
			<div className="d-flex justify-content-between">
				<Link
					to={`/dashboard/${category}`}
					className="btn btn-danger"
					role="button"
				>
					Cancel
				</Link>
				<button type="submit" className="btn btn-success">
					New Flash Card
				</button>
			</div>
		</form>
	);
};

const validateHeader = header => {
	const headerNames = flashCardsState.map(x => x.header.toLowerCase());

	if (headerNames.includes(header.toLowerCase())) {
		return `There is already a flash card with header ${header}`;
	}

	return null;
};

const validate = formValues => {
	const errors = {};

	if (flashCardsState) {
		errors.header = validateHeader(formValues.header || "");
	}

	if (!formValues.header) {
		errors.header = "You must enter a header";
	}

	if (!formValues.content) {
		errors.content = "You must enter some content";
	}

	return errors;
};

const mapStateToProps = ({ categories, flashCards }) => {
	return { categories, flashCards };
};

export default reduxForm({
	form: "flashCard",
	validate
})(
	connect(
		mapStateToProps,
		actions
	)(NewFlashCard)
);
