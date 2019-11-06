import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ id, title, content, actions }) => {
	return ReactDOM.createPortal(
		<div
			className="modal fade"
			id={id}
			tabIndex="-1"
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5
							className="modal-title"
							id="exampleModalCenterTitle"
						>
							{title}
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">{content}</div>
					<div className="modal-footer">{actions}</div>
				</div>
			</div>
		</div>,
		document.querySelector("#modal")
	);
};

export default Modal;
