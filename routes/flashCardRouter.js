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

	res.send(flashCards.cards);
});

flashCardRouter.post("/:category", requireLogin, async (req, res) => {
	const flashCards = await Category.findOneAndUpdate(
		{
			category: req.params.category,
			_user: req.user.id
		},
		{
			$push: {
				cards: {
					...req.body,
					lastEdited: Date.now(),
					dateCreated: Date.now()
				}
			},
			lastEdited: Date.now()
		},
		{ new: true }
	).select({
		cards: 1
	});

	res.send(flashCards.cards);
});

flashCardRouter.patch("/:category/edit/:id", requireLogin, async (req, res) => {
	const { header, content } = req.body;

	const flashCards = await Category.findOneAndUpdate(
		{
			"cards._id": mongoose.Types.ObjectId(req.params.id)
		},
		{
			$set: {
				"cards.$.header": header,
				"cards.$.content": content,
				"cards.$.lastEdited": Date.now(),
				lastEdited: Date.now()
			}
		},
		{ new: true }
	).select({
		cards: 1
	});

	res.send(flashCards.cards);
});

flashCardRouter.delete("/:category", requireLogin, async (req, res) => {
	const flashCards = await Category.findOneAndUpdate(
		{
			category: req.params.category,
			_user: req.user.id
		},
		{
			$pull: { cards: { _id: { $in: req.body } } },
			lastEdited: Date.now()
		},
		{ new: true }
	);

	res.send(flashCards.cards);
});

module.exports = flashCardRouter;
