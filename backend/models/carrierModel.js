import mongoose from 'mongoose'

const CarrierSchema = mongoose.Schema(
  {
    carrier: {
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: true
    },
  },
  
  {
    timestamps: true,
  }
)
const Carrier = mongoose.model('Carrier', CarrierSchema)
export default Carrier 