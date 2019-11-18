import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

const ButtonsAddSelect = ({
	categories,
	form,
	categoriesDelete,
	setCategoriesDelete,
	setModalInfo,
	setModalNewShow,
	setModalDeleteShow
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
					"btn rounded-pill align-self-center m-1 " +
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
			<div className="d-flex">
				<button
					className="btn btn-outline-secondary align-self-center rounded-pill m-1"
					onClick={e => {
						setCategoriesDelete(!categoriesDelete);
						e.currentTarget.blur();
					}}
				>
					{categoriesDelete
						? "Deselect Categories"
						: "Select Categories"}
				</button>
				<div
					className={
						"rounded-circle justify-content-center align-self-center align-top m-1 " +
						(categoriesDelete ? "d-flex" : "d-none")
					}
					style={{
						width: "2.5rem",
						height: "2.5rem",
						border: "1px solid #dc3545"
					}}
				>
					<p className="m-0 my-auto" style={{ color: "#dc3545" }}>
						{total}
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = ({ categories, form, categoriesDelete }) => {
	return { categories, form, categoriesDelete };
};

export default connect(mapStateToProps, actions)(ButtonsAddSelect);
