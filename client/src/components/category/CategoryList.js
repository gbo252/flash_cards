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
	setModalEditShow
}) => {
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

			const labelContents = (
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
						borderStyle: "outset"
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
								className="d-flex justify-content-center rounded-circle m-2"
								style={{
									width: "120px",
									height: "120px",
									backgroundColor: color
								}}
							>
								<button className="close">
									{/* <i
										className="text-black-50 material-icons"
										style={{ fontSize: "4.5rem" }}
									>
										check_circle
									</i> */}
									<div
										className="rounded-circle"
										style={{
											width: "70px",
											height: "70px",
											border: "5px solid gray"
										}}
									/>
								</button>
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
									borderWidth: "5px"
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
							<div style={{ width: "60px" }} />
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
							className="custom-control-input"
							type="checkbox"
						/>
						<label
							className="custom-control-label mb-0 w-100"
							htmlFor={input.name}
							style={{ cursor: "pointer" }}
						>
							{labelContents}
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
					<div style={{ width: "60px" }} />
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
