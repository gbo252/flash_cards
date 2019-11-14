import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { FormErrorMessage } from "../forms/FormField";
import * as actions from "../../actions";

import CategoryList from "./CategoryList";
import ActionButtons from "./ActionButtons";
import Spinner from "../generic/Spinner";
import NumberSelected from "./NumberSelected";
import { colors } from "../generic/colors";
import SortCategoriesForm, {
	sortCategories
} from "../forms/SortCategoriesForm";
import FilterCategoriesForm, {
	filterCategories
} from "../forms/FilterCategoriesForm";

const Dashboard = ({ fetchCategories, clearFlashCards, categories }) => {
	React.useEffect(() => {
		fetchCategories();
		clearFlashCards();
	}, [fetchCategories, clearFlashCards]);

	const [shuffledColors, setShuffledColors] = React.useState([]);

	React.useEffect(() => {
		setShuffledColors(_.shuffle(colors));
	}, []);

	const renderSquares = () => {
		return shuffledColors.map(color => {
			return (
				<div
					key={color}
					className="mx-2"
					style={{
						width: "30px",
						height: "30px",
						borderRadius: "5px",
						backgroundColor: color
					}}
				/>
			);
		});
	};

	const renderCategories = () => {
		if (!categories) {
			return <Spinner />;
		} else if (categories.length > 0) {
			return <CategoryList categories={categories} />;
		} else {
			return <div className="h5 text-center">No Categories</div>;
		}
	};

	return (
		<div className="d-flex flex-column mt-1">
			<h1 className="position-relative display-3 text-center mb-0">
				Flash Cards Online
				<span className="position-absolute ml-5">
					<ActionButtons />
				</span>
			</h1>
			<p className="h4 mb-3 font-weight-light text-center">
				A simple online flash card maker!
			</p>
			<div className="d-flex justify-content-center">
				{renderSquares()}
			</div>
			<div className="d-flex justify-content-between">
				<SortCategoriesForm />
				<div className="text-center" style={{ flex: "1 1 0px" }}>
					<NumberSelected />
					<Field name="filter" component={FormErrorMessage} />
				</div>
				<FilterCategoriesForm />
			</div>
			<div className="mb-4 mt-2">{renderCategories()}</div>
		</div>
	);
};

const mapStateToProps = ({ categories, form }) => {
	return {
		categories: sortCategories(filterCategories(categories, form), form)
	};
};

export default reduxForm({
	form: "categoriesFilter"
})(connect(mapStateToProps, actions)(Dashboard));
