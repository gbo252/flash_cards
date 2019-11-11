import "../../css/CategoryList.css";
import React from "react";
import { reduxForm, Field } from "redux-form";

import Label from "./Label";
import IconEditDelete from "./IconEditDelete";

const CategoryList = ({
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

	return categories.map(category => {
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
						<Label
							category={category}
							categoriesDelete={categoriesDelete}
						/>
					</label>
				</React.Fragment>
			);
		};

		return (
			<div key={category._id} className="d-flex my-3">
				<Field
					component={categoryComponent}
					name={category._id}
					type="checkbox"
				/>
				<div className="d-flex flex-column justify-content-center ml-4">
					<IconEditDelete
						action={setModalEditShow}
						text="edit"
						iconText="edit"
						setModalInfo={() =>
							setModalInfo({
								category: category.category,
								color: category.category
							})
						}
					/>
					<IconEditDelete
						action={setModalDeleteShow}
						text="delete"
						iconText="remove_circle_outline"
						setModalInfo={() =>
							setModalInfo({ _id: category._id, category })
						}
					/>
				</div>
			</div>
		);
	});
};

export default reduxForm({
	form: "categoryDelete"
})(CategoryList);
