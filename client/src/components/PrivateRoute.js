import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, auth, ...rest }) => {
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
						return <Component {...props} />;
				}
			}}
		/>
	);
};
