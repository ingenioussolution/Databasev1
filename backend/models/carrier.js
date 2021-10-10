import mongoose from 'mongoose'

const CarrierSchema = mongoose.Schema(
  {
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
      max: 11
    },
    wireless:{
      type: Number,
      default: 1,
      min: 1,
      max: 1
    },
    results:{
      type: Number,
      default: 0,
      min: 1,
      max: 1
    },
    status: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
  },
  
  {
    timestamps: true,
  }
)
const Carrier = mongoose.model('Carrier', CarrierSchema)
export default Carrier