import "../../css/CategoryList.css";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Label from "./Label";
import IconEditDelete from "./IconEditDelete";

const CategoryList = ({ categories, categoriesDelete, reset }) => {
	React.useEffect(() => {
		if (!categoriesDelete) {
			reset("categoryDelete");
		}
	}, [categoriesDelete, reset]);

	return categories.map(cat => {
		const categoryComponent = ({ input }) => {
			return (
				<React.Fragment>
					<input
						{...input}
						id={input.name}
						className="category-select custom-control-input"
						type="checkbox"
						onClick={e => e.currentTarget.blur()}
					/>
					<label
						className="label mb-0 w-100"
						htmlFor={input.name}
						style={{ cursor: "pointer" }}
					>
						<Label
							category={cat}
							categoriesDelete={categoriesDelete}
						/>
					</label>
				</React.Fragment>
			);
		};

		const { _id, category, color } = cat;

		return (
			<div key={_id} className="d-flex my-3">
				<Field
					component={categoryComponent}
					name={_id}
					type="checkbox"
				/>
				<div className="d-flex flex-column justify-content-center ml-4">
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
		);
	});
};

const mapStateToProps = ({ categoriesDelete }) => {
	return { categoriesDelete };
};

export default reduxForm({
	form: "categoryDelete"
})(connect(mapStateToProps)(CategoryList));
