import mongoose from 'mongoose'

const BadAreaCodeSchema = mongoose.Schema(
  {
    state: {
      type: String,
      default: null
    },
    areaCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  
  {
    timestamps: true,
  }
)
const BadAreaCode = mongoose.model('BadAreaCode', BadAreaCodeSchema)
export default BadAreaCode