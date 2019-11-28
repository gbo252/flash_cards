import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ className, icon, login, from, loading, setLoading }) => {
	const renderButton = () => {
		if (!loading) {
			return (
				<a
					className={`btn btn-${className}`}
					role="button"
					href={`/auth/${login.toLowerCase()}?next=${from}`}
					style={{ width: "12rem" }}
					onClick={() => setLoading(true)}
				>
					Sign in with {login}
				</a>
			);
		} else {
			return (
				<button
					className={`btn btn-${className}`}
					type="button"
					style={{ width: "12rem" }}
					disabled
				>
					<span
						className="spinner-border spinner-border-sm mr-1"
						role="status"
						aria-hidden="true"
					></span>
					Loading...
				</button>
			);
		}
	};

	return (
		<div className="btn-group my-1">
			<a
				className={`btn btn-${className} d-flex align-items-center text-light disabled`}
				href="/"
			>
				<FontAwesomeIcon
					icon={icon}
					style={{ width: "1.5rem", fontSize: "1.3rem" }}
				/>
			</a>
			{renderButton()}
		</div>
	);
};
