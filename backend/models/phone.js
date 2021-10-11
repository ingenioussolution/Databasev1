import mongoose from 'mongoose'

const PhoneSchema = mongoose.Schema({
	name: {
		type: String,
		default:null
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

const Phone = mongoose.model('Phone', PhoneSchema)

export default Phone