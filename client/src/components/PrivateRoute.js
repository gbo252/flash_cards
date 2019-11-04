import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import { fetchCategories } from "../actions";

const PrivateRoute = ({
	component: Component,
	auth,
	categories,
	fetchCategories,
	history,
	...rest
}) => {
	const [validCategory, setValidCategory] = React.useState(false);

	const { category } = { ...rest }.computedMatch.params;

	React.useEffect(() => {
		if (category) {
			if (!categories) {
				fetchCategories();
			} else {
				const categoryNames = categories.map(x =>
					x.category.toLowerCase()
				);
				!categoryNames.includes(category.toLowerCase())
					? history.push("/404")
					: setValidCategory(true);
			}
		}
	}, [fetchCategories, categories, category, history]);

	return (
		<Route
			{...rest}
			render={props => {
				switch (auth) {
					case null:
						return null;
					case false:
						return (
							<Redirect
								to={{
									pathname: "/login",
									state: { from: props.location }
								}}
							/>
						);
					default:
						if (category) {
							return validCategory ? (
								<Component {...props} />
							) : null;
						}
						return <Component {...props} />;
				}
			}}
		/>
	);
};

const mapStateToProps = ({ auth, categories }) => {
	return { auth, categories };
};

export default connect(
	mapStateToProps,
	{ fetchCategories }
)(withRouter(PrivateRoute));
