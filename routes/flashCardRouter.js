const express = require("express");
const flashCardRouter = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Category = mongoose.model("categories");

flashCardRouter.get("/:category", requireLogin, async (req, res) => {
	const flashCards = await Category.findOne({
		category: req.params.category,
		_user: req.user.id
	}).select({
		cards: 1
	});

	res.send(flashCards);
});

flashCardRouter.post("/:category", requireLogin, async (req, res) => {
	const { header, content } = req.body;

	const flashCards = await Category.findOneAndUpdate(
		{
			category: req.params.category,
			_user: req.user.id
		},
		{
			$push: { cards: { header, content, lastEdited: Date.now() } },
			lastEdited: Date.now()
		},
		{ new: true }
	).exec();

	res.send(flashCards);
});

flashCardRouter.delete("/:category/:id", requireLogin, async (req, res) => {
	await Category.updateOne(
		{
			category: req.params.category,
			_user: req.user.id
		},
		{
			$pull: { cards: { _id: req.params.id } },
			lastEdited: Date.now()
		}
	).exec();

	res.send({});
});

module.exports = flashCardRouter;
