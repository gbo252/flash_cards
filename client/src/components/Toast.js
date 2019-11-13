import React from "react";
import Toast from "react-bootstrap/Toast";

export default ({ content, toastShow, setToastShow }) => {
	return (
		<Toast
			onClose={() => setToastShow(false)}
			show={toastShow}
			delay={2000}
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
						backgroundColor: "gray",
						width: "20px",
						height: "20px",
						borderRadius: "5px"
					}}
				/>
				<strong className="ml-2 mr-auto">Flash Cards Online</strong>
			</Toast.Header>
			<Toast.Body>{content}</Toast.Body>
		</Toast>
	);
};
