import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

import Overlay from "react-bootstrap/Overlay";
import Tooltip from "../generic/Tooltip";

const ActionButtons = ({
	categories,
	form,
	categoriesDelete,
	dotsMenuShow,
	setCategoriesDelete,
	setModalInfo,
	setModalNewShow,
	setModalDeleteShow,
	setDotsMenuShow
}) => {
	const dotsRef = React.useRef(null);

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

	const deleteSelected = () => {
		const { values } = form.categoryDelete;
		const arrayOfIds = Object.keys(values).filter(id => values[id]);
		const categoryNames = arrayOfIds.map(id => {
			return categories.find(category => category._id === id).category;
		});
		setModalInfo({ categoryNames, arrayOfIds });
		setModalDeleteShow(true);
		setDotsMenuShow(false);
		setCategoriesDelete(false);
	};

	return (
		<React.Fragment>
			<Tooltip placement="top" text="New Category">
				<button
					className="btn btn-outline-danger rounded-circle"
					aria-label="Add New Category"
					onClick={e => {
						setModalInfo(null);
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
					setDotsMenuShow(!dotsMenuShow);
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
				show={dotsMenuShow}
				onHide={() => setDotsMenuShow(false)}
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
									setDotsMenuShow(false);
									setCategoriesDelete(!categoriesDelete);
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
		</React.Fragment>
	);
};

const mapStateToProps = ({
	dotsMenuShow,
	categories,
	form,
	categoriesDelete
}) => {
	return { dotsMenuShow, categories, form, categoriesDelete };
};

export default connect(mapStateToProps, actions)(ActionButtons);
