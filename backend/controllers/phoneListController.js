// phone list Model
import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import ModelTemporal from '../models/TemporalData.js'
import axios from 'axios'

// @routes GET /phoneslist/
// @des GET All Phone List
// @access  Private/User

export const getPhoneListFrontEnd = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY

    const hardBounce = req.query.hardBounce
    const clicker = req.query.clicker
    const phone = req.query.phone
    const revenue = req.query.revenue
    const converter = req.query.converter
    const suppressed = req.query.suppressed
    let carrierFilter = req.query.carrier
    let carrier = { $regex: `${carrierFilter}`, $options: 'i' }
    const firstNameFilter = req.query.firstName
    let firstName = { $regex: `${firstNameFilter}`, $options: 'i' }
    let arrayFilters = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1

    if (clicker || hardBounce || phone || revenue || converter || suppressed || firstNameFilter || carrierFilter) {
      if(clicker){
        arrayFilters.push({clicker:clicker})
      }
      if(hardBounce){
        arrayFilters.push({hardBounce:hardBounce})
      }
      if(revenue){
        arrayFilters.push({revenue:revenue})
      }
      if(phone){
        arrayFilters.push({phone:phone})
      }
      if(converter){
        arrayFilters.push({converter:converter})

      }if(suppressed){
        arrayFilters.push({suppressed:suppressed})
      }
      if(carrierFilter){
        arrayFilters.push({carrier:carrier})
      }
      if(firstNameFilter){
        arrayFilters.push({firstName:firstName})
      }

      console.log("Array:", ...arrayFilters);
      if (arrayFilters) {
        const count = await PhoneList.countDocuments({
          $and: arrayFilters,
        })
        const data = await PhoneList.find({
          $and: arrayFilters,
        })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        res.status(200).json({
          data,
          clicker,
          phone,
          revenue,
          suppressed,
          converter,
          hardBounce,
          search,
          page,
          totalPages: Math.ceil(count / pageSize),
        })
      }
    }else
    //------------------------------------
   if (regex) {
      console.log('search', regex)
      const count = await PhoneList.countDocuments({ carrier: search })
      const data = await PhoneList.find({ carrier: search })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

      res.status(200).json({
        data,
        search,
        hardBounce,
        page,
        totalPages: Math.ceil(count / pageSize),
      })
    } else {
      console.log('no filters')
      const count = await PhoneList.countDocuments({})
      const data = await PhoneList.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))

      res.status(200).json({
        data,
        search,
        hardBounce,
        page,
        totalPages: Math.ceil(count / pageSize),
      })
    }
  } catch (error) {
    next(error)
  }
})

// Controller test GET SHOW ALL DATA
export const getPhoneListFrontEnd1 = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY
    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1

    if (regex) {
      const count = await PhoneList.countDocuments({carrier: search})
      const data = await PhoneList.find({carrier: search})
        .limit(pageSize)
        .skip(pageSize * (page - 1))

      res.status(200).json({
        data,
        search,
        page,
        totalPages: Math.ceil(count / pageSize),
      })
    } 
  } catch (error) {
    next(error)
  }
  // const page = parseInt(req.query.page) || 1
  // const limit = parseInt(req.query.limit) || 10
  // const totalPages = parseInt(req.query.totalPages)
  // const listPhones = await PhoneList.paginate({}, { page, limit, totalPages })

  // if (!listPhones) throw Error('Not items')
  // res.status(200).json({
  //   data: listPhones.docs,
  //   limit: listPhones.limit,
  //   page: listPhones.page,
  //   nextPage: listPhones.nextPage,
  //   prevPage: listPhones.prevPage,
  //   hasNextPage: listPhones.hasNextPage,
  //   hasPrevPage: listPhones.hasPrevPage,
  //   totalPages: listPhones.totalPages,
  //   pagingCounter: listPhones.pagingCounter,
  //   offset: listPhones.offset,
  //})
})

// FILTER DATA API BLACKLIST ALLIANCE
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
          hardBounce: phoneNumber.hardBounce,
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
        hardBounce: phoneNumber[tmp].hardBounce,
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
    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1
    const phone = req.query.phone
    const count = await PhoneList.countDocuments({ phone: phone })
    const listPhones = await PhoneList.findOne({ phone: phone })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    if (listPhones) {
      res.json({ listPhones, page, pages: Math.ceil(count / pageSize) })
    } else {
      res.status(404)
      throw new Error('Phone not found')
    }
  } catch (error) {
    next(error)
  }
})

