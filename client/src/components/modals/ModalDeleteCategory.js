import React from "react";
import Modal from "./Modal";

export default ({ modalInfo, deleteCategory, show, setModalShow }) => {
	const renderContent = () => {
		return modalInfo
			? `Are you sure want to delete the category: ${modalInfo.category}`
			: null;
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
					onClick={() => {
						deleteCategory(modalInfo._id);
						setModalShow(false);
					}}
				>
					Delete
				</button>
			</div>
		);
	};

	return (
		<Modal
			title="Delete Category"
			content={renderContent()}
			actions={renderActions()}
			show={show}
			onHide={() => setModalShow(false)}
		/>
	);
};
