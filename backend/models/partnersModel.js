import mongoose from 'mongoose'

const PartnersSchema = mongoose.Schema(
  {
    partnerName: {
      type: String,
      default: null,
    },
    carrier: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Carrier',
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Partners = mongoose.model('Partners', PartnersSchema)
export default Partners
