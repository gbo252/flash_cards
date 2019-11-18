import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

import { colors } from "../generic/colors";

const Toast = ({ toastInfo, toastShow, toastInc, setToastShow }) => {
	React.useEffect(() => {
		let timer = setTimeout(() => {
			setToastShow(false);
		}, 5000);
		return () => {
			clearTimeout(timer);
		};
	}, [toastInc, setToastShow]);

	const color = _.sample(colors);

	const isShow = () => {
		return toastShow ? { display: "block" } : { display: "none" };
	};

	return ReactDOM.createPortal(
		<div className="fixed-top">
			<div
				className="toast position-absolute"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
				style={{
					opacity: "1",
					top: "70px",
					right: "15px",
					...isShow()
				}}
			>
				<div className="toast-header">
					<div
						className="mr-2"
						style={{
							width: "1.3rem",
							height: "1.3rem",
							borderRadius: "4px",
							backgroundColor: color
						}}
					/>
					<strong className="mr-auto">Flash Cards Online</strong>
					<button
						type="button"
						className="ml-2 mb-1 close"
						aria-label="Close"
						onClick={() => setToastShow(false)}
					>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="toast-body">{toastInfo}</div>
			</div>
		</div>,
		document.querySelector("#toast")
	);
};

const mapStateToProps = ({ toastInfo, toastShow }) => {
	return { toastInfo, toastShow: toastShow.show, toastInc: toastShow.inc };
};

export default connect(mapStateToProps, actions)(Toast);
