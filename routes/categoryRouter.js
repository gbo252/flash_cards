const express = require("express");
const categoryRouter = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Category = mongoose.model("categories");

categoryRouter.get("/", requireLogin, async (req, res) => {
	const categories = await Category.find({ _user: req.user.id });

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

categoryRouter.patch("/edit/:category", requireLogin, async (req, res) => {
	const { category } = req.body;

	await Category.updateOne(
		{
			category: req.params.category,
			_user: req.user.id
		},
		{
			category: category
		}
	).exec();

	res.send({});
});

categoryRouter.delete("/delete/:id", requireLogin, async (req, res) => {
	await Category.deleteOne({ _id: req.params.id });

	res.send({});
});

module.exports = categoryRouter;
