import React from "react";
import Modal from "react-bootstrap/Modal";

export default ({ id, title, content, actions, ...rest }) => {
	return (
		<Modal
			{...rest}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{content}</Modal.Body>
			<Modal.Footer>{actions}</Modal.Footer>
		</Modal>
	);
};
