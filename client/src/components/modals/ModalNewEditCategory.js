import React from "react";
import CategoryForm from "../forms/CategoryForm";
import Modal from "./Modal";

export default ({
	modalInfo,
	action,
	title,
	modalShow,
	setModalShow,
	setToastShow
}) => {
	const onSubmit = formValues => {
		action(formValues, modalInfo ? modalInfo.category : null);
		setModalShow(false);
		setToastShow(true);
	};

	const renderContent = () => {
		return modalInfo ? (
			<CategoryForm onSubmit={onSubmit} initialValues={modalInfo} />
		) : (
			<CategoryForm onSubmit={onSubmit} />
		);
	};

	const renderActions = () => {
		return (
			<div>
				<button
					className="btn btn-danger mx-2"
					onClick={() => setModalShow(false)}
				>
					Cancel
				</button>
				<button
					className="btn btn-success mx-2"
					type="submit"
					form="category-form"
				>
					Submit
				</button>
			</div>
		);
	};

	return (
		<Modal
			title={`${title} Category`}
			content={renderContent()}
			actions={renderActions()}
			show={modalShow}
			onHide={() => setModalShow(false)}
		/>
	);
};
