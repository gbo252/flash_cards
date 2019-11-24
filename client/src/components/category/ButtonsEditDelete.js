import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const ButtonsEditDelete = ({
	type,
	text,
	setModalInfo,
	modalInfo,
	setModalEditCatShow,
	setModalDeleteShow,
	setCategoriesDelete
}) => {
	const action = text === "Edit" ? setModalEditCatShow : setModalDeleteShow;

	const handleClick = e => {
		setModalInfo(modalInfo);
		setCategoriesDelete(false);
		action(true);
		e.currentTarget.blur();
		e.stopPropagation();
	};

	const renderButton = () => {
		if (type === "button") {
			return (
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
			);
		} else {
			return (
				<button
					className="dropdown-item pl-3 pr-5 mr-4"
					type="button"
					onClick={handleClick}
				>
					{text === "Edit" ? "Edit Category" : "Delete Category"}
				</button>
			);
		}
	};

	return renderButton();
};

export default connect(null, actions)(ButtonsEditDelete);
