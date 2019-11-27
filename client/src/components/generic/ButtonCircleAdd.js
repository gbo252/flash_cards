import "../../css/ButtonCircleAdd.css";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const ButtonCircleAdd = ({ info, setModalInfo, setModal }) => {
	return (
		<div
			className="d-flex justify-content-center"
			style={{ marginTop: "40px" }}
		>
			<div
				className="button-circle d-flex justify-content-center align-items-center align-middle rounded-circle bg-light"
				onClick={e => {
					setModalInfo(info);
					setModal(true);
					e.currentTarget.blur();
				}}
			>
				<i className="material-icons icon-size text-muted">add</i>
			</div>
		</div>
	);
};

export default connect(null, actions)(ButtonCircleAdd);
