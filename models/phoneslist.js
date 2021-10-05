import mongoose from 'mongoose'

const PhoneListSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    min: 9,
    max: 10,
  },
  carrier: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  wireless: {
    type: String,
    required: false,
    min: 1,
    max: 1,
  },
  status: {
    type: String,
    enum: ['success', 'fail'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const PhoneList = mongoose.model('PhoneList', PhoneListSchema)
export default PhoneList
