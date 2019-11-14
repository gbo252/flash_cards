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
		<div className="d-flex flex-column mt-4 mt-xl-5 pt-5">
			<h1 className="position-relative display-3 text-center mb-0">
				Flash Cards Online
				<span className="d-none d-md-inline-block position-absolute ml-2 ml-md-5">
					<ActionButtons screen="large" />
				</span>
			</h1>
			<p className="h4 mb-2 font-weight-light text-center">
				A simple online flash card maker!
			</p>
			<div className="d-flex justify-content-center">
				{renderSquares()}
			</div>
			<div className="row mt-4 mt-lg-2">
				<div className="col-12 col-md mb-1 mb-sm-0 py-0 py-sm-2">
					<SortCategoriesForm />
				</div>
				<div className="col d-none d-lg-block text-center">
					<NumberSelected />
					<Field name="filter" component={FormErrorMessage} />
				</div>
				<div className="col-12 col-md py-0 py-sm-2">
					<FilterCategoriesForm />
				</div>
			</div>
			<div className="d-lg-none clearfix" style={{ height: "23px" }}>
				<div className="float-left mx-3">
					<NumberSelected />
				</div>
				<div className="float-right mx-3 mr-sm-5">
					<Field name="filter" component={FormErrorMessage} />
				</div>
			</div>
			<div className="d-flex d-md-none justify-content-center">
				<ActionButtons screen="small" />
			</div>
			<div className="mb-4 mt-lg-2">{renderCategories()}</div>
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
