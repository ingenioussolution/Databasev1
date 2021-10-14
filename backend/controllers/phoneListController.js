// phone list Model
import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import Phone from '../models/phone.js'
import axios from 'axios'

// @routes GET /phoneslist
// @des GET All Phone List
// @access  Private/User
export const getPhoneList1 = asyncHandler(async (req, res, next) => {
  try {
    const listPhones = await PhoneList.find()
    if (!listPhones) throw Error('Not items')
    res.status(200).json(listPhones)
  } catch (error) {
    next(error)
  }
})

const temporal = []
// Return Array after filter with BlackList API
export const getPhoneList = asyncHandler(async (req, res, next) => {
  try {
    const listPhones = await PhoneList.find()

    listPhones.reduce(async (prev, phoneNumber) => {
      await prev
      const { data } = await axios.get(
        `https://api.blacklistalliance.com/standard/api/v1/Lookup/key/b128a57d1da0fdaea16f8ab95883a5f2/response/json/phone/${phoneNumber.phone}`
      )

      if (data.wireless === 1 && data.results === 0) {
        temporal.push({
          firstName: phoneNumber.firstName,
          lastName: phoneNumber.lastName,
          email: phoneNumber.email,
          name: phoneNumber.name,
          phone: phoneNumber.phone,
          state: phoneNumber.state,
          carrier: phoneNumber.carrier,
          supressedOutame: phoneNumber.supressedOutame,
          source: phoneNumber.source,
          ip: phoneNumber.ip,
          site: phoneNumber.site,
          status: phoneNumber.status,
          list: phoneNumber.list,
          revenue: phoneNumber.revenue,
          monthlyIncome: phoneNumber.monthlyIncome,
          incomeSource: phoneNumber.incomeSource,
          creditScore: phoneNumber.creditScore,
          zipCode: phoneNumber.zipCode,
          subId: phoneNumber.subId,
          countryCode: phoneNumber.countryCode,
          activePhone: phoneNumber.activePhone,
          validStatus: phoneNumber.validStatus,
          recentAbuse: phoneNumber.recentAbuse,
          validMobile: data.status === 'success' ? true : false,
          blackListAlliance: data.results === 0 ? false : true,
          clicker: phoneNumber.clicker,
          converter: phoneNumber.converter,
          hardBouce: phoneNumber.hardBouce,
          suppressed: phoneNumber.phoneNumber,
          platform: phoneNumber.platform,
          message: phoneNumber.message,
          recentAbuse: phoneNumber.recentAbuse,
          fraudScore: phoneNumber.fraudScore,
          lineType: data.wireless === 1 ? 'wireless' : phoneNumber.lineType,
          prepaid: phoneNumber.prepaid,
          risky: phoneNumber.risky,
          city: phoneNumber.city,
          listID: phoneNumber.listID,
          birthDate: phoneNumber.birthDate,
          gender: phoneNumber.gender,
          senderID: phoneNumber.senderID,
          sendAt: phoneNumber.sendAt,
          validity: phoneNumber.validity,
          subject: phoneNumber.subject,
          vertical2: phoneNumber.vertical2,
          vertical3: phoneNumber.vertical3,
        })
      }
      getApiCarrierData(temporal)
      // console.log('temporal', temporal)
      //console.log('temporal', temporal.length)
      return Promise.resolve()
    }, Promise.resolve())
    if (!listPhones) throw Error('Not items')
    res.status(200).json(listPhones)
  } catch (error) {
    next(error)
  }
})

