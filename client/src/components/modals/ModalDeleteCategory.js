import React from "react";
import Modal from "./Modal";

export default ({ modalInfo, deleteCategory }) => {
	const renderModalContent = () => {
		return modalInfo ? `Are you sure want to delete the category: ${modalInfo.category}` : null;
	};

	const renderModalActions = () => {
		return (
			<button
				className="btn btn-secondary"
				onClick={() => deleteCategory(modalInfo._id)}
				data-toggle="modal"
				data-target="#delete-category"
			>
				Delete
			</button>
		);
	};

	return (
		<Modal
			id="delete-category"
			title="Delete Category"
			content={renderModalContent()}
			actions={renderModalActions()}
		/>
	);
};
