import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Tooltip from "../generic/Tooltip";

const IconEditDelete = ({
	text,
	setModalInfo,
	modalInfo,
	setModalEditShow,
	setModalDeleteShow,
	setCategoriesDelete
}) => {
	const action = text === "Edit" ? setModalEditShow : setModalDeleteShow;

	const handleClick = e => {
		setModalInfo(modalInfo);
		setCategoriesDelete(false);
		action(true);
		e.currentTarget.blur();
	};

	return (
		<Tooltip placement="top" text={text}>
			<button
				className="close"
				aria-label={text}
				onClick={handleClick}
			>
				<i
					className="text-black-50 material-icons"
					style={{ fontSize: "2.5rem" }}
				>
					{text === "Edit" ? "edit" : "cancel"}
				</i>
			</button>
		</Tooltip>
	);
};

export default connect(null, actions)(IconEditDelete);
