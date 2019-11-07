import React from "react";
import CategoryForm from "../CategoryForm";
import Modal from "./Modal";

export default ({ modalInfo, editCategory, show, setModalShow }) => {
	const editCategoryRef = React.useRef(null);

	const renderActions = () => {
		return (
			<div>
				<button
					ref={editCategoryRef}
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
					Edit
				</button>
			</div>
		);
	};

	const onSubmit = formValues => {
		editCategory(formValues, modalInfo.category);
		editCategoryRef.current.click();
	};

	return (
		<Modal
			title="Edit Category"
			content={
				<CategoryForm onSubmit={onSubmit} initialValues={modalInfo} />
			}
			actions={renderActions()}
			show={show}
			onHide={() => setModalShow(false)}
		/>
	);
};
