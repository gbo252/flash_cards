import "../../css/CategoryList.css";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { CSSTransition } from "react-transition-group";

import CategoryListLabel from "./CategoryListLabel";

const CategoryList = ({ categories, categoriesDelete, reset, justDeleted }) => {
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
						onClick={e => e.currentTarget.blur()}
					/>
					<label
						className="label d-flex justify-content-center mb-0 w-100"
						htmlFor={input.name}
						style={{ cursor: "pointer" }}
					>
						<CategoryListLabel
							category={category}
							categoriesDelete={categoriesDelete}
						/>
					</label>
				</React.Fragment>
			);
		};

		return (
			<CSSTransition
				key={category._id}
				in={!justDeleted.includes(category._id)}
				timeout={500}
				classNames="opacity-transition"
				appear
			>
				<div className="cat-field d-flex justify-content-center my-sm-4">
					<Field
						component={categoryComponent}
						name={category._id}
						type="checkbox"
					/>
				</div>
			</CSSTransition>
		);
	});
};

const mapStateToProps = ({ categoriesDelete, justDeleted }) => {
	return { categoriesDelete, justDeleted };
};

export default reduxForm({
	form: "categoryDelete"
})(connect(mapStateToProps)(CategoryList));
