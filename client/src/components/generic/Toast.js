import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import { colors } from "./colors";
import Toast from "react-bootstrap/Toast";

const ToastComponent = ({ toastContent, toastShow, setToastShow }) => {
	return (
		<Toast
			onClose={() => setToastShow(false)}
			show={toastShow}
			delay={3000}
			autohide
			style={{
				position: "fixed",
				bottom: "20px",
				right: "20px",
				minWidth: "250px"
			}}
		>
			<Toast.Header>
				<div
					style={{
						backgroundColor: _.sample(colors),
						width: "20px",
						height: "20px",
						borderRadius: "5px"
					}}
				/>
				<strong className="ml-2 mr-auto">Flash Cards Online</strong>
			</Toast.Header>
			<Toast.Body>{toastContent}</Toast.Body>
		</Toast>
	);
};

const mapStateToProps = ({ toastContent, toastShow }) => {
	return { toastContent, toastShow };
};

export default connect(mapStateToProps, actions)(ToastComponent);
