import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Category from "./Category";
import NewFlashCard from "./NewFlashCard";
import NewCategory from "./NewCategory";

const App = ({ fetchUser }) => {
	React.useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<BrowserRouter>
			<Header />
			<div className="container">
				<Route exact path="/" component={Login} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/newCategory" component={NewCategory} />
				<Route exact path="/dashboard/:category" component={Category} />
				<Route
					path="/dashboard/:category/new"
					component={NewFlashCard}
				/>
			</div>
		</BrowserRouter>
	);
};

export default connect(
	null,
	actions
)(App);
