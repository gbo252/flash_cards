import googleSignIn from "../images/google_signin.png";
import googleSignInFocus from "../images/google_signin_focus.png";
import googleSignInPressed from "../images/google_signin_pressed.png";
import facebookSignIn from "../images/facebook_signin.png";
import React from "react";
import { connect } from "react-redux";

const Login = ({ auth, history }) => {
	function renderContent() {
		switch (auth) {
			case null:
				return null;
			case false:
				return (
					<div>
						<h5>Welcome to Flash</h5>
						<h6>Please log in below</h6>
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
						<a href="/auth/facebook">
							<img width="191px" src={facebookSignIn} alt="facebook sign in" />
						</a>
					</div>
				);
			default:
				setTimeout(() => {
					history.push("/dashboard");
				}, 100);
		}
	}

	return <div style={{ textAlign: "center" }}>{renderContent()}</div>;
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Login);
