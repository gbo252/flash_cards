import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Modal from "react-bootstrap/Modal";
import CategoryForm from "../forms/CategoryForm";

const ModalNewEditCategory = ({
	newCategory,
	editCategory,
	title,
	modalInfo,
	modalNewShow,
	modalEditShow,
	setModalNewShow,
	setModalEditShow,
	setToastShow,
	setToastContent
}) => {
	const setModalShow = title === "New" ? setModalNewShow : setModalEditShow;

	const onSubmit = formValues => {
		if (title === "New") {
			newCategory(formValues);
		} else {
			editCategory(formValues, modalInfo.category);
		}
		setModalShow(false);
		setToastContent(
			title === "New"
				? "Category added successfully"
				: "Category edited successfully"
		);
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
			show={title === "New" ? modalNewShow : modalEditShow}
			onHide={() => setModalShow(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{`${title} Category`}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{renderContent()}</Modal.Body>
			<Modal.Footer>{renderActions()}</Modal.Footer>
		</Modal>
	);
};

const mapStateToProps = ({ modalInfo, modalNewShow, modalEditShow }) => {
	return { modalInfo, modalNewShow, modalEditShow };
};

export default connect(mapStateToProps, actions)(ModalNewEditCategory);
