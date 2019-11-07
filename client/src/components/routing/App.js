import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

import PrivateRoute from "./PrivateRoute";

import Header from "../Header";
import Login from "../Login";
import Dashboard from "../category/Dashboard";
import Category from "../flashCards/Category";
import NewFlashCard from "../NewFlashCard";
import NotFound from "./NotFound";

const App = ({ fetchUser }) => {
	React.useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<BrowserRouter>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/" component={Dashboard} />
					<PrivateRoute
						exact
						path="/categories/:category"
						component={Category}
					/>
					<PrivateRoute
						exact
						path="/categories/:category/new-flash-card"
						component={NewFlashCard}
					/>
					<Route path="/404" component={NotFound} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default connect(
	null,
	actions
)(App);
