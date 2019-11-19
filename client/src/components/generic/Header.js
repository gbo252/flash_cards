import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import ButtonsAddSelect from "../category/ButtonsAddSelect";

const Header = ({ auth, location }) => {
	const renderDashboardButtons = () => {
		if (location.pathname === "/" && auth) {
			return <ButtonsAddSelect />;
		}
		return null;
	};

	const renderContent = () => {
		if (auth) {
			return (
				<a
					className="btn btn-outline-dark rounded-pill ml-1 ml-md-4"
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
		<nav
			className="navbar navbar-expand-md fixed-top navbar-light bg-light"
			style={{ borderBottom: "2px solid rgba(148, 148, 148, 0.8)" }}
		>
			<Link to="/" className="navbar-brand">
				Flash Cards Online
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#header-bar"
				aria-controls="header-bar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="header-bar">
				<div
					className="navbar-nav mr-auto mt-2 mt-lg-0"
					style={{ width: "5px" }}
				/>
				<div>
					{renderDashboardButtons()}
					{renderContent()}
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(withRouter(Header));