// Request API Email Over Sight
const getApiCarrierData = (phoneNumber) => {
  const EmailOversight = []
  phoneNumber.forEach(async (prev, tmp) => {
    await prev
    const { data } = await axios.get(
      `https://api.emailoversight.com/api/PhoneValidation?apitoken=8466c45b-6467-47d8-a594-4966f8e4461e&phonenumber=${phoneNumber[tmp].phone}`
    )
    if (data) {
      EmailOversight.push({
        firstName: phoneNumber[tmp].firstName,
        lastName: phoneNumber[tmp].lastName,
        email: phoneNumber[tmp].email,
        name: phoneNumber[tmp].name,
        phone: phoneNumber[tmp].phone,
        state: phoneNumber[tmp].state,
        carrier: data.Carrier,
        supressedOutame: phoneNumber[tmp].supressedOutame,
        source: phoneNumber[tmp].source,
        ip: phoneNumber[tmp].ip,
        site: phoneNumber[tmp].site,
        status: phoneNumber[tmp].status,
        list: phoneNumber[tmp].list,
        revenue: phoneNumber[tmp].revenue,
        monthlyIncome: phoneNumber[tmp].monthlyIncome,
        incomeSource: phoneNumber[tmp].incomeSource,
        creditScore: phoneNumber[tmp].creditScore,
        zipCode: phoneNumber[tmp].zipCode,
        subId: phoneNumber[tmp].subId,
        countryCode: phoneNumber[tmp].countryCode,
        activePhone: phoneNumber[tmp].activePhone,
        validStatus: phoneNumber[tmp].validStatus,
        recentAbuse: phoneNumber[tmp].recentAbuse,
        validMobile: phoneNumber[tmp].validMobile,
        blackListAlliance: phoneNumber[tmp].blackListAlliance,
        clicker: phoneNumber[tmp].clicker,
        converter: phoneNumber[tmp].converter,
        hardBouce: phoneNumber[tmp].hardBouce,
        suppressed: phoneNumber[tmp].phoneNumber,
        platform: phoneNumber[tmp].platform,
        message: phoneNumber[tmp].message,
        recentAbuse: phoneNumber[tmp].recentAbuse,
        fraudScore: phoneNumber[tmp].fraudScore,
        lineType: phoneNumber[tmp].lineType,
        prepaid: phoneNumber[tmp].prepaid,
        risky: phoneNumber[tmp].risky,
        city: phoneNumber[tmp].city,
        listID: phoneNumber[tmp].listID,
        birthDate: phoneNumber[tmp].birthDate,
        gender: phoneNumber[tmp].gender,
        senderID: phoneNumber[tmp].senderID,
        sendAt: phoneNumber[tmp].sendAt,
        validity: phoneNumber[tmp].validity,
        subject: phoneNumber[tmp].subject,
        vertical2: phoneNumber[tmp].vertical2,
        vertical3: phoneNumber[tmp].vertical3,
      })
    }
    //console.log('EmailOversight', EmailOversight)
    console.log('EmailOversight', EmailOversight.length)
  })
}

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
    hardBouce,
    suppressed,
    platform,
    message,
    recentAbuse,
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
    phoneExists.activePhone = activePhone || phoneExists.activePhone
    phoneExists.validStatus = validStatus || phoneExists.validStatus
    phoneExists.recentAbuse = recentAbuse || phoneExists.recentAbuse
    phoneExists.validMobile = validMobile || phoneExists.validMobile
    phoneExists.blackListAlliance = blackListAlliance || phoneExists.blackListAlliance
    phoneExists.clicker = clicker || phoneExists.clicker
    phoneExists.converter = converter || phoneExists.converter
    phoneExists.hardBouce = hardBouce || phoneExists.hardBouce
    phoneExists.suppressed = suppressed || phoneExists.suppressed
    phoneExists.platform = platform || phoneExists.platform
    phoneExists.message = message || phoneExists.message
    phoneExists.recentAbuse = recentAbuse || phoneExists.recentAbuse
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
      activePhone: updatedPhonesList.activePhone,
      validStatus: updatedPhonesList.validStatus,
      recentAbuse: updatedPhonesList.recentAbuse,
      validMobile: updatedPhonesList.validMobile,
      blackListAlliance: updatedPhonesList.blackListAlliance,
      clicker: updatedPhonesList.clicker,
      converter: updatedPhonesList.converter,
      hardBouce: updatedPhonesList.hardBouce,
      suppressed: updatedPhonesList.suppressed,
      platform: updatedPhonesList.platform,
      message: updatedPhonesList.message,
      recentAbuse: updatedPhonesList.recentAbuse,
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
      hardBouce,
      suppressed,
      platform,
      message,
      recentAbuse,
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
        supressedOutame: phoneCreated.supressedOutame,
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
        hardBouce: phoneCreated.hardBouce,
        suppressed: phoneCreated.suppressed,
        platform: phoneCreated.platform,
        message: phoneCreated.message,
        recentAbuse: phoneCreated.recentAbuse,
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
