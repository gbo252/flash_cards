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

	return categories.map(categ => {
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
							category={categ}
							categoriesDelete={categoriesDelete}
						/>
					</label>
				</React.Fragment>
			);
		};

		const { _id, category, color } = categ;

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
						text="Edit"
						iconText="edit"
						setModalInfo={() => setModalInfo({ category, color })}
					/>
					<IconEditDelete
						action={setModalDeleteShow}
						text="Delete"
						iconText="remove_circle_outline"
						setModalInfo={() => setModalInfo({ _id, category })}
					/>
				</div>
			</div>
		);
	});
};

export default reduxForm({
	form: "categoryDelete"
})(CategoryList);
