import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const ActionButtons = ({
	categories,
	form,
	categoriesDelete,
	setCategoriesDelete,
	setModalInfo,
	setModalNewShow,
	setModalDeleteShow
}) => {
	const atts = {};

	if (form.categoryDelete && categoriesDelete) {
		if (form.categoryDelete.values) {
			const { values } = form.categoryDelete;
			const checked = Object.keys(values).some(id => values[id]);
			if (!checked) {
				atts.disabled = true;
			}
		} else {
			atts.disabled = true;
		}
	}

	const deleteSelected = () => {
		const { values } = form.categoryDelete;
		const arrayOfIds = Object.keys(values).filter(id => values[id]);
		const categoryNames = arrayOfIds.map(id => {
			return categories.find(category => category._id === id).category;
		});
		setModalInfo({ categoryNames, arrayOfIds });
		setModalDeleteShow(true);
	};

	return (
		<React.Fragment>
			<button
				{...atts}
				className={
					"btn rounded-pill m-1 " +
					(categoriesDelete
						? "btn-outline-danger"
						: "btn-outline-success")
				}
				onClick={e => {
					if (!categoriesDelete) {
						setModalInfo(null);
						setModalNewShow(true);
						e.currentTarget.blur();
					} else {
						deleteSelected();
					}
				}}
			>
				{categoriesDelete ? "Delete Selected" : "Add Category"}
			</button>
			<button
				className="btn btn-outline-secondary rounded-pill m-1"
				onClick={e => {
					setCategoriesDelete(!categoriesDelete);
					e.currentTarget.blur();
				}}
			>
				{categoriesDelete ? "Deselect Categories" : "Select Categories"}
			</button>
		</React.Fragment>
	);
};

const mapStateToProps = ({ categories, form, categoriesDelete }) => {
	return { categories, form, categoriesDelete };
};

export default connect(mapStateToProps, actions)(ActionButtons);
