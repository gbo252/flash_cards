import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import * as actions from "../../actions";

import CategoryList from "./CategoryList";
import Spinner from "../generic/Spinner";
import { colors } from "../generic/colors";
import SortCategoriesForm, {
	sortCategories
} from "../forms/SortCategoriesForm";
import FilterCategoriesForm, {
	filterCategories
} from "../forms/FilterCategoriesForm";

const Dashboard = ({ fetchCategories, clearFlashCards, categories, form }) => {
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
						width: "2rem",
						height: "2rem",
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
		<div className="main d-flex flex-column">
			<h1 className="display-3 text-center mb-0">Flash Cards Online</h1>
			<p className="h4 mb-2 font-weight-light text-center">
				A simple online flash card maker!
			</p>
			<div className="d-flex justify-content-center mb-2">
				{renderSquares()}
			</div>
			<div className="d-flex flex-wrap justify-content-center justify-content-md-between">
				<SortCategoriesForm />
				<FilterCategoriesForm forms={form} />
			</div>
			<div className="mt-lg-2">{renderCategories()}</div>
		</div>
	);
};

const mapStateToProps = ({ categories, form }) => {
	return {
		categories: sortCategories(filterCategories(categories, form), form),
		form
	};
};

export default reduxForm({
	form: "categoriesFilter"
})(connect(mapStateToProps, actions)(Dashboard));
