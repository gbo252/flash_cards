import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ className, icon, login, from }) => {
	return (
		<div className="btn-group my-1">
			<a className={`btn btn-${className} d-flex align-items-center text-light disabled`} href="/">
				<FontAwesomeIcon
					icon={icon}
					style={{ width: "1.5rem", fontSize: "1.3rem" }}
				/>
			</a>
			<a
				className={`btn btn-${className}`}
				role="button"
				href={`/auth/${login.toLowerCase()}?next=${from}`}
				style={{ width: "12rem" }}
			>
				Sign in with {login}
			</a>
		</div>
	);
};
