import React from "react";
import { withRouter } from "react-router-dom";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import IconEditDelete from "./IconEditDelete";

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

	const renderInfoList = () => {
		return Object.keys(infoList).map(info => {
			const infoContent = infoList[info];
			return (
				<li key={info} className="info-items border-bottom py-1 px-3">
					{info}: <span className="h6">{infoContent}</span>
				</li>
			);
		});
	};

	const infoPopover = ({
		placement,
		scheduleUpdate,
		arrowProps,
		outOfBoundaries,
		show: _show,
		...props
	}) => (
		<ul {...props} className="mb-0 list-unstyled bg-light rounded border">
			{renderInfoList()}
		</ul>
	);

	return (
		<div
			className={
				"rounded-pill" +
				(categoriesDelete ? " category-delete" : " category-card")
			}
			style={{
				borderColor: color,
				borderWidth: "5px",
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
							borderWidth: "5px",
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
				<OverlayTrigger placement="top" overlay={infoPopover}>
					<div
						className="d-lg-none close mr-4 mt-3"
						onClick={e => e.stopPropagation()}
					>
						<i
							className="text-black-50 material-icons"
							style={{ fontSize: "2rem" }}
						>
							info_outline
						</i>
					</div>
				</OverlayTrigger>
				<div className="d-flex">
					<div className="mr-2 d-none d-lg-flex align-items-center text-nowrap">
						<ul
							className="list-unstyled text-muted border-left border-right mb-0 px-2"
							style={{ borderWidth: "5px" }}
						>
							{renderInfoList()}
						</ul>
					</div>
					<div className="mr-4 d-flex flex-column justify-content-center">
						<IconEditDelete
							text="Edit"
							modalInfo={{ category, color }}
						/>
						<IconEditDelete
							text="Delete"
							modalInfo={{ _id, category }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Label);
