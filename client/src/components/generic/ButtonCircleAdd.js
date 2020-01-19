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
				<i className="material-icons icon-size text-white-50" style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)" }}>add</i>
			</div>
		</div>
	);
};

export default connect(null, actions)(ButtonCircleAdd);
