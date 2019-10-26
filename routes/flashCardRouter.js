const express = require("express");
const flashCardRouter = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Category = mongoose.model("categories");

flashCardRouter.get("/:categoryId", requireLogin, async (req, res) => {
	const flashCards = await Category.findOne({
		_id: req.params.categoryId
	}).select({
		cards: 1
	});

	res.send(flashCards);
});

flashCardRouter.post("/", requireLogin, async (req, res) => {
	const { categoryId, header, content } = req.body;

	await Category.updateOne(
		{
			_id: categoryId
		},
		{
			$push: { cards: { header, content, lastEdited: Date.now() } }
		}
	).exec();

	res.send({});
});

module.exports = flashCardRouter;
