// phone list Model
import ModelTemporal from '../models/TemporalData.js'
import asyncHandler from 'express-async-handler'

// @routes GET /get-temp
// @des GET All Model Temporal List
// @access  Private/User

export const getModelTemporalList = asyncHandler(async (req, res, next) => {
  try {
    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1

    const listTemp = await ModelTemporal.countDocuments({})
    console.log('pageSize', pageSize, Math.ceil(listTemp / pageSize))
    const data = await ModelTemporal.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    if (data) {
      res
        .status(200)
        .json({
          data,
          page,
          totalPages: Math.ceil(listTemp / pageSize),
          listTemp,
        })
    } else {
      res.status(404)
      throw new Error('Not items')
    }
  } catch (error) {
    next(error)
  }
})

export const getTemporal = asyncHandler(async (req, res, next) => {
  try {
    const listPhones = await ModelTemporal.find().lean().count()

    if (listPhones) {
      res.status(200).json(listPhones)
    } else {
      res.status(404)
      throw Error('Not items')
    }
  } catch (error) {
    next(error)
  }
})

// @routes GET /data-temporal by phone
// @des GET by Phone Number
// @access  Private/User
export const getModelTemporalByPhone = asyncHandler(async (req, res, next) => {
  try {
    const phone = await ModelTemporal.findOne({ phone: req.body.phone })
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

// @routes GET /data-temporal by carriers
// @des GET List Phones By Carriers
// @access  Private/User
export const getModelTemporalByCarriers = asyncHandler(
  async (req, res, next) => {}
)

// @routes GET /data-temporal by status
// @des GET List Phones By status
// @access  Private/User
export const getModelTemporalByStatus = asyncHandler(async (req, res, next) => {
  try {
    const status = await ModelTemporal.find({ status: req.body.status })
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

// @routes GET /data-temporal by Credit Score
// @des GET List Phones By creditScore
// @access  Private/User
export const getModelTemporalByCreditScore = asyncHandler(
  async (req, res, next) => {
    try {
      const creditScore = await ModelTemporal.find({
        status: req.body.creditScore,
      })
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

// @routes GET /data-temporal by Income Source
// @des GET List Phones By Income Source
// @access  Private/User
export const getModelTemporalByIncomeSource = asyncHandler(
  async (req, res, next) => {
    try {
      const incomeSource = await ModelTemporal.find({
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

// @routes POST /data-temporal
// @des Create or Update an Phones List
export const registerModelTemporal = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    name,
    phone,
    state,
    carrier,
    source,
    ip,
    site,
    status,
    list,
    revenue,
    monthlyIncome,
    incomeSource,
    creditScore,
    zipCode,
    subId,
    countryCode,
    activePhone,
    validStatus,
    recentAbuse,
    validMobile,
    blackListAlliance,
    clicker,
    converter,
    hardBounce,
    suppressed,
    platform,
    message,
    fraudScore,
    lineType,
    prepaid,
    risky,
    city,
    listID,
    birthDate,
    gender,
    senderID,
    sendAt,
    validity,
    subject,
    vertical2,
    vertical3,
  } = req.body

  const phoneExists = await ModelTemporal.findOne({ phone: phone })

  if (phoneExists) {
    phoneExists.firstName = firstName || phoneExists.firstName
    phoneExists.lastName = lastName || phoneExists.lastName
    phoneExists.name = name || phoneExists.name
    phoneExists.email = email || phoneExists.email
    phoneExists.state = state || phoneExists.state
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
    phoneExists.activePhone = activePhone || phoneExists.activePhone
    phoneExists.validStatus = validStatus || phoneExists.validStatus
    phoneExists.recentAbuse = recentAbuse || phoneExists.recentAbuse
    phoneExists.validMobile = validMobile || phoneExists.validMobile
    phoneExists.blackListAlliance =
      blackListAlliance || phoneExists.blackListAlliance
    phoneExists.clicker = clicker || phoneExists.clicker
    phoneExists.converter = converter || phoneExists.converter
    phoneExists.hardBounce = hardBounce || phoneExists.hardBounce
    phoneExists.suppressed = suppressed || phoneExists.suppressed
    phoneExists.platform = platform || phoneExists.platform
    phoneExists.message = message || phoneExists.message
    phoneExists.fraudScore = fraudScore || phoneExists.fraudScore
    phoneExists.lineType = lineType || phoneExists.lineType
    phoneExists.prepaid = prepaid || phoneExists.prepaid
    phoneExists.risky = risky || phoneExists.risky
    phoneExists.city = city || phoneExists.city
    phoneExists.listID = listID || phoneExists.listID
    phoneExists.birthDate = birthDate || phoneExists.birthDate
    phoneExists.gender = gender || phoneExists.gender
    phoneExists.senderID = senderID || phoneExists.senderID
    phoneExists.sendAt = sendAt || phoneExists.sendAt
    phoneExists.validity = validity || phoneExists.validity
    phoneExists.subject = subject || phoneExists.subject
    phoneExists.vertical2 = vertical2 || phoneExists.vertical2
    phoneExists.vertical3 = vertical3 || phoneExists.vertical3

    const updatedPhonesList = await phoneExists.save()
    res.status(200).json({
      _id: updatedPhonesList._id,
      firstName: updatedPhonesList.firstName,
      lastName: updatedPhonesList.lastName,
      email: updatedPhonesList.email,
      state: updatedPhonesList.state,
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
      activePhone: updatedPhonesList.activePhone,
      validStatus: updatedPhonesList.validStatus,
      recentAbuse: updatedPhonesList.recentAbuse,
      validMobile: updatedPhonesList.validMobile,
      blackListAlliance: updatedPhonesList.blackListAlliance,
      clicker: updatedPhonesList.clicker,
      converter: updatedPhonesList.converter,
      hardBounce: updatedPhonesList.hardBounce,
      suppressed: updatedPhonesList.suppressed,
      platform: updatedPhonesList.platform,
      message: updatedPhonesList.message,
      fraudScore: updatedPhonesList.fraudScore,
      lineType: updatedPhonesList.lineType,
      prepaid: updatedPhonesList.prepaid,
      risky: updatedPhonesList.risky,
      city: updatedPhonesList.city,
      listID: updatedPhonesList.listID,
      birthDate: updatedPhonesList.birthDate,
      senderID: updatedPhonesList.senderID,
      sendAt: updatedPhonesList.sendAt,
      validity: updatedPhonesList.validity,
      subject: updatedPhonesList.subject,
      vertical2: updatedPhonesList.vertical2,
      vertical3: updatedPhonesList.vertical3,
    })
  } else {
    const phoneCreated = await ModelTemporal.create({
      firstName,
      lastName,
      email,
      name,
      phone,
      state,
      carrier,
      source,
      ip,
      site,
      status,
      list,
      revenue,
      monthlyIncome,
      incomeSource,
      creditScore,
      zipCode,
      subId,
      countryCode,
      activePhone,
      validStatus,
      recentAbuse,
      validMobile,
      blackListAlliance,
      clicker,
      converter,
      hardBounce,
      suppressed,
      platform,
      message,
      fraudScore,
      lineType,
      prepaid,
      risky,
      city,
      listID,
      birthDate,
      gender,
      senderID,
      sendAt,
      validity,
      subject,
      vertical2,
      vertical3,
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
        source: phoneCreated.source,
        ip: phoneCreated.ip,
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
        activePhone: phoneCreated.activePhone,
        validStatus: phoneCreated.validStatus,
        recentAbuse: phoneCreated.recentAbuse,
        validMobile: phoneCreated.validMobile,
        blackListAlliance: phoneCreated.blackListAlliance,
        clicker: phoneCreated.clicker,
        converter: phoneCreated.converter,
        hardBounce: phoneCreated.hardBounce,
        suppressed: phoneCreated.suppressed,
        platform: phoneCreated.platform,
        message: phoneCreated.message,
        fraudScore: phoneCreated.fraudScore,
        lineType: phoneCreated.lineType,
        prepaid: phoneCreated.prepaid,
        risky: phoneCreated.risky,
        city: phoneCreated.city,
        listID: phoneCreated.listID,
        birthDate: phoneCreated.birthDate,
        senderID: phoneCreated.senderID,
        sendAt: phoneCreated.sendAt,
        validity: phoneCreated.validity,
        subject: phoneCreated.subject,
        vertical2: phoneCreated.vertical2,
        vertical3: phoneCreated.vertical3,
      })
    } else {
      res.status(400)
      throw new Error('Invalid Phone data')
    }
  }
})

// @routes PUT /data-temporal:phone
// @des Update an Phones List
export const updateModelTemporal = async (req, res) => {
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
