import React from "react";
import CategoryForm from "../CategoryForm";
import Modal from "./Modal";

export default ({ modalInfo, action, title, show, setModalShow }) => {
	const onSubmit = formValues => {
		action(formValues, modalInfo ? modalInfo.category : null);
		setModalShow(false);
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
			show={show}
			onHide={() => setModalShow(false)}
		/>
	);
};
