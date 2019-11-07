import React from "react";
import CategoryForm from "../CategoryForm";
import Modal from "./Modal";

export default ({ newCategory, show, setModalShow }) => {
	const newCategoryRef = React.useRef(null);

	const renderActions = () => {
		return (
			<div>
				<button
					ref={newCategoryRef}
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
					New
				</button>
			</div>
		);
	};

	const onSubmit = formValues => {
		newCategory(formValues);
		newCategoryRef.current.click();
	};

	return (
		<Modal
			title="New Category"
			content={<CategoryForm onSubmit={onSubmit} />}
			actions={renderActions()}
			show={show}
			onHide={() => setModalShow(false)}
		/>
	);
};
