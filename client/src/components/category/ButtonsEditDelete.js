import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const ButtonsEditDelete = ({
	type,
	text,
	setModalInfo,
	modalInfo,
	setModalEditCatShow,
	setModalDeleteCatShow,
	setCategoriesDelete
}) => {
	const action =
		text === "Edit" ? setModalEditCatShow : setModalDeleteCatShow;

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
					<i className="icon-size text-black-50 material-icons">
						{text === "Edit" ? "edit" : "cancel"}
					</i>
				</button>
			);
		} else {
			return (
				<button
					className="dropdown-item mr-5"
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
