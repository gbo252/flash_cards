import "../../css/App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

import PrivateRoute from "./PrivateRoute";

import Header from "../generic/Header";
import Login from "./Login";
import Dashboard from "../category/Dashboard";
import Category from "../flashCards/Category";
import NewFlashCard from "../forms/NewFlashCard";
import NotFound from "./NotFound";
import ModalDeleteCategory from "../modals/ModalDeleteCategory";
import ModalNewEditCategory from "../modals/ModalNewEditCategory";
import ToastComponent from "../generic/Toast";

const App = ({ fetchUser }) => {
	React.useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return (
		<BrowserRouter>
			<Header />
			<ModalNewEditCategory title="New" />
			<ModalNewEditCategory title="Edit" />
			<ModalDeleteCategory />
			<ToastComponent />
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

export default connect(null, actions)(App);
