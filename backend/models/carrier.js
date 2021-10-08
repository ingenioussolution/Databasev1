import mongoose from 'mongoose'

const CarrierSchema = mongoose.Schema(
  {
    carrier: {
      type: String,
      required: false,
      min: 6,
      max: 255,
    },
  },
  {
    timestamps: true,
  }
)
const Carrier = mongoose.model('Carrier', CarrierSchema)
export default Carrier