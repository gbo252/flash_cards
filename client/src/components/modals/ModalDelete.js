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
	setToastInfo,
	setToastShow
}) => {
	let setModalShow;
	let modalShow;
	let header;
	let onClick;
	let deleteList;
	let deleteMessage;

	if (modalInfo) {
		if (title === "delete-cat") {
			if (modalInfo.arrayOfIds) {
				header = "Delete Categories";
				modalShow = modalDeleteCatShow;
				setModalShow = setModalDeleteCatShow;
				deleteList = modalInfo.categoryNames.map(name => (
					<li key={name}>{name}</li>
				));
				deleteMessage =
					"Are you sure want to delete the following categories and any related flash cards:";
				onClick = () => {
					setJustDeleted(modalInfo.arrayOfIds);
					setTimeout(() => {
						deleteCategories(modalInfo.arrayOfIds);
					}, 500);
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
				deleteList = <li>{modalInfo.category}</li>;
				deleteMessage =
					"Are you sure want to delete the following category and any related flash cards:";
				onClick = () => {
					setJustDeleted([modalInfo._id]);
					setTimeout(() => {
						deleteCategories([modalInfo._id]);
					}, 500);
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
			header = "Delete Flash Card";
			modalShow = modalDeleteFlashShow;
			setModalShow = setModalDeleteFlashShow;
			deleteList = <li>{modalInfo.flashCard}</li>;
			deleteMessage =
				"Are you sure want to delete the following flash card:";
			onClick = () => {
				deleteFlashCard(modalInfo._id, modalInfo.category);
				setModalShow(false);
				setToastInfo(
					"Flash card deleted successfully",
					modalInfo.color
				);
				setToastShow(true);
			};
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
				<ul>{deleteList}</ul>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="btn btn-danger mx-2"
					onClick={() => setModalShow(false)}
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
