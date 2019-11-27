import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Modal from "react-bootstrap/Modal";

const ModalDelete = ({
	title,
	modalInfo,
	modalDeleteCatShow,
	modalDeleteFlashShow,
	deleteCategories,
	deleteFlashCard,
	setJustDeleted,
	setModalDeleteCatShow,
	setModalDeleteFlashShow,
	setCategoriesDelete,
	setFlashCardsDelete,
	setToastInfo,
	setToastShow
}) => {
	let setModalShow;
	let modalShow;
	let header;
	let onClick;
	let deleteList;
	let deleteMessage;
	let setDelete;

	if (modalInfo) {
		if (title === "delete-cat") {
			if (modalInfo.categoryIdArray) {
				header = "Delete Categories";
				modalShow = modalDeleteCatShow;
				setModalShow = setModalDeleteCatShow;
				setDelete = setCategoriesDelete;
				deleteList = modalInfo.categoryNames.map(name => (
					<li key={name}>{name}</li>
				));
				deleteMessage =
					"Are you sure you want to delete the following categories and any related flash cards:";
				onClick = () => {
					setJustDeleted(modalInfo.categoryIdArray);
					setTimeout(() => {
						deleteCategories(modalInfo.categoryIdArray);
					}, 700);
					setModalShow(false);
					setCategoriesDelete(false);
					setToastInfo(
						"Categories deleted successfully!",
						"rgb(248, 191, 191)"
					);
					setToastShow(true);
				};
			} else {
				header = "Delete Category";
				modalShow = modalDeleteCatShow;
				setModalShow = setModalDeleteCatShow;
				setDelete = setCategoriesDelete;
				deleteList = <li>{modalInfo.category}</li>;
				deleteMessage =
					"Are you sure you want to delete the following category and any related flash cards:";
				onClick = () => {
					setJustDeleted([modalInfo._id]);
					setTimeout(() => {
						deleteCategories([modalInfo._id]);
					}, 700);
					setModalShow(false);
					setCategoriesDelete(false);
					setToastInfo(
						"Category deleted successfully!",
						modalInfo.color
					);
					setToastShow(true);
				};
			}
		} else if (title === "delete-flash") {
			if (modalInfo.flashIdArray) {
				header = "Delete Flash Cards";
				modalShow = modalDeleteFlashShow;
				setModalShow = setModalDeleteFlashShow;
				setDelete = setFlashCardsDelete;
				deleteList = modalInfo.flashCardHeaders.map(name => (
					<li key={name}>{name}</li>
				));
				deleteMessage =
					"Are you sure you want to delete the following flash cards:";
				onClick = () => {
					setJustDeleted(modalInfo.flashIdArray);
					setTimeout(() => {
						deleteFlashCard(modalInfo.flashIdArray, modalInfo.category);
					}, 700);
					setModalShow(false);
					setFlashCardsDelete(false);
					setToastInfo(
						"Flash cards deleted successfully",
						modalInfo.color
					);
					setToastShow(true);
				};
			} else {
				header = "Delete Flash Card";
				modalShow = modalDeleteFlashShow;
				setModalShow = setModalDeleteFlashShow;
				setDelete = setFlashCardsDelete;
				deleteList = <li>{modalInfo.flashCard}</li>;
				deleteMessage =
					"Are you sure you want to delete the following flash card:";
				onClick = () => {
					setJustDeleted([modalInfo._id]);
					setTimeout(() => {
						deleteFlashCard([modalInfo._id], modalInfo.category);
					}, 700);
					setModalShow(false);
					setFlashCardsDelete(false);
					setToastInfo(
						"Flash card deleted successfully",
						modalInfo.color
					);
					setToastShow(true);
				};
			}
		}
	}

	return (
		<Modal
			show={modalShow}
			onHide={() => setModalShow(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter-delete"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter-delete">
					{header}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{deleteMessage}</p>
				<ul className="text-break text-wrap">{deleteList}</ul>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="btn btn-danger mx-2"
					onClick={() => {
						setModalShow(false);
						setDelete(false);
					}}
				>
					Cancel
				</button>
				<button className="btn btn-success mx-2" onClick={onClick}>
					Submit
				</button>
			</Modal.Footer>
		</Modal>
	);
};

const mapStateToProps = ({
	modalInfo,
	modalDeleteCatShow,
	modalDeleteFlashShow
}) => {
	return { modalInfo, modalDeleteCatShow, modalDeleteFlashShow };
};

export default connect(mapStateToProps, actions)(ModalDelete);
