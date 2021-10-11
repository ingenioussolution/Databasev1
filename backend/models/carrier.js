import mongoose from 'mongoose'

const CarrierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: null
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
    },
    results:{
      type: Number,
      default: 0
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