import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
	const renderContent = () => {
		if (auth) {
			return (
				<a
					className="btn btn-outline-dark"
					role="button"
					href="/auth/logout"
				>
					Log Out
				</a>
			);
		}

		return null;
	};

	return (
		<nav className="navbar navbar-light bg-warning shadow">
			<Link to="/" className="navbar-brand">
				Flash Cards Online!
			</Link>
			{renderContent()}
		</nav>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
