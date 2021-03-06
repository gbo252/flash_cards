const express = require('express');
const categoryRouter = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Category = mongoose.model('categories');

categoryRouter.get('/', requireLogin, async (req, res) => {
  const categories = await Category.aggregate([
    { $match: { _user: mongoose.Types.ObjectId(req.user.id) } },
    {
      $project: {
        category: 1,
        color: 1,
        lastEdited: 1,
        dateCreated: 1,
        cardsTotal: { $size: '$cards' }
      }
    }
  ]).exec();

  res.send(categories);
});

categoryRouter.post('/', requireLogin, async (req, res) => {
  const newCategory = new Category({
    ...req.body,
    lastEdited: Date.now(),
    dateCreated: Date.now(),
    _user: req.user.id
  });

  await newCategory.save();

  res.send(newCategory);
});

categoryRouter.patch('/edit/:category', requireLogin, async (req, res) => {
  await Category.updateOne(
    {
      category: req.params.category,
      _user: req.user.id
    },
    {
      ...req.body,
      lastEdited: Date.now()
    }
  ).exec();

  const updatedCategory = await Category.aggregate([
    { $match: { ...req.body, _user: mongoose.Types.ObjectId(req.user.id) } },
    {
      $project: {
        category: 1,
        color: 1,
        lastEdited: 1,
        dateCreated: 1,
        cardsTotal: { $size: '$cards' }
      }
    }
  ]).exec();

  res.send(updatedCategory);
});

categoryRouter.delete('/delete', requireLogin, async (req, res) => {
  await Category.deleteMany({ _id: { $in: req.body } });

  res.send(req.body);
});

module.exports = categoryRouter;
