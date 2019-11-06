import React from "react";
import Modal from "./Modal";

export default ({ modalInfo, deleteCategory }) => {
	const renderModalContent = () => {
		return `Are you sure want to delete the category: ${modalInfo.category}`;
	};

	const renderModalActions = () => {
		return (
			<button
				className="btn btn-secondary"
				onClick={() => deleteCategory(modalInfo._id)}
				data-toggle="modal"
				data-target="#action-modal"
			>
				Delete
			</button>
		);
	};

	return (
		<Modal
			title="Delete Category"
			content={renderModalContent()}
			actions={renderModalActions()}
		/>
	);
};
