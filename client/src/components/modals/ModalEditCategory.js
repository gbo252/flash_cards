import React from "react";
import CategoryForm from "../CategoryForm";
import Modal from "./Modal";

export default ({ modalInfo, editCategory }) => {
	const modalRef = React.useRef(null);

	const renderModalActions = () => {
		return (
			<div>
				<button
					ref={modalRef}
					className="btn btn-danger mx-2"
					data-toggle="modal"
					data-target="#edit-category"
				>
					Cancel
				</button>
				<button
					className="btn btn-success mx-2"
					type="submit"
					form="category-form"
				>
					Edit
				</button>
			</div>
		);
	};

	const onSubmit = formValues => {
		editCategory(formValues, modalInfo.category);
		modalRef.current.click();
	};

	return (
		<Modal
			id="edit-category"
			title="Edit Category"
			content={
				<CategoryForm onSubmit={onSubmit} initialValues={modalInfo} />
			}
			actions={renderModalActions()}
		/>
	);
};
