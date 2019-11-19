import "../../css/CategoryList.css";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { CSSTransition } from "react-transition-group";

import Label from "./Label";

const CategoryList = ({ categories, categoriesDelete, reset, justDeleted }) => {
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
						className="label d-flex justify-content-center mb-0 w-100"
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

		return (
			<CSSTransition
				key={cat._id}
				in={!justDeleted.includes(cat._id)}
				timeout={500}
				classNames="cat-label"
			>
				<div className="d-flex justify-content-center my-3">
					<Field
						component={categoryComponent}
						name={cat._id}
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
