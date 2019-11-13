import React from "react";
import Modal from "./Modal";

export default ({
	modalInfo,
	action,
	modalShow,
	setModalShow,
	setToastShow
}) => {
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
					onClick={() => setModalShow(false)}
				>
					Cancel
				</button>
				<button
					className="btn btn-success mx-2"
					onClick={() => {
						action(
							modalInfo.arrayOfIds
								? modalInfo.arrayOfIds
								: [modalInfo._id]
						);
						setModalShow(false);
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
			title="Delete Categories"
			content={renderContent()}
			actions={renderActions()}
			show={modalShow}
			onHide={() => setModalShow(false)}
		/>
	);
};
