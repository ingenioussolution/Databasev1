import mongoose from 'mongoose'

const BadAreaCodeSchema = mongoose.Schema(
  {
    nameState: {
      type: String,
      default: null
    },
    state: {
        type: String,
        default: null
      },
    areaCode: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  
  {
    timestamps: true,
  }
)
const BadAreaCode = mongoose.model('BadAreaCode', BadAreaCodeSchema)
export default BadAreaCode
