// phone list Model
import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import ModelTemporal from '../models/TemporalData.js'
import axios from 'axios'

// @routes GET /phoneslist
// @des GET All Phone List
// @access  Private/User
export const getPhoneListFrontEnd = asyncHandler(async (req, res, next) => {
  try {
    const listPhones = await await PhoneList.find().limit(50)
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
    phoneExists.blackListAlliance =
      blackListAlliance || phoneExists.blackListAlliance
    phoneExists.clicker = clicker || phoneExists.clicker
    phoneExists.converter = converter || phoneExists.converter
    phoneExists.hardBouce = hardBouce || phoneExists.hardBouce
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

// @routes POST /register-data-temporal
// Move data th Temporal to PhonesList
// @des Create or Update an Phones List
export const AddPhoneList = asyncHandler(async (req, res, next) => {

  const TemporalData = await ModelTemporal.find()
  console.log('TemporalData', TemporalData.length)
  TemporalData.forEach(async (prev, phoneCount) => {
    await prev
    const phoneExists = await PhoneList.findOne({
      phone: TemporalData[phoneCount].phone,
    })
    console.log('phoneCount', phoneCount)

    console.log("blackListAlliance",TemporalData[phoneCount].phone);

    if (phoneExists) {
      console.log('phoneExists')

      phoneExists.firstName = phoneExists.firstName === undefined ? TemporalData[phoneCount].firstName : phoneExists.firstName
      phoneExists.lastName = phoneExists.lastName === undefined ? TemporalData[phoneCount].lastName : phoneExists.lastName
      phoneExists.name = phoneExists.name === undefined ? TemporalData[phoneCount].name : phoneExists.name
      phoneExists.email = phoneExists.email === undefined ? TemporalData[phoneCount].email : phoneExists.email
      phoneExists.state = phoneExists.state === undefined ? TemporalData[phoneCount].state : phoneExists.state
      phoneExists.supressedOutame = phoneExists.supressedOutame === undefined ? TemporalData[phoneCount].supressedOutame : phoneExists.supressedOutame
      phoneExists.source = phoneExists.source === undefined ? TemporalData[phoneCount].source : phoneExists.source
      phoneExists.ip = phoneExists.ip === undefined ? TemporalData[phoneCount].ip : phoneExists.ip
      phoneExists.site = phoneExists.site === undefined ? TemporalData[phoneCount].site : phoneExists.site
      phoneExists.status = phoneExists.status === undefined ? TemporalData[phoneCount].status : phoneExists.status
      phoneExists.list = phoneExists.list === undefined ? TemporalData[phoneCount].list : phoneExists.list
      phoneExists.revenue = phoneExists.revenue === undefined ?
        TemporalData[phoneCount].revenue : phoneExists.revenue
      phoneExists.monthlyIncome = phoneExists.monthlyIncome === undefined ?
        TemporalData[phoneCount].monthlyIncome : phoneExists.monthlyIncome
      phoneExists.incomeSource = phoneExists.incomeSource === undefined ?
        TemporalData[phoneCount].incomeSource : phoneExists.incomeSource
      phoneExists.carrier = phoneExists.carrier === undefined ?
        TemporalData[phoneCount].carrier : phoneExists.carrier
      phoneExists.creditScore = phoneExists.creditScore === undefined ?
        TemporalData[phoneCount].creditScore : phoneExists.creditScore
      phoneExists.subId = phoneExists.subId  === undefined ? TemporalData[phoneCount].subId : phoneExists.subId
      phoneExists.countryCode = phoneExists.countryCode === undefined ?
        TemporalData[phoneCount].countryCode : phoneExists.countryCode
      phoneExists.activePhone = phoneExists.activePhone === undefined ?
        TemporalData[phoneCount].activePhone : phoneExists.activePhone
      phoneExists.validStatus = phoneExists.validStatus === undefined ? TemporalData[phoneCount].validStatus : phoneExists.validStatus
      phoneExists.recentAbuse =  phoneExists.recentAbuse === undefined ?
        TemporalData[phoneCount].recentAbuse : phoneExists.recentAbuse
      phoneExists.validMobile = phoneExists.validMobile === undefined ? TemporalData[phoneCount].validMobile : phoneExists.validMobile
      phoneExists.blackListAlliance = phoneExists.blackListAlliance === undefined ? TemporalData[phoneCount].blackListAlliance : phoneExists.blackListAlliance
      phoneExists.clicker =  phoneExists.clicker === undefined ?
        TemporalData[phoneCount].clicker : phoneExists.clicker
      phoneExists.converter = phoneExists.converter === undefined ?
        TemporalData[phoneCount].converter : phoneExists.converter
      phoneExists.hardBouce = phoneExists.hardBouce === undefined ?
        TemporalData[phoneCount].hardBouce : phoneExists.hardBouce
      phoneExists.suppressed = phoneExists.suppressed === undefined ?
        TemporalData[phoneCount].suppressed : phoneExists.suppressed
      phoneExists.platform = phoneExists.platform === undefined ?
        TemporalData[phoneCount].platform : phoneExists.platform
      phoneExists.message = phoneExists.message === undefined ?
        TemporalData[phoneCount].message : phoneExists.message
      phoneExists.fraudScore = phoneExists.fraudScore === undefined ?
        TemporalData[phoneCount].fraudScore : phoneExists.fraudScore
      phoneExists.lineType = phoneExists.lineType === undefined ?
        TemporalData[phoneCount].lineType : phoneExists.lineType
      phoneExists.prepaid = phoneExists.prepaid === undefined ?
        TemporalData[phoneCount].prepaid : phoneExists.prepaid
      phoneExists.risky =  phoneExists.risky === undefined ? TemporalData[phoneCount].risky : phoneExists.risky
      phoneExists.city = phoneExists.city === undefined ? TemporalData[phoneCount].city : phoneExists.city
      phoneExists.listID = phoneExists.listID === undefined ? TemporalData[phoneCount].listID : phoneExists.listID
      phoneExists.birthDate = phoneExists.birthDate === undefined ?
        TemporalData[phoneCount].birthDate : phoneExists.birthDate
      phoneExists.gender = phoneExists.gender === undefined ? TemporalData[phoneCount].gender : phoneExists.gender
      phoneExists.senderID = phoneExists.senderID === undefined ?
        TemporalData[phoneCount].senderID : phoneExists.senderID
      phoneExists.sendAt = phoneExists.sendAt === undefined ? TemporalData[phoneCount].sendAt : phoneExists.sendAt
      phoneExists.validity = phoneExists.validity === undefined ?
        TemporalData[phoneCount].validity : phoneExists.validity
      phoneExists.subject =  phoneExists.subject === undefined ?
        TemporalData[phoneCount].subject : phoneExists.subject
      phoneExists.vertical2 = phoneExists.vertical2 === undefined ?
        TemporalData[phoneCount].vertical2 : phoneExists.vertical2
      phoneExists.vertical3 = phoneExists.vertical3 === undefined ?
        TemporalData[phoneCount].vertical3 : phoneExists.vertical3

      await phoneExists.save()
  
      const DeletePhone = await ModelTemporal.findOne({
        phone: TemporalData[phoneCount].phone,
      })
      if (DeletePhone) {
        console.log('Phone Update delete')
        await DeletePhone.remove()
      } else {
        res.status(404)
        throw new Error('Phone not found')
      }
    } else {
      const phoneCreated = await PhoneList.create({
        firstName: TemporalData[phoneCount].firstName,
        lastName: TemporalData[phoneCount].lastName,
        email: TemporalData[phoneCount].email,
        name: TemporalData[phoneCount].name,
        phone: TemporalData[phoneCount].phone,
        state: TemporalData[phoneCount].state,
        carrier:
          TemporalData[phoneCount].carrier === 'unknown_carrier'
            ? null
            : TemporalData[phoneCount].carrier,
        supressedOutame: TemporalData[phoneCount].supressedOutame,
        source: TemporalData[phoneCount].source,
        ip: TemporalData[phoneCount].ip,
        site: TemporalData[phoneCount].site,
        status: TemporalData[phoneCount].status,
        list: TemporalData[phoneCount].list,
        revenue: TemporalData[phoneCount].revenue,
        monthlyIncome: TemporalData[phoneCount].monthlyIncome,
        incomeSource: TemporalData[phoneCount].incomeSource,
        creditScore: TemporalData[phoneCount].creditScore,
        zipCode: TemporalData[phoneCount].zipCode,
        subId: TemporalData[phoneCount].subId,
        countryCode: TemporalData[phoneCount].countryCode,
        activePhone: TemporalData[phoneCount].activePhone,
        validStatus: TemporalData[phoneCount].validStatus,
        recentAbuse: TemporalData[phoneCount].recentAbuse,
        validMobile: TemporalData[phoneCount].validMobile,
        blackListAlliance: TemporalData[phoneCount].blackListAlliance,
        clicker: TemporalData[phoneCount].clicker,
        converter: TemporalData[phoneCount].converter,
        hardBouce: TemporalData[phoneCount].hardBouce,
        suppressed: TemporalData[phoneCount].suppressed,
        platform: TemporalData[phoneCount].platform,
        message: TemporalData[phoneCount].message,
        fraudScore: TemporalData[phoneCount].fraudScore,
        lineType: TemporalData[phoneCount].lineType,
        prepaid: TemporalData[phoneCount].prepaid,
        risky: TemporalData[phoneCount].risky,
        city: TemporalData[phoneCount].city,
        listID: TemporalData[phoneCount].listID,
        birthDate: TemporalData[phoneCount].birthDate,
        gender: TemporalData[phoneCount].gender,
        senderID: TemporalData[phoneCount].senderID,
        sendAt: TemporalData[phoneCount].sendAt,
        validity: TemporalData[phoneCount].validity,
        subject: TemporalData[phoneCount].subject,
        vertical2: TemporalData[phoneCount].vertical2,
        vertical3: TemporalData[phoneCount].vertical3,
      })

      if (phoneCreated) {
        console.log('Creating new row')

        const DeletePhoneNew = await ModelTemporal.findOne({
          phone: TemporalData[phoneCount].phone,
        })
        if (DeletePhoneNew) {
          await DeletePhoneNew.remove()
          console.log('Phone New delete')
        } else {
          res.status(404)
          throw new Error('Phone not found')
        }

        // res.status(201).json('Add a New Row')
      } else {
        res.status(400)
        throw new Error('Invalid Phone data')
      }
    }
  })
})

// @routes PUT /phoneslist:phone
// @des Update an Phones List
export const updatePhoneList = async (req, res) => {
  try {
    const updatedPhone = await PhoneList.findOne({ phone: req.params.phone })
    const { name, carrier } = req.body

    if (updatedPhone) {
      updatedPhone.name = name || updatedPhone.name
      updatedPhone.carrier = carrier || updatedPhone.carrier

      const updatedPhonesList = await updatedPhone.save()

      res.status(200).json({
        _id: updatedPhonesList._id,
        name: updatedPhonesList.name,
        carrier: updatedPhonesList.carrier,
      })
    } else {
      res.status(404)
      throw new Error('Phone List not found')
    }
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}
