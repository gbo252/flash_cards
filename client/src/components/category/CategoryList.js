import "../../css/CategoryList.css";
import React from "react";
import { Link } from "react-router-dom";

import IconEditDelete from "./IconEditDelete";

export default ({
	categories,
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

			return (
				<div key={_id} className="d-flex my-4">
					<div
						className="category-card rounded-pill ml-5 w-100"
						style={{ borderColor: color }}
					>
						<Link
							to={`/categories/${category}`}
							style={{ textDecoration: "none" }}
						>
							<div className="d-flex justify-content-between">
								<div className="d-flex align-items-center">
									<div
										className="d-inline-block rounded-circle m-2"
										style={{
											width: "120px",
											height: "120px",
											backgroundColor: color
										}}
									/>
									<p
										className="ml-3 h1 text-body font-weight-light text-center"
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
									<div style={{ width: "75px" }} />
								</div>
							</div>
						</Link>
					</div>
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
