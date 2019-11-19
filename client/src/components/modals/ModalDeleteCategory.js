import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Modal from "react-bootstrap/Modal";

const ModalDeleteCategory = ({
	modalInfo,
	modalDeleteShow,
	deleteCategories,
	setJustDeleted,
	setModalDeleteShow,
	setCategoriesDelete,
	setToastInfo,
	setToastShow
}) => {
	const renderTitle = () => {
		if (modalInfo) {
			return modalInfo.arrayOfIds
				? "Delete Categories"
				: "Delete Category";
		}
		return null;
	};

	const renderContent = () => {
		if (modalInfo) {
			return (
				<React.Fragment>
					<p>
						Are you sure want to delete the following categories and
						any related flash cards:
					</p>
					<ul>
						{modalInfo.category ? (
							<li>{modalInfo.category}</li>
						) : (
							modalInfo.categoryNames.map(name => (
								<li key={name}>{name}</li>
							))
						)}
					</ul>
				</React.Fragment>
			);
		}
		return null;
	};

	const renderActions = () => {
		return (
			<div>
				<button
					className="btn btn-danger mx-2"
					onClick={() => setModalDeleteShow(false)}
				>
					Cancel
				</button>
				<button
					className="btn btn-success mx-2"
					onClick={() => {
						setJustDeleted(
							modalInfo.arrayOfIds
								? modalInfo.arrayOfIds
								: [modalInfo._id]
						);
						deleteCategories(
							modalInfo.arrayOfIds
								? modalInfo.arrayOfIds
								: [modalInfo._id]
						);
						setModalDeleteShow(false);
						setCategoriesDelete(false);
						setToastInfo(
							modalInfo.arrayOfIds
								? "Categories deleted successfully!"
								: "Category deleted successfully!",
							modalInfo.arrayOfIds
								? "rgb(248, 191, 191)"
								: modalInfo.color
						);
						setToastShow(true);
					}}
				>
					Submit
				</button>
			</div>
		);
	};

	return (
		<Modal
			show={modalDeleteShow}
			onHide={() => setModalDeleteShow(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{renderTitle()}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{renderContent()}</Modal.Body>
			<Modal.Footer>{renderActions()}</Modal.Footer>
		</Modal>
	);
};

const mapStateToProps = ({ modalInfo, modalDeleteShow }) => {
	return { modalInfo, modalDeleteShow };
};

export default connect(mapStateToProps, actions)(ModalDeleteCategory);
