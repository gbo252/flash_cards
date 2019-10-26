const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema({
	header: String,
	content: String,
	lastEdited: Date
});

module.exports = cardSchema;
