import mongoose from 'mongoose'
import Pagination from 'mongoose-paginate-v2'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const PhoneListSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 9,
      max: 10,
    },
    carrier: {
      type: String,
      trim: true,
    },
    clicker: {
      type: Boolean,
      default:false,
    },
    revenue: {
      type: String,
    },
    converter: {
      type: Boolean,
      default:false,
    },
    hardBounce: {
      type: Boolean,
      default:false,
    },
    suppressed: {
      type: Boolean,
      default:false,
    },
    list: { type: String,trim: true, },
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
      enum: ['sold', 'reject', 'notqaulifed'],
      lowercase: true,
      trim: true,
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
      lowercase: true,
      trim: true,
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
      enum: ['wireless' , 'landline', 'voip', 'mobile','mobile_prepaid','wifi','pager','lookup','wireless_prepaid',null],
      trim: true,
    },
    prepaid: {
      type: Boolean,
      default:false,
    },
    risky: {
      type: Boolean,
      default:false,
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
      trim: true,
    },

    senderID: {
      type: String,
    },
    sendAt: {
      type: String,
    },
    validity: {
      type: Boolean,
      default:false,
    },
    subject: { type: String },
    vertical2: { type: String },
    vertical3: { type: String },
    
    burstOptOut:{
      type: Boolean,
      default:false,
    },
  },
  {
    timestamps: true,
  }
)

//PhoneListSchema.plugin(Pagination)
PhoneListSchema.plugin(aggregatePaginate);

const PhoneList = mongoose.model('PhoneList', PhoneListSchema)

export default PhoneList


