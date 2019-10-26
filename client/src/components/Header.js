import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
	function renderContent() {
		switch (auth) {
			case null:
				return null;
			case false:
				return null;
			default:
				return (
					<li>
						<a
							className="waves-effect waves-light btn blue-grey lighten-5 black-text"
							href="/auth/logout"
						>
							Log Out
						</a>
					</li>
				);
		}
	}

	return (
		<nav className="nav-wrapper deep-orange lighten-1 z-depth-3">
			<Link to="/" className="brand-logo" style={{ marginLeft: "20px" }}>
				Flash!
			</Link>
			<ul className="right">{renderContent()}</ul>
		</nav>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
