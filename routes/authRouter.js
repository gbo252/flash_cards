const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get(
	"/google",
	(req, res, next) => {
		process.env.REDIRECT = req.query.next;
		next();
	},
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google"),
	(req, res) => {
		res.redirect(`${process.env.REDIRECT}`);
	}
);

authRouter.get(
	"/facebook",
	(req, res, next) => {
		process.env.REDIRECT = req.query.next;
		next();
	},
	passport.authenticate("facebook", {
		scope: ["public_profile", "email"]
	})
);

authRouter.get(
	"/facebook/callback",
	passport.authenticate("facebook"),
	(req, res) => {
		res.redirect(`${process.env.REDIRECT}`);
	}
);

authRouter.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/login");
});

authRouter.get("/current_user", (req, res) => {
	res.send(req.user);
});

module.exports = authRouter;
