const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(
		proxy(["/auth", "/categories", "/flashcards"], { target: "http://localhost:5000" })
	);
};