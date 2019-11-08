import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import CategoryList from "./CategoryList";
import Spinner from "../Spinner";
import ModalDeleteCategory from "../modals/ModalDeleteCategory";
import ModalNewEditCategory from "../modals/ModalNewEditCategory";
import SortCategoriesForm, { sortCategories } from "./SortCategoriesForm";
import FilterCategoriesForm, { filterCategories } from "./FilterCategoriesForm";

const Dashboard = ({
	fetchCategories,
	clearFlashCards,
	categories,
	deleteCategory,
	editCategory,
	newCategory
}) => {
	const [modalInfo, setModalInfo] = React.useState(null);
	const [modalDeleteShow, setModalDeleteShow] = React.useState(false);
	const [modalEditShow, setModalEditShow] = React.useState(false);
	const [modalNewShow, setModalNewShow] = React.useState(false);

	React.useEffect(() => {
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

	const renderCategories = () => {
		if (!categories) {
			return <Spinner />;
		} else if (categories.length > 0) {
			return (
				<div className="my-4">
					<CategoryList
						categories={categories}
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
			<FilterCategoriesForm />
			{renderCategories()}
		</div>
	);
};

const mapStateToProps = ({ categories, form }) => {
	return {
		categories: sortCategories(filterCategories(categories, form), form)
	};
};

export default connect(
	mapStateToProps,
	actions
)(Dashboard);
