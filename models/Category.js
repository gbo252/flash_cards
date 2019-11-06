const mongoose = require("mongoose");
const { Schema } = mongoose;
const cardSchema = require("./Card");

const categorySchema = new Schema({
    category: String,
    color: String,
    cards: [cardSchema],
    lastEdited: Date,
    dateCreated: Date,
	_user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("categories", categorySchema);
