import googleSignIn from "../images/google_signin.png";
import googleSignInFocus from "../images/google_signin_focus.png";
import googleSignInPressed from "../images/google_signin_pressed.png";
import facebookSignIn from "../images/facebook_signin.png";
import React from "react";
import { connect } from "react-redux";

const Login = ({ auth, history }) => {
	const renderContent = () => {
		switch (auth) {
			case null:
				return null;
			case false:
				return (
					<div className="card shadow-lg text-center text-white bg-danger mb-3">
						<div className="card-header">
							Welcome to Flash
							<br />
							Please Log In Below
						</div>
						<div className="card-body">
							<div className="card-title">
								<a href="/auth/google">
									<img
										onMouseOver={e =>
											(e.currentTarget.src = googleSignInFocus)
										}
										onMouseOut={e =>
											(e.currentTarget.src = googleSignIn)
										}
										onMouseDown={e =>
											(e.currentTarget.src = googleSignInPressed)
										}
										src={googleSignIn}
										alt="google sign in"
									/>
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
				);
			default:
				setTimeout(() => {
					history.push("/dashboard");
				}, 100);
		}
	};

	return <div className="row mt-5 d-flex justify-content-center">{renderContent()}</div>;
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Login);
