const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const sslRedirect = require('heroku-ssl-redirect');

require("./models/User");
require("./models/Category");
require("./models/Card");
require("./services/passport");

const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const flashCardRouter = require("./routes/flashCardRouter");

const app = express();

mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.catch(err => console.log(err));

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(sslRedirect());

app.use("/auth", authRouter);
app.use("/category-routes", categoryRouter);
app.use("/flashcards", flashCardRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (_req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
});
