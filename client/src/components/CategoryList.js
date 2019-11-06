import "../css/CategoryList.css";
import React from "react";
import { Link } from "react-router-dom";

export default ({ categories, setModalInfo }) => {
	return categories.map(
		({ _id, category, color, lastEdited, dateCreated, cardsTotal }) => {
			return (
				<div key={_id} className="d-flex my-4">
					<div
						className="category-card rounded-pill ml-5 w-100"
						style={{ border: `3px solid ${color}` }}
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
										<li className="border-bottom py-1">
											Total Cards:{" "}
											<span className="h6">
												{cardsTotal}
											</span>
										</li>
										<li className="border-bottom py-1">
											Last Updated:{" "}
											<span className="h6">
												{new Date(
													lastEdited
												).toLocaleDateString("en-GB")}
											</span>
										</li>
										<li className="py-1">
											Date Created:{" "}
											<span className="h6">
												{new Date(
													dateCreated
												).toLocaleDateString("en-GB")}
											</span>
										</li>
									</ul>
									<div style={{ width: "75px" }} />
								</div>
							</div>
						</Link>
					</div>
					<div className="d-flex align-items-center ml-4">
						<button
							type="button"
							className="close delete-category"
							data-toggle="modal"
							data-target="#action-modal"
							onClick={() => setModalInfo({ _id, category })}
						>
							<i
								className="text-black-50 material-icons"
								style={{ fontSize: "2.5rem" }}
							>
								remove_circle_outline
							</i>
						</button>
					</div>
				</div>
			);
		}
	);
};
