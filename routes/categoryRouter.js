const express = require("express");
const categoryRouter = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Category = mongoose.model("categories");

categoryRouter.get("/", requireLogin, async (req, res) => {
	const categories = await Category.find({ _user: req.user.id }).select({
		cards: 0
	});

	res.send(categories);
});

categoryRouter.post("/", requireLogin, async (req, res) => {
	const { category } = req.body;

	const newCategory = new Category({
		category,
		lastEdited: Date.now(),
		_user: req.user.id
	});

	await newCategory.save();

	res.send({});
});

module.exports = categoryRouter;
