import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default ({ action, text, setModalInfo, iconText }) => {
	const handleClick = e => {
		setModalInfo();
		action(true);
		e.currentTarget.blur();
	};

	return (
		<OverlayTrigger
			placement="right"
			overlay={
				<Tooltip id={`${text}-category-tooltip`}>
					{text.toUpperCase()}
				</Tooltip>
			}
		>
			<button className="close" aria-label={text} onClick={handleClick}>
				<i
					className="text-black-50 material-icons"
					style={{ fontSize: "2.5rem" }}
				>
					{iconText}
				</i>
			</button>
		</OverlayTrigger>
	);
};
