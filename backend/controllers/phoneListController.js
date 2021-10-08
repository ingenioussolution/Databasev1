// phone list Model
import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import Phone from '../models/phone.js'

// @routes GET /phoneslist
// @des GET All Phone List
// @access  Private/User
export const getPhoneList = asyncHandler(async (req, res, next) => {
  try {
    const listPhones = await PhoneList.find()
    if (!listPhones) throw Error('Not items')
    res.status(200).json(listPhones)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

// @routes GET /phoneslist by phone
// @des GET by Phone Number
// @access  Private/User
export const getPhoneListByPhone = asyncHandler(async (req, res, next) => {
  try {
    const phone = await PhoneList.findOne({ phone: req.body.phone })
    if (phone) {
      res.json(phone)
    } else {
      res.status(404)
      throw new Error('Phone not found')
    }
  } catch (error) {
    next(error)
  }
})

// @routes GET /phoneslist by carriers
// @des GET List Phones By Carriers
// @access  Private/User
export const getPhoneListByCarriers = asyncHandler(async (req, res, next) => {})

// @routes GET /phoneslist by status
// @des GET List Phones By status
// @access  Private/User
export const getPhoneListByStatus = asyncHandler(async (req, res, next) => {
  try {
    const status = await PhoneList.find({ status: req.body.status })
    if (status) {
      res.json(status)
    } else {
      res.status(404)
      throw new Error('Phone not found')
    }
  } catch (error) {
    next(error)
  }
})

// @routes GET /phoneslist by Credit Score
// @des GET List Phones By creditScore
// @access  Private/User
export const getPhoneListByCreditScore = asyncHandler(
  async (req, res, next) => {
    try {
      const creditScore = await PhoneList.find({ status: req.body.creditScore })
      if (creditScore) {
        res.json(creditScore)
      } else {
        res.status(404)
        throw new Error('Phone not found')
      }
    } catch (error) {
      next(error)
    }
  }
)

// @routes GET /phoneslist by Income Source
// @des GET List Phones By Income Source
// @access  Private/User
export const getPhoneListByIncomeSource = asyncHandler(
  async (req, res, next) => {
    try {
      const incomeSource = await PhoneList.find({
        incomeSource: req.body.incomeSource,
      })
      if (incomeSource) {
        res.json(incomeSource)
      } else {
        res.status(404)
        throw new Error('Phone not found')
      }
    } catch (error) {
      next(error)
    }
  }
)

// @routes POST /phoneslist
// @des Create or Update an Phones List
export const registerPhoneList = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    name,
    phone,
    state,
    carrier,
    supressedOutame,
    source,
    ipAddress,
    site,
    status,
    list,
    revenue,
    monthlyIncome,
    incomeSource,
    creditScore,
    wireless,
    subId,
    countryCode,
  } = req.body

  const phoneExists = await PhoneList.findOne({ phone: phone })

  if (phoneExists) {
    phoneExists.firstName = firstName || phoneExists.firstName
    phoneExists.lastName = lastName || phoneExists.lastName
    phoneExists.name = name || phoneExists.name
    phoneExists.email = email || phoneExists.email
    phoneExists.state = state || phoneExists.state
    phoneExists.supressedOutame = supressedOutame || phoneExists.supressedOutame
    phoneExists.source = source || phoneExists.source
    phoneExists.ipAddress = ipAddress || phoneExists.ipAddress
    phoneExists.site = site || phoneExists.site
    phoneExists.status = status || phoneExists.status
    phoneExists.list = list || phoneExists.list
    phoneExists.revenue = revenue || phoneExists.revenue
    phoneExists.monthlyIncome = monthlyIncome || phoneExists.monthlyIncome
    phoneExists.incomeSource = incomeSource || phoneExists.incomeSource
    phoneExists.carrier = carrier || phoneExists.carrier
    phoneExists.creditScore = creditScore || phoneExists.creditScore
    phoneExists.subId = subId || phoneExists.subId
    phoneExists.countryCode = countryCode || phoneExists.countryCode
    phoneExists.wireless = wireless || phoneExists.wireless

    const updatedPhonesList = await phoneExists.save()
    res.status(200).json({
      _id: updatedPhonesList._id,
      firstName: updatedPhonesList.firstName,
      lastName: updatedPhonesList.lastName,
      email: updatedPhonesList.email,
      state: updatedPhonesList.state,
      supressedOutame: updatedPhonesList.supressedOutame,
      source: updatedPhonesList.source,
      ipAddress: updatedPhonesList.ipAddress,
      site: updatedPhonesList.site,
      status: updatedPhonesList.status,
      list: updatedPhonesList.list,
      revenue: updatedPhonesList.revenue,
      monthlyIncome: updatedPhonesList.monthlyIncome,
      incomeSource: updatedPhonesList.incomeSource,
      carrier: updatedPhonesList.carrier,
      creditScore: updatedPhonesList.creditScore,
      subId: updatedPhonesList.subId,
      countryCode: updatedPhonesList.countryCode,
      wireless: updatedPhonesList.wireless,
    })
  } else {
    const phoneCreated = await PhoneList.create({
      firstName,
      lastName,
      email,
      name,
      phone,
      state,
      carrier,
      supressedOutame,
      source,
      ipAddress,
      site,
      status,
      list,
      revenue,
      monthlyIncome,
      incomeSource,
      creditScore,
      wireless,
      subId,
      countryCode,
    })

    if (phoneCreated) {
      res.status(201).json({
        _id: phoneCreated._id,
        firstName: phoneCreated.firstName,
        lastName: phoneCreated.lastName,
        name: phoneCreated.name,
        email: phoneCreated.email,
        state: phoneCreated.state,
        phone: phoneCreated.phone,
        supressedOutame: phoneCreated.supressedOutame,
        source: phoneCreated.source,
        ipAddress: phoneCreated.ipAddress,
        site: phoneCreated.site,
        status: phoneCreated.status,
        list: phoneCreated.list,
        revenue: phoneCreated.revenue,
        monthlyIncome: phoneCreated.monthlyIncome,
        incomeSource: phoneCreated.incomeSource,
        carrier: phoneCreated.carrier,
        creditScore: phoneCreated.creditScore,
        subId: phoneCreated.subId,
        countryCode: phoneCreated.countryCode,
        wireless: phoneCreated.wireless,
      })
    } else {
      res.status(400)
      throw new Error('Invalid Phone data')
    }
  }
})

// @routes PUT /phoneslist:phone
// @des Update an Phones List
export const updatePhoneList = async (req, res) => {
  try {
    const updatedPhone = await PhoneList.findOne({ phone: req.params.phone })
    const { name, carrier, wireless } = req.body

    if (updatedPhone) {
      updatedPhone.name = name || updatedPhone.name
      updatedPhone.carrier = carrier || updatedPhone.carrier
      updatedPhone.wireless = wireless || updatedPhone.wireless

      const updatedPhonesList = await updatedPhone.save()

      res.status(200).json({
        _id: updatedPhonesList._id,
        name: updatedPhonesList.name,
        carrier: updatedPhonesList.carrier,
        wireless: updatedPhonesList.wireless,
      })
    } else {
      res.status(404)
      throw new Error('Phone List not found')
    }
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}
