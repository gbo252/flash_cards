import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import CategoryList from "./CategoryList";
import Spinner from "../Spinner";
import ModalDeleteCategory from "../modals/ModalDeleteCategory";
import ModalNewEditCategory from "../modals/ModalNewEditCategory";
import SortCategoriesForm, { sortCategories } from "../forms/SortCategoriesForm";
import FilterCategoriesForm, { filterCategories } from "../forms/FilterCategoriesForm";

const Dashboard = ({
	fetchCategories,
	clearFlashCards,
	categories,
	form,
	deleteCategory,
	deleteCategories,
	editCategory,
	newCategory
}) => {
	const [modalInfo, setModalInfo] = useState(null);
	const [modalDeleteShow, setModalDeleteShow] = useState(false);
	const [modalEditShow, setModalEditShow] = useState(false);
	const [modalNewShow, setModalNewShow] = useState(false);
	const [categoriesDelete, setCategoriesDelete] = useState(false);

	useEffect(() => {
		fetchCategories();
		clearFlashCards();
	}, [fetchCategories, clearFlashCards]);

	const renderButton = () => {
		if (categories) {
			return (
				<button
					className="btn btn-outline-secondary rounded-pill"
					onClick={() => setModalNewShow(true)}
				>
					Add Category
				</button>
			);
		}
	};

	const deleteSelected = () => {
		const { values } = form.categoryDelete;
		const toDelete = Object.keys(values).filter(id => values[id]);
		deleteCategories(toDelete);
	};

	const renderSelectButton = () => {
		return (
			<div className="custom-control custom-switch">
				<input
					type="checkbox"
					className="custom-control-input"
					id="select-switch"
					onClick={() => setCategoriesDelete(!categoriesDelete)}
				/>
				<label className="custom-control-label" htmlFor="select-switch">
					Select Categories
				</label>
				<span>
					<button
						className="btn btn-danger rounded-pill ml-3"
						onClick={deleteSelected}
					>
						Delete Selected
					</button>
				</span>
			</div>
		);
	};

	const renderCategories = () => {
		if (!categories) {
			return <Spinner />;
		} else if (categories.length > 0) {
			return (
				<div className="my-4">
					<CategoryList
						categories={categories}
						categoriesDelete={categoriesDelete}
						setModalInfo={setModalInfo}
						setModalDeleteShow={setModalDeleteShow}
						setModalEditShow={setModalEditShow}
					/>
				</div>
			);
		} else {
			return <div className="h5 text-center">No Categories</div>;
		}
	};

	return (
		<div className="d-flex flex-column mt-3">
			<ModalNewEditCategory
				action={newCategory}
				title="New"
				show={modalNewShow}
				setModalShow={setModalNewShow}
			/>
			<ModalNewEditCategory
				modalInfo={modalInfo}
				action={editCategory}
				title="Edit"
				show={modalEditShow}
				setModalShow={setModalEditShow}
			/>
			<ModalDeleteCategory
				modalInfo={modalInfo}
				deleteCategory={deleteCategory}
				show={modalDeleteShow}
				setModalShow={setModalDeleteShow}
			/>
			<h1 className="display-4 text-center">Flash Cards Online</h1>
			<p className="h4 mb-5 font-weight-light text-center">
				An easy to use online flash card maker!
			</p>
			<div className="d-flex justify-content-between mb-3">
				<SortCategoriesForm />
				{renderButton()}
			</div>
			<div className="d-flex justify-content-between mb-3">
				<FilterCategoriesForm />
				{renderSelectButton()}
			</div>
			{renderCategories()}
		</div>
	);
};

const mapStateToProps = ({ categories, form }) => {
	return {
		categories: sortCategories(filterCategories(categories, form), form),
		form
	};
};

export default connect(
	mapStateToProps,
	actions
)(Dashboard);
