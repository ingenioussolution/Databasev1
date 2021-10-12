import mongoose from 'mongoose'

const PhoneListSchema = mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    min: 9,
    max: 10,
  },
  carrier: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  clicker:{
    type: String,
    enum: ['yes', 'no']
  },
  supressedOutame: {
    type: Boolean,
    default: false,
  },
  source: String,

  name: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  firstName: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
  },
  ipAddress: {
    type: String,
  },
  site: {
    type: String,
  },
  status: {
    type: String,
    enum: ['sold', 'reject'],
  },
  list: { type: Number },
  state: String,
  revenue: {
    type: Number,
  },
  monthlyIncome: {
    type: Number,
    default: 0.0,
  },
  incomeSource:{
    type: String,
    enum: ['benefits', 'job','selfEmployed'],
  },
  creditScore:{
    type: String,
    enum: ['no', 'poor','bad','fair','good','excellent'],
  },
  wireless: {
    type: String,
    required: false,
    min: 1,
    max: 1,
  },
  subId: {type: String,},
  vertical: {type: String,},
  clicker:{
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  countryCode: {
    type: Number,
  },
  activePhone: {
    type: Boolean,
    default: false,
  },
  validStatus: {
    type: Boolean,
    default: false,
  },

  
  
},
{
  timestamps: true,
})

const PhoneList = mongoose.model('PhoneList', PhoneListSchema)
export default PhoneList
