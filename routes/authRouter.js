const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google"),
	(req, res) => {
		res.redirect("/dashboard");
	}
);

authRouter.get(
	"/facebook",
	passport.authenticate("facebook", {
		scope: ["public_profile", "email"]
	})
);

authRouter.get(
	"/facebook/callback",
	passport.authenticate("facebook"),
	(req, res) => {
		res.redirect("/dashboard");
	}
);

authRouter.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

authRouter.get("/current_user", (req, res) => {
	res.send(req.user);
});

module.exports = authRouter;
