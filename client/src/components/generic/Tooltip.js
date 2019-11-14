import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default ({ children, placement, text }) => {
	return (
		<OverlayTrigger
			placement={placement}
			overlay={<Tooltip id={text}>{text}</Tooltip>}
		>
			{children}
		</OverlayTrigger>
	);
};
