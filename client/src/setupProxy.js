const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(
		proxy(["/auth", "/category-routes", "/flashcards"], {
			target: "http://localhost:5000"
		})
	);
};
