import mongoose from 'mongoose'

const AuditSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userLogin: {
        type: String,
        default: null
      },
    firstName: {
      type: String,
      default: null
    },
    Carrier: {
        type: String,
        default: null
      },
  },
  
  {
    timestamps: true,
  }
)
const Audit = mongoose.model('Audit', AuditSchema)
export default Audit