import mongoose from 'mongoose'

const ModelTemporalCleanDataSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      min: 9,
      max: 10,
    },
    carrier: {
      type: String,
    },
    clicker: {
      type: Boolean,
    },
    revenue: {
      type: String,
    },
    converter: {
      type: Boolean,
    },
    hardBounce: {
      type: Boolean,
    },
    suppressed: {
      type: Boolean,
    },
    list: { type: String },
    source: { type: String },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    ip: {
      type: String,
    },
    site: {
      type: String,
    },
    status: {
      type: String,
      enum: ['sold', 'reject', 'notQaulifed'],
    },
    zipCode: {
      type: String,
    },
    state: {
      type: String,
    },

    monthlyIncome: {
      type: Number,
      default: 0.0,
    },
    incomeSource: {
      type: String,
      enum: ['Benefits', 'Job Income', 'Self employed'],
    },
    creditScore: {
      type: String,
      enum: ['no', 'poor', 'bad', 'fair', 'good', 'excellent'],
    },
    subId: { type: String },
    vertical: { type: String },

    countryCode: {
      type: String,
    },
    platform: {
      type: String,
    },
    message: {
      type: String,
    },
    recentAbuse: {
      type: Boolean,
      default: false,
    },
    fraudScore: {
      type: Number,
      default: 0.0,
    },
    validMobile: {
      type: Boolean,
    },
    blackListAlliance: {
      type: Boolean,
    },
    lineType: {
      type: String,
      enum: ['wireless' , 'landline', 'voip', 'mobile','mobile_prepaid','wifi',null],
    },
    prepaid: {
      type: Boolean,
    },
    risky: {
      type: Boolean,
    },
    city: {
      type: String,
    },
    listID: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['M', 'F'],
    },

    senderID: {
      type: String,
    },
    sendAt: {
      type: String,
    },
    validity: {
      type: Boolean,
    },
    subject: { type: String },
    vertical2: { type: String },
    vertical3: { type: String },
  },
  {
    timestamps: true,
  }
)

const ModelTemporalCleanData = mongoose.model(
  'ModelTemporalCleanData',
  ModelTemporalCleanDataSchema
)
export default ModelTemporalCleanData
