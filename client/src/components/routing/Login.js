import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

const Login = ({ auth, location }) => {
	const { from } = location.state || { from: { pathname: "/" } };

	if (auth) {
		return <Redirect to="/" />;
	}

	return (
		<div className="main d-flex flex-column align-items-center justify-content-center">
			<div className="btn-group my-1">
				<a
					className="btn btn-danger text-light disabled"
					href="/"
				>
					<FontAwesomeIcon
						icon={faGoogle}
						style={{ width: "1.5rem", fontSize: "1.3rem" }}
					/>
				</a>
				<a
					className="btn btn-danger"
					role="button"
					href={`/auth/google?next=${from.pathname}`}
					style={{ width: "12rem" }}
				>
					Sign in with Google
				</a>
			</div>
			<div className="btn-group my-1">
				<a
					className="btn btn-primary text-light disabled"
					href="/"
				>
					<FontAwesomeIcon
						icon={faFacebookF}
						style={{ width: "1.5rem", fontSize: "1.3rem" }}
					/>
				</a>
				<a
					className="btn btn-primary"
					role="button"
					href="/auth/facebook"
					style={{ width: "12rem" }}
				>
					Sign in with Facebook
				</a>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Login);
