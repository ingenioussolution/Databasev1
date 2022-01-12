import mongoose from 'mongoose'

const ExportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    fileName: { type: String, require: true, unique: true, },
    url: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

ExportSchema.index({ createdAt: 1 },{expireAfterSeconds: 604800})
const Export = mongoose.model('Export', ExportSchema)

export default Export 
 