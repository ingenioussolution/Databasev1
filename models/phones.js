const mongoose = require('mongoose');

const PhoneSchema = mongoose.Schema({
	name: {
		type: String,
		required: false,
		min: 6,
		max: 255
	},
	phone: {
		type: String,
		required: true,
        unique: true,
		min: 9,
		max: 10
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Phone', PhoneSchema);