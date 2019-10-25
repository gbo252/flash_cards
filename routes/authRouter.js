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
		// once logged in, redirect to other page?
		res.redirect("/");
	}
);

authRouter.get("/facebook", passport.authenticate("facebook"));

authRouter.get(
	"/facebook/callback",
	passport.authenticate("facebook"),
	(req, res) => {
		// once logged in, redirect to other page?
		res.redirect("/");
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
