import React from "react";
import Tooltip from "../Tooltip";

export default ({ action, text, setModalInfo, iconText }) => {
	const handleClick = e => {
		setModalInfo();
		action(true);
		e.currentTarget.blur();
	};

	return (
		<Tooltip placement="right" text={text}>
			<button
				className="close"
				aria-label={text}
				onClick={handleClick}
				style={{ marginLeft: "50px" }}
			>
				<i
					className="text-black-50 material-icons"
					style={{ fontSize: "2.5rem" }}
				>
					{iconText}
				</i>
			</button>
		</Tooltip>
	);
};
