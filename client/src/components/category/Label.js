import React from "react";
import { withRouter } from "react-router-dom";

import ButtonsEditDelete from "./ButtonsEditDelete";

const Label = ({
	history,
	categoriesDelete,
	category: { _id, category, color, lastEdited, dateCreated, cardsTotal }
}) => {
	const infoList = {
		"Total Cards": cardsTotal,
		"Last Updated": new Date(lastEdited).toLocaleDateString("en-GB"),
		"Date Created": new Date(dateCreated).toLocaleDateString("en-GB")
	};

	return (
		<div
			className={
				"rounded-pill " +
				(categoriesDelete ? "category-delete" : "category-card")
			}
			style={{
				borderColor: color,
				backgroundClip: "padding-box",
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
						className="cat-circle d-flex flex-shrink-0 justify-content-center align-items-center rounded-circle m-2"
						style={{
							backgroundColor: categoriesDelete ? null : color,
							borderStyle: "solid",
							borderColor: categoriesDelete
								? color
								: "transparent"
						}}
					>
						<i
							className="check-circle text-black-50 material-icons d-none"
							style={{ verticalAlign: "top" }}
						>
							check_circle
						</i>
					</div>
					<p
						className="mx-0 mx-sm-3 h1 font-weight-light text-wrap text-break"
						style={{ letterSpacing: "2px" }}
					>
						{category}
					</p>
				</div>
				<div className="d-lg-none dropleft mr-sm-3 mt-3">
					<button
						onClick={e => e.stopPropagation()}
						className="close"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i
							className="text-black-50 material-icons"
							style={{ fontSize: "2.5rem" }}
						>
							more_vert
						</i>
					</button>
					<div
						className="dropdown-menu"
						aria-labelledby="dropdownMenuButton"
						onClick={e => e.stopPropagation()}
					>
						<ButtonsEditDelete
							type="menu"
							text="Edit"
							modalInfo={{ category, color }}
						/>
						<ButtonsEditDelete
							type="menu"
							text="Delete"
							modalInfo={{ _id, category, color }}
						/>
						<div className="dropdown-divider"></div>
						<span className="dropdown-item-text px-2">
							{Object.keys(infoList).map(info => {
								const infoContent = infoList[info];
								return (
									<p key={info} className="text-muted mb-0">
										{info}:{" "}
										<span className="h6">
											<small>{infoContent}</small>
										</span>
									</p>
								);
							})}
						</span>
					</div>
				</div>
				<div className="d-none d-lg-flex">
					<div className="mr-2 d-flex align-items-center text-nowrap">
						<ul
							className="list-unstyled text-muted border-left border-right mb-0 px-2"
							style={{ borderWidth: "5px" }}
						>
							{Object.keys(infoList).map(info => {
								const infoContent = infoList[info];
								return (
									<li
										key={info}
										className="info-items border-bottom py-1 px-3"
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
					<div className="mr-4 d-flex flex-column justify-content-center">
						<ButtonsEditDelete
							type="button"
							text="Edit"
							modalInfo={{ category, color }}
						/>
						<ButtonsEditDelete
							type="button"
							text="Delete"
							modalInfo={{ _id, category, color }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Label);
