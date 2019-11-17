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
		<div className="d-flex flex-column mt-4 mt-xl-5 pt-5">
			<h1 className="display-3 text-center mb-0">Flash Cards Online</h1>
			<p className="h4 mb-2 font-weight-light text-center">
				A simple online flash card maker!
			</p>
			<div className="d-flex justify-content-center mb-2">
				{renderSquares()}
			</div>
			<div className="d-flex flex-wrap justify-content-center justify-content-sm-between">
				<div className="d-flex flex-column">
					<SortCategoriesForm />
					<FilterCategoriesForm />
					<div
						className="align-self-center"
						style={{ height: "23px" }}
					>
						<Field name="filter" component={FormErrorMessage} />
					</div>
				</div>
				<div className="action-buttons d-flex">
					<ActionButtons />
					<div
						className="align-self-center"
						style={{ height: "23px" }}
					>
						<NumberSelected />
					</div>
				</div>
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
