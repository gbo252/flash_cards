import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Modal from "react-bootstrap/Modal";
import CategoryForm from "../forms/CategoryForm";
import FlashCardForm from "../forms/FlashCardForm";

const ModalNewEdit = ({
	title,
	form,
	newCategory,
	editCategory,
	newFlashCard,
	editFlashCard,
	modalInfo,
	modalNewCatShow,
	setModalNewCatShow,
	modalEditCatShow,
	setModalEditCatShow,
	modalNewFlashShow,
	setModalNewFlashShow,
	modalEditFlashShow,
	setModalEditFlashShow,
	setToastInfo,
	setToastShow
}) => {
	let setModalShow;
	let modalShow;
	let formName;
	let header;
	let content;

	if (title === "new-cat") {
		setModalShow = setModalNewCatShow;
		modalShow = modalNewCatShow;
		formName = "category-form";
		header = "New Category";
		content = <CategoryForm onSubmit={onSubmit} />;
	} else if (title === "edit-cat") {
		setModalShow = setModalEditCatShow;
		modalShow = modalEditCatShow;
		formName = "category-form";
		header = "Edit Category";
		content = (
			<CategoryForm onSubmit={onSubmit} initialValues={modalInfo} />
		);
	} else if (title === "new-flash") {
		setModalShow = setModalNewFlashShow;
		modalShow = modalNewFlashShow;
		formName = "flash-card-form";
		header = "New Flash Card";
		content = <FlashCardForm onSubmit={onSubmit} />;
	} else if (title === "edit-flash") {
		setModalShow = setModalEditFlashShow;
		modalShow = modalEditFlashShow;
		formName = "flash-card-form";
		header = "Edit Flash Card";
		content = (
			<FlashCardForm onSubmit={onSubmit} initialValues={modalInfo} />
		);
	}

	function onSubmit(formValues) {
		if (title === "new-cat") {
			newCategory(formValues);
			setToastInfo("New category created!", form.category.values.color);
		} else if (title === "edit-cat") {
			editCategory(formValues, modalInfo.category);
			setToastInfo(
				"Category edited successfully!",
				form.category.values.color
			);
		} else if (title === "new-flash") {
			newFlashCard(formValues, modalInfo.category);
			setToastInfo("New flash card created!", modalInfo.color);
		} else if (title === "edit-flash") {
			editFlashCard(formValues, modalInfo.category, modalInfo._id)
			setToastInfo("Flash card edited successfully!", modalInfo.color);
		}
		setModalShow(false);
		setToastShow(true);
	}

	const renderActions = () => {
		return (
			<React.Fragment>
				<button
					className="btn btn-danger mx-2"
					onClick={() => setModalShow(false)}
				>
					Cancel
				</button>
				<button
					className="btn btn-success mx-2"
					type="submit"
					form={formName}
				>
					Submit
				</button>
			</React.Fragment>
		);
	};

	return (
		<Modal
			show={modalShow}
			onHide={() => setModalShow(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{header}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{content}</Modal.Body>
			<Modal.Footer>{renderActions()}</Modal.Footer>
		</Modal>
	);
};

const mapStateToProps = ({
	modalInfo,
	modalNewCatShow,
	modalEditCatShow,
	modalNewFlashShow,
	modalEditFlashShow,
	form
}) => {
	return {
		modalInfo,
		modalNewCatShow,
		modalEditCatShow,
		modalNewFlashShow,
		modalEditFlashShow,
		form
	};
};

export default connect(mapStateToProps, actions)(ModalNewEdit);
