import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import PrivateRoute from "./PrivateRoute";

import Header from "./Header";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Category from "./Category";
import NewFlashCard from "./NewFlashCard";
import NewCategory from "./NewCategory";
import EditCategory from "./EditCategory";
import NotFound from "./NotFound";

const App = ({ fetchUser, auth }) => {
	React.useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<BrowserRouter>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path="/login" component={Login} />
					<PrivateRoute
						exact
						path="/dashboard"
						auth={auth}
						component={Dashboard}
					/>
					<PrivateRoute
						exact
						path="/dashboard/:category"
						auth={auth}
						component={Category}
					/>
					<PrivateRoute
						exact
						path="/new"
						auth={auth}
						component={NewCategory}
					/>
					<PrivateRoute
						exact
						path="/edit/:category"
						auth={auth}
						component={EditCategory}
					/>
					<PrivateRoute
						exact
						path="/dashboard/:category/new"
						auth={auth}
						component={NewFlashCard}
					/>
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(
	mapStateToProps,
	actions
)(App);