// @routes GET /phoneslist by status
// @des GET List Phones By status
// @access  Private/User
export const getPhoneListByStatus = asyncHandler(async (req, res, next) => {
  try {
    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1
    const status = req.query.status
    const count = await PhoneList.countDocuments({ status: status })
    const listPhones = await PhoneList.find({ status: status })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res
      .status(200)
      .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
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
      const pageSize = 10
      const page = parseInt(req.query.pageNumber) || 1
      const creditScore = req.query.creditScore
      const count = await PhoneList.countDocuments({ creditScore: creditScore })
      const listPhones = await PhoneList.find({ creditScore: creditScore })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

      if (creditScore) {
        res
          .status(200)
          .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
      } else {
        res.status(404)
        throw new Error('creditScore not found')
      }
    } catch (error) {
      next(error)
    }
  }
)

// @routes GET /phoneslist by filters
// @des GET List Phones By creditScore
// @access  Private/User
export const getPhoneListByCombineFilters = asyncHandler(
  async (req, res, next) => {
    try {
      const pageSize = 10
      const page = parseInt(req.query.pageNumber) || 1
      const creditScore = req.query.creditScore
      const status = req.query.status
      const incomeSource = req.query.incomeSource

      console.log(creditScore, status, incomeSource)

      if ((creditScore !== undefined) & (status !== undefined)) {
        const count = await PhoneList.countDocuments({
          $and: [{ creditScore: creditScore }, { status: status }],
        })
        const listPhones = await PhoneList.find({
          $and: [{ creditScore: creditScore }, { status: status }],
        })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        if (listPhones) {
          res
            .status(200)
            .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
        } else {
          res.status(404)
          throw new Error('Filter not found')
        }
      } else if ((status !== undefined) & (incomeSource !== undefined)) {
        const count = await PhoneList.countDocuments({
          $and: [{ incomeSource: incomeSource }, { status: status }],
        })
        const listPhones = await PhoneList.find({
          $and: [{ incomeSource: incomeSource }, { status: status }],
        })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        if (listPhones) {
          res
            .status(200)
            .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
        } else {
          res.status(404)
          throw new Error('Filter not found')
        }
      } else if (creditScore & incomeSource) {
        const count = await PhoneList.countDocuments({
          $and: [{ creditScore: creditScore }, { incomeSource: incomeSource }],
        })
        const listPhones = await PhoneList.find({
          $and: [{ creditScore: creditScore }, { incomeSource: incomeSource }],
        })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        if (listPhones) {
          res
            .status(200)
            .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
        } else {
          res.status(404)
          throw new Error('Filter not found')
        }
      } else if (incomeSource) {
        console.log('income')
        const count = await PhoneList.countDocuments({
          incomeSource: incomeSource,
        })
        const listPhones = await PhoneList.find({ incomeSource: incomeSource })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        if (listPhones) {
          res
            .status(200)
            .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
        } else {
          res.status(404)
          throw new Error('Filter not found')
        }
      }

      if (creditScore !== undefined) {
        const count = await PhoneList.countDocuments({
          creditScore: creditScore,
        })
        const listPhones = await PhoneList.find({ creditScore: creditScore })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        if (listPhones) {
          res
            .status(200)
            .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
        } else {
          res.status(404)
          throw new Error('Filter not found')
        }
      } else if (status !== undefined) {
        const count = await PhoneList.countDocuments({ status: status })
        const listPhones = await PhoneList.find({ status: status })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

        if (listPhones) {
          res
            .status(200)
            .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
        } else {
          res.status(404)
          throw new Error('Filter not found')
        }
      } else console.log('No parameter')
      const count = await PhoneList.countDocuments({
        incomeSource: incomeSource,
      })
      const listPhones = await PhoneList.find({ incomeSource: incomeSource })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

      if (listPhones) {
        res
          .status(200)
          .json({ listPhones, page, pages: Math.ceil(count / pageSize) })
      } else {
        res.status(404)
        throw new Error('Filter not found')
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
    vertical,
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
    phoneExists.vertical = vertical || phoneExists.vertical
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
      vertical: updatedPhonesList.vertical,
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
      vertical,
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
        vertical: phoneCreated.vertical,
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
  let requestCount = parseInt(req.query.count) || 10
  let count = await ModelTemporal.countDocuments()

  const total = Math.ceil(count / requestCount)
  console.log('total: ', total)

  console.log('count: ', count)
  console.log('requestCount: ', requestCount)

  // if(requestCount > count)
  // {
  //    requestCount = count
  // }
  //for (let i = requestCount; i <= count; i += requestCount) {
  const TemporalData = await ModelTemporal.find().limit(requestCount)

  TemporalData.forEach(async (prev, phoneCount) => {
    await prev
    const phoneExists = await PhoneList.findOne({
      phone: TemporalData[phoneCount].phone,
    })

    console.log('TemporalData: ', TemporalData[phoneCount].phone)
    console.log('Phone Count: ', phoneCount)

    if (phoneExists) {
      console.log('Phone Exists')

      phoneExists.firstName =
        phoneExists.firstName === undefined
          ? TemporalData[phoneCount].firstName
          : phoneExists.firstName === TemporalData[phoneCount].firstName
          ? phoneExists.firstName
          : TemporalData[phoneCount].firstName === undefined
          ? phoneExists.firstName
          : TemporalData[phoneCount].firstName
      //--------------------------------------------------------------------
      phoneExists.lastName =
        phoneExists.lastName === undefined
          ? TemporalData[phoneCount].lastName
          : phoneExists.lastName === TemporalData[phoneCount].lastName
          ? phoneExists.lastName
          : TemporalData[phoneCount].lastName === undefined
          ? phoneExists.lastName
          : TemporalData[phoneCount].lastName
      //--------------------------------------------------------------------
      phoneExists.name =
        phoneExists.name === undefined
          ? TemporalData[phoneCount].name
          : phoneExists.name === TemporalData[phoneCount].name
          ? phoneExists.name
          : TemporalData[phoneCount].name === undefined
          ? phoneExists.name
          : TemporalData[phoneCount].name
      //--------------------------------------------------------------------
      phoneExists.email =
        phoneExists.email === undefined
          ? TemporalData[phoneCount].email
          : phoneExists.email === TemporalData[phoneCount].email
          ? phoneExists.email
          : TemporalData[phoneCount].email === undefined
          ? phoneExists.email
          : TemporalData[phoneCount].email
      //--------------------------------------------------------------------
      phoneExists.state =
        phoneExists.state === undefined
          ? TemporalData[phoneCount].state
          : phoneExists.state === TemporalData[phoneCount].state
          ? phoneExists.state
          : TemporalData[phoneCount].state === undefined
          ? phoneExists.state
          : TemporalData[phoneCount].state
      //--------------------------------------------------------------------
      phoneExists.source =
        phoneExists.source === undefined
          ? TemporalData[phoneCount].source
          : phoneExists.source === TemporalData[phoneCount].source
          ? phoneExists.source
          : TemporalData[phoneCount].source === undefined
          ? phoneExists.source
          : TemporalData[phoneCount].source

      //--------------------------------------------------------------------
      phoneExists.ip =
        phoneExists.ip === undefined
          ? TemporalData[phoneCount].ip
          : phoneExists.ip === TemporalData[phoneCount].ip
          ? phoneExists.ip
          : TemporalData[phoneCount].ip === undefined
          ? phoneExists.ip
          : TemporalData[phoneCount].ip
      //--------------------------------------------------------------------
      phoneExists.site =
        phoneExists.site === undefined
          ? TemporalData[phoneCount].site
          : phoneExists.site === TemporalData[phoneCount].site
          ? phoneExists.site
          : TemporalData[phoneCount].site === undefined
          ? phoneExists.site
          : TemporalData[phoneCount].site
      //--------------------------------------------------------------------
      phoneExists.status =
        phoneExists.status === undefined
          ? TemporalData[phoneCount].status
          : phoneExists.status === TemporalData[phoneCount].status
          ? phoneExists.status
          : TemporalData[phoneCount].status === undefined
          ? phoneExists.status
          : TemporalData[phoneCount].status
      //--------------------------------------------------------------------
      phoneExists.list =
        phoneExists.list === undefined
          ? TemporalData[phoneCount].list
          : phoneExists.list === TemporalData[phoneCount].list
          ? phoneExists.list
          : TemporalData[phoneCount].list === undefined
          ? phoneExists.list
          : TemporalData[phoneCount].list
      //--------------------------------------------------------------------
      phoneExists.revenue =
        phoneExists.revenue === undefined
          ? TemporalData[phoneCount].revenue
          : phoneExists.revenue === TemporalData[phoneCount].revenue
          ? phoneExists.revenue
          : TemporalData[phoneCount].revenue === undefined
          ? phoneExists.revenue
          : TemporalData[phoneCount].revenue
      //--------------------------------------------------------------------
      phoneExists.monthlyIncome =
        phoneExists.monthlyIncome === undefined
          ? TemporalData[phoneCount].monthlyIncome
          : phoneExists.monthlyIncome === TemporalData[phoneCount].monthlyIncome
          ? phoneExists.monthlyIncome
          : TemporalData[phoneCount].monthlyIncome === undefined
          ? phoneExists.monthlyIncome
          : TemporalData[phoneCount].monthlyIncome
      //--------------------------------------------------------------------
      phoneExists.incomeSource =
        phoneExists.incomeSource === undefined
          ? TemporalData[phoneCount].incomeSource
          : phoneExists.incomeSource === TemporalData[phoneCount].incomeSource
          ? phoneExists.incomeSource
          : TemporalData[phoneCount].incomeSource === undefined
          ? phoneExists.incomeSource
          : TemporalData[phoneCount].incomeSource
      //--------------------------------------------------------------------
      phoneExists.carrier =
        phoneExists.carrier === undefined
          ? TemporalData[phoneCount].carrier
          : phoneExists.carrier === TemporalData[phoneCount].carrier
          ? phoneExists.carrier
          : TemporalData[phoneCount].carrier === undefined
          ? phoneExists.carrier
          : TemporalData[phoneCount].carrier
      //--------------------------------------------------------------------
      phoneExists.creditScore =
        phoneExists.creditScore === undefined
          ? TemporalData[phoneCount].creditScore
          : phoneExists.creditScore === TemporalData[phoneCount].creditScore
          ? phoneExists.creditScore
          : TemporalData[phoneCount].creditScore === undefined
          ? phoneExists.creditScore
          : TemporalData[phoneCount].creditScore
      //--------------------------------------------------------------------
      phoneExists.subId =
        phoneExists.subId === undefined
          ? TemporalData[phoneCount].subId
          : phoneExists.subId === TemporalData[phoneCount].subId
          ? phoneExists.subId
          : TemporalData[phoneCount].subId === undefined
          ? phoneExists.subId
          : TemporalData[phoneCount].subId
      //--------------------------------------------------------------------
      phoneExists.countryCode =
        phoneExists.countryCode === undefined
          ? TemporalData[phoneCount].countryCode
          : phoneExists.countryCode === TemporalData[phoneCount].countryCode
          ? phoneExists.countryCode
          : TemporalData[phoneCount].countryCode === undefined
          ? phoneExists.countryCode
          : TemporalData[phoneCount].countryCode
      //--------------------------------------------------------------------
      phoneExists.activePhone =
        phoneExists.activePhone === undefined
          ? TemporalData[phoneCount].activePhone
          : phoneExists.activePhone === TemporalData[phoneCount].activePhone
          ? phoneExists.activePhone
          : TemporalData[phoneCount].activePhone === undefined
          ? phoneExists.activePhone
          : TemporalData[phoneCount].activePhone
      //--------------------------------------------------------------------
      phoneExists.validStatus =
        phoneExists.validStatus === undefined
          ? TemporalData[phoneCount].validStatus
          : phoneExists.validStatus === TemporalData[phoneCount].validStatus
          ? phoneExists.validStatus
          : TemporalData[phoneCount].validStatus === undefined
          ? phoneExists.validStatus
          : TemporalData[phoneCount].validStatus
      //--------------------------------------------------------------------
      phoneExists.recentAbuse =
        phoneExists.recentAbuse === undefined
          ? TemporalData[phoneCount].recentAbuse
          : phoneExists.recentAbuse === TemporalData[phoneCount].recentAbuse
          ? phoneExists.recentAbuse
          : TemporalData[phoneCount].recentAbuse === undefined
          ? phoneExists.recentAbuse
          : TemporalData[phoneCount].recentAbuse
      //--------------------------------------------------------------------
      phoneExists.validMobile =
        phoneExists.validMobile === undefined
          ? TemporalData[phoneCount].validMobile
          : phoneExists.validMobile === TemporalData[phoneCount].validMobile
          ? phoneExists.validMobile
          : TemporalData[phoneCount].validMobile === undefined
          ? phoneExists.validMobile
          : TemporalData[phoneCount].validMobile
      //--------------------------------------------------------------------
      phoneExists.blackListAlliance =
        phoneExists.blackListAlliance === undefined
          ? TemporalData[phoneCount].blackListAlliance
          : phoneExists.blackListAlliance ===
            TemporalData[phoneCount].blackListAlliance
          ? phoneExists.blackListAlliance
          : TemporalData[phoneCount].blackListAlliance === undefined
          ? phoneExists.blackListAlliance
          : TemporalData[phoneCount].blackListAlliance
      //--------------------------------------------------------------------
      phoneExists.clicker =
        phoneExists.clicker === undefined
          ? TemporalData[phoneCount].clicker
          : phoneExists.clicker === TemporalData[phoneCount].clicker
          ? phoneExists.clicker
          : TemporalData[phoneCount].clicker === undefined
          ? phoneExists.clicker
          : TemporalData[phoneCount].clicker
      //--------------------------------------------------------------------
      phoneExists.converter =
        phoneExists.converter === undefined
          ? TemporalData[phoneCount].converter
          : phoneExists.converter === TemporalData[phoneCount].converter
          ? phoneExists.converter
          : TemporalData[phoneCount].converter === undefined
          ? phoneExists.converter
          : TemporalData[phoneCount].converter
      //--------------------------------------------------------------------
      phoneExists.hardBounce =
        phoneExists.hardBounce === undefined
          ? TemporalData[phoneCount].hardBounce
          : phoneExists.hardBounce === TemporalData[phoneCount].hardBounce
          ? phoneExists.hardBounce
          : TemporalData[phoneCount].hardBounce === undefined
          ? phoneExists.hardBounce
          : TemporalData[phoneCount].hardBounce
      //--------------------------------------------------------------------
      phoneExists.suppressed =
        phoneExists.suppressed === undefined
          ? TemporalData[phoneCount].suppressed
          : phoneExists.suppressed === TemporalData[phoneCount].suppressed
          ? phoneExists.suppressed
          : TemporalData[phoneCount].suppressed === undefined
          ? phoneExists.suppressed
          : TemporalData[phoneCount].suppressed
      //--------------------------------------------------------------------
      phoneExists.platform =
        phoneExists.platform === undefined
          ? TemporalData[phoneCount].platform
          : phoneExists.platform === TemporalData[phoneCount].platform
          ? phoneExists.platform
          : TemporalData[phoneCount].platform === undefined
          ? phoneExists.platform
          : TemporalData[phoneCount].platform
      //--------------------------------------------------------------------
      phoneExists.message =
        phoneExists.message === undefined
          ? TemporalData[phoneCount].message
          : phoneExists.message === TemporalData[phoneCount].message
          ? phoneExists.message
          : TemporalData[phoneCount].message === undefined
          ? phoneExists.message
          : TemporalData[phoneCount].message
      //--------------------------------------------------------------------
      phoneExists.fraudScore =
        phoneExists.fraudScore === undefined
          ? TemporalData[phoneCount].fraudScore
          : phoneExists.fraudScore === TemporalData[phoneCount].fraudScore
          ? phoneExists.fraudScore
          : TemporalData[phoneCount].fraudScore === undefined
          ? phoneExists.fraudScore
          : TemporalData[phoneCount].fraudScore
      //--------------------------------------------------------------------
      phoneExists.lineType =
        phoneExists.lineType === undefined
          ? TemporalData[phoneCount].lineType
          : phoneExists.lineType === TemporalData[phoneCount].lineType
          ? phoneExists.lineType
          : TemporalData[phoneCount].lineType === undefined
          ? phoneExists.lineType
          : TemporalData[phoneCount].lineType
      //--------------------------------------------------------------------
      phoneExists.prepaid =
        phoneExists.prepaid === undefined
          ? TemporalData[phoneCount].prepaid
          : phoneExists.prepaid === TemporalData[phoneCount].prepaid
          ? phoneExists.prepaid
          : TemporalData[phoneCount].prepaid === undefined
          ? phoneExists.prepaid
          : TemporalData[phoneCount].prepaid
      //--------------------------------------------------------------------
      phoneExists.risky =
        phoneExists.risky === undefined
          ? TemporalData[phoneCount].risky
          : phoneExists.risky === TemporalData[phoneCount].risky
          ? phoneExists.risky
          : TemporalData[phoneCount].risky === undefined
          ? phoneExists.risky
          : TemporalData[phoneCount].risky
      //--------------------------------------------------------------------
      phoneExists.city =
        phoneExists.city === undefined
          ? TemporalData[phoneCount].city
          : phoneExists.city === TemporalData[phoneCount].city
          ? phoneExists.city
          : TemporalData[phoneCount].city === undefined
          ? phoneExists.city
          : TemporalData[phoneCount].city
      //--------------------------------------------------------------------
      phoneExists.listID =
        phoneExists.listID === undefined
          ? TemporalData[phoneCount].listID
          : phoneExists.listID === TemporalData[phoneCount].listID
          ? phoneExists.listID
          : TemporalData[phoneCount].listID === undefined
          ? phoneExists.listID
          : TemporalData[phoneCount].listID
      //--------------------------------------------------------------------
      phoneExists.birthDate =
        phoneExists.birthDate === undefined
          ? TemporalData[phoneCount].birthDate
          : phoneExists.birthDate === TemporalData[phoneCount].birthDate
          ? phoneExists.birthDate
          : TemporalData[phoneCount].birthDate === undefined
          ? phoneExists.birthDate
          : TemporalData[phoneCount].birthDate
      //--------------------------------------------------------------------
      phoneExists.gender =
        phoneExists.gender === undefined
          ? TemporalData[phoneCount].gender
          : phoneExists.gender === TemporalData[phoneCount].gender
          ? phoneExists.gender
          : TemporalData[phoneCount].gender === undefined
          ? phoneExists.gender
          : TemporalData[phoneCount].gender
      //--------------------------------------------------------------------
      phoneExists.senderID =
        phoneExists.senderID === undefined
          ? TemporalData[phoneCount].senderID
          : phoneExists.senderID === TemporalData[phoneCount].senderID
          ? phoneExists.senderID
          : TemporalData[phoneCount].senderID === undefined
          ? phoneExists.senderID
          : TemporalData[phoneCount].senderID
      //--------------------------------------------------------------------
      phoneExists.sendAt =
        phoneExists.sendAt === undefined
          ? TemporalData[phoneCount].sendAt
          : phoneExists.sendAt === TemporalData[phoneCount].sendAt
          ? phoneExists.sendAt
          : TemporalData[phoneCount].sendAt === undefined
          ? phoneExists.sendAt
          : TemporalData[phoneCount].sendAt
      //--------------------------------------------------------------------
      phoneExists.validity =
        phoneExists.validity === undefined
          ? TemporalData[phoneCount].validity
          : phoneExists.validity === TemporalData[phoneCount].validity
          ? phoneExists.validity
          : TemporalData[phoneCount].validity === undefined
          ? phoneExists.validity
          : TemporalData[phoneCount].validity
      //--------------------------------------------------------------------
      phoneExists.subject =
        phoneExists.subject === undefined
          ? TemporalData[phoneCount].subject
          : phoneExists.subject === TemporalData[phoneCount].subject
          ? phoneExists.subject
          : TemporalData[phoneCount].subject === undefined
          ? phoneExists.subject
          : TemporalData[phoneCount].subject
      //--------------------------------------------------------------------
      phoneExists.vertical =
        phoneExists.vertical === undefined
          ? TemporalData[phoneCount].vertical
          : phoneExists.vertical === TemporalData[phoneCount].vertical
          ? phoneExists.vertical
          : TemporalData[phoneCount].vertical === undefined
          ? phoneExists.vertical
          : TemporalData[phoneCount].vertical
      //--------------------------------------------------------------------
      phoneExists.vertical2 =
        phoneExists.vertical2 === undefined
          ? TemporalData[phoneCount].vertical2
          : phoneExists.vertical2 === TemporalData[phoneCount].vertical2
          ? phoneExists.vertical2
          : TemporalData[phoneCount].vertical2 === undefined
          ? phoneExists.vertical2
          : TemporalData[phoneCount].vertical2
      //--------------------------------------------------------------------
      phoneExists.vertical3 =
        phoneExists.vertical3 === undefined
          ? TemporalData[phoneCount].vertical3
          : phoneExists.vertical3 === TemporalData[phoneCount].vertical3
          ? phoneExists.vertical3
          : TemporalData[phoneCount].vertical3 === undefined
          ? phoneExists.vertical3
          : TemporalData[phoneCount].vertical3
      //--------------------------------------------------------------------

      //console.log('Exists Update',phoneExists)
      await phoneExists.save()

      const DeletePhone = await ModelTemporal.findOne({
        phone: TemporalData[phoneCount].phone,
      })

      if (DeletePhone) {
        console.log('Phone Update delete')
        await DeletePhone.remove()
      } //else {
      //   res.status(404)
      //   throw new Error('Phone not found')
      // }
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
        hardBounce: TemporalData[phoneCount].hardBounce,
        suppressed: TemporalData[phoneCount].suppressed,
        platform: TemporalData[phoneCount].platform,
        message: TemporalData[phoneCount].message,
        fraudScore: TemporalData[phoneCount].fraudScore,
        lineType:
          TemporalData[phoneCount].lineType === 'unknown'
            ? null
            : TemporalData[phoneCount].lineType,
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
        vertical: TemporalData[phoneCount].vertical,
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
        } //else {
        //   res.status(404)
        //   throw new Error('Phone not found')
        // }
      } else {
        res.status(400)
        throw new Error('Invalid Phone data')
      }
    }
    if (requestCount - 1 === phoneCount) {
      return console.log('Upload Completed')
    }
  }) // second For
  // console.log('i', i)
  //}
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

// @routes POST /register-data
// Move data th Temporal to PhonesList
// @des Create or Update an Phones List
export const RegisterDataList = asyncHandler(async (req, res, next) => {
  const TemporalData = await ModelTemporal.find()

  console.log('TemporalData', TemporalData.length)

  TemporalData.forEach(async (prev, phoneCount) => {
    await prev
    const phoneExists = await PhoneList.findOne({
      phone: TemporalData[phoneCount].phone,
    })
    console.log('phoneCount', phoneCount)

    console.log('blackListAlliance', TemporalData[phoneCount].phone)

    if (phoneExists) {
      console.log('phoneExists')

      phoneExists.firstName =
        phoneExists.firstName === undefined
          ? TemporalData[phoneCount].firstName
          : phoneExists.firstName
      phoneExists.lastName =
        phoneExists.lastName === undefined
          ? TemporalData[phoneCount].lastName
          : phoneExists.lastName
      phoneExists.name =
        phoneExists.name === undefined
          ? TemporalData[phoneCount].name
          : phoneExists.name
      phoneExists.email =
        phoneExists.email === undefined
          ? TemporalData[phoneCount].email
          : phoneExists.email
      phoneExists.state =
        phoneExists.state === undefined
          ? TemporalData[phoneCount].state
          : phoneExists.state
      phoneExists.source =
        phoneExists.source === undefined
          ? TemporalData[phoneCount].source
          : phoneExists.source
      phoneExists.ip =
        phoneExists.ip === undefined
          ? TemporalData[phoneCount].ip
          : phoneExists.ip
      phoneExists.site =
        phoneExists.site === undefined
          ? TemporalData[phoneCount].site
          : phoneExists.site
      phoneExists.status =
        phoneExists.status === undefined
          ? TemporalData[phoneCount].status
          : phoneExists.status
      phoneExists.list =
        phoneExists.list === undefined
          ? TemporalData[phoneCount].list
          : phoneExists.list
      phoneExists.revenue =
        phoneExists.revenue === undefined
          ? TemporalData[phoneCount].revenue
          : phoneExists.revenue
      phoneExists.monthlyIncome =
        phoneExists.monthlyIncome === undefined
          ? TemporalData[phoneCount].monthlyIncome
          : phoneExists.monthlyIncome
      phoneExists.incomeSource =
        phoneExists.incomeSource === undefined
          ? TemporalData[phoneCount].incomeSource
          : phoneExists.incomeSource
      phoneExists.carrier =
        phoneExists.carrier === undefined
          ? TemporalData[phoneCount].carrier
          : phoneExists.carrier
      phoneExists.creditScore =
        phoneExists.creditScore === undefined
          ? TemporalData[phoneCount].creditScore
          : phoneExists.creditScore
      phoneExists.subId =
        phoneExists.subId === undefined
          ? TemporalData[phoneCount].subId
          : phoneExists.subId
      phoneExists.countryCode =
        phoneExists.countryCode === undefined
          ? TemporalData[phoneCount].countryCode
          : phoneExists.countryCode
      phoneExists.activePhone =
        phoneExists.activePhone === undefined
          ? TemporalData[phoneCount].activePhone
          : phoneExists.activePhone
      phoneExists.validStatus =
        phoneExists.validStatus === undefined
          ? TemporalData[phoneCount].validStatus
          : phoneExists.validStatus
      phoneExists.recentAbuse =
        phoneExists.recentAbuse === undefined
          ? TemporalData[phoneCount].recentAbuse
          : phoneExists.recentAbuse
      phoneExists.validMobile =
        phoneExists.validMobile === undefined
          ? TemporalData[phoneCount].validMobile
          : phoneExists.validMobile
      phoneExists.blackListAlliance =
        phoneExists.blackListAlliance === undefined
          ? TemporalData[phoneCount].blackListAlliance
          : phoneExists.blackListAlliance
      phoneExists.clicker =
        phoneExists.clicker === undefined
          ? TemporalData[phoneCount].clicker
          : phoneExists.clicker
      phoneExists.converter =
        phoneExists.converter === undefined
          ? TemporalData[phoneCount].converter
          : phoneExists.converter
      phoneExists.hardBounce =
        phoneExists.hardBounce === undefined
          ? TemporalData[phoneCount].hardBounce
          : phoneExists.hardBounce
      phoneExists.suppressed =
        phoneExists.suppressed === undefined
          ? TemporalData[phoneCount].suppressed
          : phoneExists.suppressed
      phoneExists.platform =
        phoneExists.platform === undefined
          ? TemporalData[phoneCount].platform
          : phoneExists.platform
      phoneExists.message =
        phoneExists.message === undefined
          ? TemporalData[phoneCount].message
          : phoneExists.message
      phoneExists.fraudScore =
        phoneExists.fraudScore === undefined
          ? TemporalData[phoneCount].fraudScore
          : phoneExists.fraudScore
      phoneExists.lineType =
        phoneExists.lineType === undefined
          ? TemporalData[phoneCount].lineType
          : phoneExists.lineType
      phoneExists.prepaid =
        phoneExists.prepaid === undefined
          ? TemporalData[phoneCount].prepaid
          : phoneExists.prepaid
      phoneExists.risky =
        phoneExists.risky === undefined
          ? TemporalData[phoneCount].risky
          : phoneExists.risky
      phoneExists.city =
        phoneExists.city === undefined
          ? TemporalData[phoneCount].city
          : phoneExists.city
      phoneExists.listID =
        phoneExists.listID === undefined
          ? TemporalData[phoneCount].listID
          : phoneExists.listID
      phoneExists.birthDate =
        phoneExists.birthDate === undefined
          ? TemporalData[phoneCount].birthDate
          : phoneExists.birthDate
      phoneExists.gender =
        phoneExists.gender === undefined
          ? TemporalData[phoneCount].gender
          : phoneExists.gender
      phoneExists.senderID =
        phoneExists.senderID === undefined
          ? TemporalData[phoneCount].senderID
          : phoneExists.senderID
      phoneExists.sendAt =
        phoneExists.sendAt === undefined
          ? TemporalData[phoneCount].sendAt
          : phoneExists.sendAt
      phoneExists.validity =
        phoneExists.validity === undefined
          ? TemporalData[phoneCount].validity
          : phoneExists.validity
      phoneExists.subject =
        phoneExists.subject === undefined
          ? TemporalData[phoneCount].subject
          : phoneExists.subject
      phoneExists.vertical =
        phoneExists.vertical === undefined
          ? TemporalData[phoneCount].vertical
          : phoneExists.vertical
      phoneExists.vertical2 =
        phoneExists.vertical2 === undefined
          ? TemporalData[phoneCount].vertical2
          : phoneExists.vertical2
      phoneExists.vertical3 =
        phoneExists.vertical3 === undefined
          ? TemporalData[phoneCount].vertical3
          : phoneExists.vertical3

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
        hardBounce: TemporalData[phoneCount].hardBounce,
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
        vertical: TemporalData[phoneCount].vertical,
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
