import googleSignIn from "../images/google_signin.png";
import facebookSignIn from "../images/facebook_signin.png";
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Login = ({ auth, location }) => {
	const { from } = location.state || { from: { pathname: "/" } };

	if (auth) {
		return <Redirect to="/" />;
	}

	return (
		<div className="row mt-5 d-flex justify-content-center">
			<div className="card shadow-lg text-center text-white bg-danger mb-3">
				<div className="card-header">
					Welcome to Flash
					<br />
					Please Log In Below
				</div>
				<div className="card-body">
					<div className="card-title">
						<a href={`/auth/google?next=${from.pathname}`}>
							<img src={googleSignIn} alt="google sign in" />
						</a>
					</div>
					<div className="card-title">
						<a href="/auth/facebook">
							<img
								width="191px"
								src={facebookSignIn}
								alt="facebook sign in"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Login);
