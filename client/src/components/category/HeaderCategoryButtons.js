import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const HeaderCategoryButtons = ({
	categories,
	form,
	categoriesDelete,
	setCategoriesDelete,
	setModalInfo,
	setModalNewCatShow,
	setModalDeleteCatShow
}) => {
	const atts = {};
	let total = 0;

	if (form.categoryDelete && categoriesDelete) {
		if (form.categoryDelete.values) {
			const { values } = form.categoryDelete;
			const checked = Object.keys(values).some(id => values[id]);
			total = Object.keys(values).filter(id => values[id]).length;
			if (!checked) {
				atts.disabled = true;
			}
		} else {
			atts.disabled = true;
		}
	}

	const deleteSelected = () => {
		const { values } = form.categoryDelete;
		const categoryIdArray = Object.keys(values).filter(id => values[id]);
		const categoryNames = categoryIdArray.map(id => {
			return categories.find(category => category._id === id).category;
		});
		setModalInfo({ categoryNames, categoryIdArray });
		setModalDeleteCatShow(true);
	};

	return (
		<React.Fragment>
			<button
				{...atts}
				data-toggle="collapse"
				data-target="#header-bar"
				className={
					"btn rounded-pill align-self-center m-1 " +
					(categoriesDelete
						? "btn-outline-danger"
						: "btn-custom-success")
				}
				onClick={e => {
					if (!categoriesDelete) {
						setModalInfo(null);
						setModalNewCatShow(true);
					} else {
						deleteSelected();
					}
					e.currentTarget.blur();
				}}
			>
				{categoriesDelete ? "Delete Selected" : "Add Category"}
			</button>
			<button
				className="btn btn-custom-info align-self-center rounded-pill m-1"
				onClick={e => {
					setCategoriesDelete(!categoriesDelete);
					e.currentTarget.blur();
				}}
			>
				{categoriesDelete
					? `Deselect ${total} Categories`
					: "Select Categories"}
			</button>
		</React.Fragment>
	);
};

const mapStateToProps = ({ categories, form, categoriesDelete }) => {
	return { categories, form, categoriesDelete };
};

export default connect(mapStateToProps, actions)(HeaderCategoryButtons);
