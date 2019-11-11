import "../../css/CategoryList.css";
import React from "react";
import { reduxForm, Field } from "redux-form";

import IconEditDelete from "./IconEditDelete";

const CategoryList = ({
	history,
	categories,
	categoriesDelete,
	setModalInfo,
	setModalDeleteShow,
	setModalEditShow,
	reset
}) => {
	React.useEffect(() => {
		if (!categoriesDelete) {
			reset("categoryDelete");
		}
	}, [categoriesDelete, reset]);

	return categories.map(
		({ _id, category, color, lastEdited, dateCreated, cardsTotal }) => {
			const infoList = {
				"Total Cards": cardsTotal,
				"Last Updated": new Date(lastEdited).toLocaleDateString(
					"en-GB"
				),
				"Date Created": new Date(dateCreated).toLocaleDateString(
					"en-GB"
				)
			};

			const label = (
				<div
					className={
						"rounded-pill ml-5 w-100" +
						(categoriesDelete
							? " category-delete"
							: " category-card")
					}
					style={{
						borderColor: color,
						borderWidth: "5px",
						userSelect: "none"
					}}
					onClick={() => {
						if (!categoriesDelete) {
							history.push(`/categories/${category}`);
						}
					}}
				>
					<div className="d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<div
								className="d-flex justify-content-center align-items-center rounded-circle m-2"
								style={{
									width: "120px",
									height: "120px",
									backgroundColor: categoriesDelete
										? null
										: color
								}}
							>
								<div
									className="position-absolute rounded-circle"
									style={{
										width: "120px",
										height: "120px",
										borderWidth: "5px",
										borderStyle: "solid",
										borderColor: categoriesDelete
											? color
											: "transparent"
									}}
								/>
								<i
									className="text-black-50 material-icons d-none"
									style={{
										fontSize: "134px",
										verticalAlign: "top"
									}}
								>
									check_circle
								</i>
							</div>
							<p
								className="ml-3 h1 font-weight-light text-center"
								style={{ letterSpacing: "2px" }}
							>
								{category}
							</p>
						</div>
						<div className="d-flex align-items-center">
							<ul
								className="text-muted border-left mb-0 pl-3"
								style={{
									listStyleType: "none",
									borderWidth: "5px",
									marginRight: "45px"
								}}
							>
								{Object.keys(infoList).map(info => {
									const infoContent = infoList[info];
									return (
										<li
											key={info}
											className="border-bottom py-1"
										>
											{info}:{" "}
											<span className="h6">
												{infoContent}
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			);

			const categoryComponent = ({ input }) => {
				return (
					<React.Fragment>
						<input
							{...input}
							id={input.name}
							className="category-select custom-control-input"
							type="checkbox"
						/>
						<label
							className="label mb-0 w-100"
							htmlFor={input.name}
							style={{ cursor: "pointer" }}
						>
							{label}
						</label>
					</React.Fragment>
				);
			};

			return (
				<div key={_id} className="d-flex my-3">
					<Field
						component={categoryComponent}
						name={_id}
						type="checkbox"
					/>
					<div className="d-flex flex-column justify-content-center ml-4">
						<IconEditDelete
							action={setModalEditShow}
							text="edit"
							iconText="edit"
							setModalInfo={() =>
								setModalInfo({ category, color })
							}
						/>
						<IconEditDelete
							action={setModalDeleteShow}
							text="delete"
							iconText="remove_circle_outline"
							setModalInfo={() => setModalInfo({ _id, category })}
						/>
					</div>
				</div>
			);
		}
	);
};

export default reduxForm({
	form: "categoryDelete"
})(CategoryList);
