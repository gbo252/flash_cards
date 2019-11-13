import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "../Tooltip";

import CategoryList from "./CategoryList";
import Spinner from "../Spinner";
import ModalDeleteCategory from "../modals/ModalDeleteCategory";
import ModalNewEditCategory from "../modals/ModalNewEditCategory";
import Toast from "../Toast";
import SortCategoriesForm, {
	sortCategories
} from "../forms/SortCategoriesForm";
import FilterCategoriesForm, {
	filterCategories
} from "../forms/FilterCategoriesForm";

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
	const [modalDeleteManyShow, setModalDeleteManyShow] = useState(false);
	const [modalEditShow, setModalEditShow] = useState(false);
	const [modalNewShow, setModalNewShow] = useState(false);

	const [toastNewShow, setToastNewShow] = useState(false);
	const [toastEditShow, setToastEditShow] = useState(false);
	const [toastDeleteShow, setToastDeleteShow] = useState(false);

	const [dotsMenu, dotsMenuShow] = useState(false);
	const [categoriesDelete, setCategoriesDelete] = useState(false);
	const dotsRef = useRef(null);

	useEffect(() => {
		fetchCategories();
		clearFlashCards();
	}, [fetchCategories, clearFlashCards]);

	const renderSelectedNumber = () => {
		if (!categoriesDelete) {
			return null;
		}
		if (form.categoryDelete) {
			if (form.categoryDelete.values) {
				const { values } = form.categoryDelete;
				const total = Object.keys(values).filter(id => values[id])
					.length;
				return (
					<small className="form-text text-danger">
						{total} categories selected
					</small>
				);
			}
		}
		return (
			<small className="form-text text-danger">
				0 categories selected
			</small>
		);
	};

	const renderButton = () => {
		if (categories) {
			const atts = {};
			if (form.categoryDelete) {
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

			return (
				<div>
					<Tooltip placement="top" text="New Category">
						<button
							className="btn btn-outline-danger rounded-circle"
							aria-label="Add New Category"
							onClick={e => {
								setModalNewShow(true);
								setCategoriesDelete(false);
								e.currentTarget.blur();
							}}
							style={{ width: "70px", height: "70px" }}
						>
							<i
								className="material-icons"
								style={{
									fontSize: "2.5rem",
									verticalAlign: "top"
								}}
							>
								add
							</i>
						</button>
					</Tooltip>
					<button
						ref={dotsRef}
						className="btn btn-outline-secondary rounded-circle ml-2"
						onClick={e => {
							dotsMenuShow(!dotsMenu);
							e.currentTarget.blur();
						}}
						style={{ width: "70px", height: "70px" }}
					>
						<i
							className="material-icons"
							style={{
								fontSize: "2.5rem",
								verticalAlign: "top"
							}}
						>
							more_horiz
						</i>
					</button>
					<Overlay
						target={dotsRef.current}
						show={dotsMenu}
						onHide={() => dotsMenuShow(false)}
						placement="right"
						rootClose
					>
						{({
							placement,
							scheduleUpdate,
							arrowProps,
							outOfBoundaries,
							show: _show,
							...props
						}) => {
							return (
								<div
									{...props}
									className="d-flex flex-column justify-content-around rounded border bg-light ml-2 p-2"
									style={{ ...props.style }}
								>
									<button
										type="button"
										className="btn btn-secondary rounded-pill mb-2"
										onClick={() => {
											dotsMenuShow(false);
											setCategoriesDelete(
												!categoriesDelete
											);
										}}
									>
										{categoriesDelete
											? "Deselect Categories"
											: "Select Categories"}
									</button>
									<button
										type="button"
										{...atts}
										className="btn btn-danger rounded-pill"
										onClick={deleteSelected}
									>
										Delete Selected
									</button>
								</div>
							);
						}}
					</Overlay>
				</div>
			);
		}
	};

	const deleteSelected = () => {
		const { values } = form.categoryDelete;
		const arrayOfIds = Object.keys(values).filter(id => values[id]);
		const categoryNames = arrayOfIds.map(id => {
			return categories.find(category => category._id === id).category;
		});
		setModalInfo({ categoryNames, arrayOfIds });
		setModalDeleteManyShow(true);
		dotsMenuShow(false);
		setCategoriesDelete(false);
	};

	const renderCategories = () => {
		if (!categories) {
			return <Spinner />;
		} else if (categories.length > 0) {
			return (
				<div className="mb-4 mt-2">
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
				modalShow={modalNewShow}
				setModalShow={setModalNewShow}
				setToastShow={setToastNewShow}
			/>
			<ModalNewEditCategory
				modalInfo={modalInfo}
				action={editCategory}
				title="Edit"
				modalShow={modalEditShow}
				setModalShow={setModalEditShow}
				setToastShow={setToastEditShow}
			/>
			<ModalDeleteCategory
				modalInfo={modalInfo}
				action={deleteCategory}
				modalShow={modalDeleteShow}
				setModalShow={setModalDeleteShow}
				setToastShow={setToastDeleteShow}
			/>
			<ModalDeleteCategory
				modalInfo={modalInfo}
				action={deleteCategories}
				modalShow={modalDeleteManyShow}
				setModalShow={setModalDeleteManyShow}
				setToastShow={setToastDeleteShow}
			/>
			<Toast
				content="New category created"
				toastShow={toastNewShow}
				setToastShow={setToastNewShow}
			/>
			<Toast
				content="Category edited successfully"
				toastShow={toastEditShow}
				setToastShow={setToastEditShow}
			/>
			<Toast
				content="Categories successfully deleted"
				toastShow={toastDeleteShow}
				setToastShow={setToastDeleteShow}
			/>
			<h1 className="display-3 text-center">Flash Cards Online</h1>
			<p className="h4 mb-5 font-weight-light text-center">
				An easy to use online flash card maker!
			</p>
			<div className="d-flex justify-content-between">
				<FilterCategoriesForm />
				{renderSelectedNumber()}
			</div>
			<div className="d-flex justify-content-between">
				<SortCategoriesForm />
				{renderButton()}
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

export default connect(mapStateToProps, actions)(Dashboard);
