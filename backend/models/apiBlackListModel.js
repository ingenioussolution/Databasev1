import mongoose from 'mongoose'

const apiBlackListSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 9,
      max: 10,
    },
    blackListAlliance: {
      type: Boolean,
      default: false,
  },
    loopUp: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const apiBlackList = mongoose.model('apiBlackList', apiBlackListSchema)

export default apiBlackList
