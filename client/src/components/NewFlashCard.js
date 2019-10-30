import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";

let flashCardsState = [];

const NewFlashCard = ({
	flashCards,
	match,
	fetchFlashCards,
	clearFlashCards,
	handleSubmit,
	newFlashCard,
	history
}) => {
	flashCardsState = flashCards;

	React.useEffect(() => {
		fetchFlashCards(match.params.category);

		return () => {
			clearFlashCards();
		};
	}, [fetchFlashCards, clearFlashCards, match]);

	const renderError = ({ error, touched }) => {
		if (error && touched) {
			return (
				<div>
					<small className="form-text text-danger">{error}</small>
				</div>
			);
		}
	};

	const renderInput = ({ input, label, meta }) => {
		return (
			<div className="form-group">
				<label htmlFor={label}>{label}</label>
				<input
					id={label}
					className="form-control"
					{...input}
					autoComplete="off"
				/>
				{renderError(meta)}
			</div>
		);
	};

	return (
		<form
			onSubmit={handleSubmit(formValues =>
				newFlashCard(formValues, match.params.category, history)
			)}
			style={{ marginTop: "40px" }}
		>
			<Field component={renderInput} label="Title" name="header" />
			<Field component={renderInput} label="Content" name="content" />
			<button type="submit" className="btn btn-success">
				New Flash Card
			</button>
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

	errors.header = validateHeader(formValues.header || "");

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

export default reduxForm({
	form: "flashCard",
	validate
})(
	connect(
		mapStateToProps,
		actions
	)(NewFlashCard)
);
