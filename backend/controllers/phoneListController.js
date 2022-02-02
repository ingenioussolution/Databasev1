// phone list Model
import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import ModelTemporal from '../models/TemporalData.js'
import BadAreaCode from '../models/badAreaCode.js'
import axios from 'axios'

// @routes GET /phoneslist/count-filter
// @des GET Count Filter
// @access  Private/User
export const getCountFilters = asyncHandler(async (req, res, next) => {
  // FILTERS QUERY
  const hardBounce = req.query.hardBounce
  const clicker = req.query.clicker
  const phone = req.query.phone
  const revenue = req.query.revenue
  const converter = req.query.converter
  const suppressed = req.query.suppressed
  let sourceFilter = req.query.source
  let source = { $regex: '^' + `${sourceFilter}` + '.*', $options: 'i' }
  let carrierFilter = req.query.carrier
  let carrier = { $regex: `${carrierFilter}`, $options: 'i' }
  const firstNameFilter = req.query.firstName
  let firstName = { $regex: `${firstNameFilter}`, $options: 'i' }

  const createdAt_start = req.query.start
  const createdAt_end = req.query.end
  const areaCode = req.query.areaCode
  let arrayFilters = []

  let arrayBadArea = []
  const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })

  areaBadCode.map((obj) => {
    arrayBadArea.push(new RegExp('^' + obj.areaCode))
  })
  if (
    clicker ||
    hardBounce ||
    phone ||
    revenue ||
    converter ||
    suppressed ||
    firstNameFilter ||
    carrierFilter ||
    areaCode ||
    createdAt_start ||
    createdAt_end ||
    sourceFilter
  ) {
    if (clicker) {
      arrayFilters.push({ clicker: clicker })
    }
    if (hardBounce === 'false') {
      arrayFilters.push({ hardBounce: { $ne: true } })
    } else if (hardBounce === 'true') {
      arrayFilters.push({ hardBounce: hardBounce })
    }
    if (revenue) {
      arrayFilters.push({ revenue: revenue })
    }
    if (phone) {
      arrayFilters.push({ phone: phone })
    }
    if (converter) {
      arrayFilters.push({ converter: converter })
    }
    if (suppressed) {
      if (suppressed === 'false') {
        arrayFilters.push({ suppressed: { $ne: true } })
      } else if (suppressed === 'true') {
        arrayFilters.push({ suppressed: suppressed })
      }
    }
    if (carrierFilter) {
      arrayFilters.push({ carrier: carrier })
    }
    if (sourceFilter) {
      arrayFilters.push({ source: source })
    }
    if (firstNameFilter) {
      arrayFilters.push({ firstName: firstName })
    }
    if (createdAt_start || createdAt_end) {
      arrayFilters.push({
        createdAt: {
          $gte: new Date(createdAt_start),
          $lt: new Date(createdAt_end),
        },
      })
    }
    if (areaCode) {
      arrayFilters.push({
        phone: {
          $nin: arrayBadArea,
        },
      })
    }
    console.log('Array:', ...arrayFilters)
    if (arrayFilters) {
      console.time()
      const countFilter = await PhoneList.find(
        { $and: arrayFilters },
        { phone: 1, _id: 0 }
      )
        .count()
        .limit(500000)

      res.status(200).json({
        countFilter,
      })
    }
  }
})

// @routes GET /phoneslist/
// @des GET All Phone List
// @access  Private/User
export const getPhoneListFrontEnd = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY
    const hardBounce = req.query.hardBounce
    const clicker = req.query.clicker
    const repliers = req.query.repliers
    const phone = req.query.phone
    const revenue = req.query.revenue
    const converter = req.query.converter
    const suppressed = req.query.suppressed

    let sourceFilter = req.query.source
    //let sourceFilter = req.query.source
    //let source = { $regex:  '^' + `${sourceFilter}` + '$', $options: 'i' }
    let carrierFilter = req.query.carrier
    let carrier = { $regex: `${carrierFilter}`, $options: 'i' }
    const firstNameFilter = req.query.firstName
    let firstName = { $regex: `${firstNameFilter}`, $options: 'i' }
    const createdAt_start = req.query.start
    const createdAt_end = req.query.end
    const areaCode = req.query.areaCode
    let arrayFilters = []

    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1

    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })

    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    if (
      clicker ||
      hardBounce ||
      phone ||
      revenue ||
      converter ||
      suppressed ||
      firstNameFilter ||
      carrierFilter ||
      areaCode ||
      createdAt_start ||
      createdAt_end ||
      sourceFilter ||
      repliers
    ) {
      if (createdAt_start || createdAt_end) {
        arrayFilters.push({
          createdAt: {
            $gte: new Date(createdAt_start),
            $lt: new Date(createdAt_end),
          },
        })
      }
      if (carrierFilter) {
        arrayFilters.push({ carrier: carrier })
      }
      if (sourceFilter) {
        arrayFilters.push({ source: sourceFilter })
      }

      // if (sourceFilter) {
      //   arrayFilters.push({ source: source })
      // }

      if (firstNameFilter) {
        arrayFilters.push({ firstName: firstName })
      }
      if (repliers) {
        if (repliers === 'false') {
          arrayFilters.push({ repliers: { $ne: true } })
        } else if (repliers === 'true') {
          arrayFilters.push({ repliers: repliers })
        }
      }

      if (converter === 'true' && clicker === 'true') {
        arrayFilters.push({
          $or: [{ converter: converter }, { clicker: clicker }],
        })
      } 
      if (converter) {
        if (converter === 'false') {
          arrayFilters.push({ converter: { $ne: true } })
        } else if (converter === 'true') {
          arrayFilters.push({ converter: converter })
        }
      }
      if (clicker) {
        if (clicker === 'false') {
          arrayFilters.push({ clicker: { $ne: true } })
        } else if (clicker === 'true') {
          arrayFilters.push({ clicker: clicker })
        }
      }
  
      if (suppressed) {
        if (suppressed === 'false') {
          arrayFilters.push({ suppressed: { $ne: true } })
        } else if (suppressed === 'true') {
          arrayFilters.push({ suppressed: suppressed })
        }
      }
      if (hardBounce === 'false') {
        arrayFilters.push({ hardBounce: { $ne: true } })
      } else if (hardBounce === 'true') {
        console.log('hard bounce TRUE')
        arrayFilters.push({ hardBounce: hardBounce })
      }

      if (revenue) {
        arrayFilters.push({ revenue: revenue })
      }
      if (phone) {
        arrayFilters.push({ phone: phone })
      }

      if (areaCode === 'true') {
        arrayFilters.push({
          phone: {
            $nin: arrayBadArea,
          },
        })
      } else if (areaCode === 'false') {
        arrayFilters.push({
          phone: {
            $in: arrayBadArea,
          },
        })
      }
      console.log('Array:', ...arrayFilters)
      if (arrayFilters) {
        console.time()
        const count = await PhoneList.find(
          { $and: arrayFilters },
          { phone: 1, _id: 0 }
        )
          .count()
          .lean()
        //.limit(500000)

        console.timeEnd()

        const data = await PhoneList.find({
          $and: arrayFilters,
        })
          .limit(pageSize)
          .sort({ createdAt: 1 })
          .skip(pageSize * (page - 1))
          .lean()

        res.status(200).json({
          data,
          page,
          totalPages: Math.ceil(count / pageSize),
        })
      }
    }
    //------------------------------------
    else {
      console.log('no filters')
      //const count = await PhoneList.find({}, { phone: 1, _id: 0 })
      //   .count()
      //   .lean()
      //const count = await PhoneList.countDocuments({})

      let count = await PhoneList.count().limit(500000)
      const total = Math.ceil(count / pageSize)

      const data = await PhoneList.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean()

      res.status(200).json({
        data,
        page,
        totalPages: total,
      })
    }
  } catch (error) {
    next(error)
  }
})

// @routes GET /phoneslist/master-ccc
// @des GET Master CCC
// @access  Private/User
export const getMasterCCC = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY
    const hardBounce = req.query.hardBounce
    const clicker = req.query.clicker
    const revenue = req.query.revenue
    const converter = req.query.converter
    const suppressed = req.query.suppressed
    let sourceFilter = req.query.source
    let source = { $regex: '^' + `${sourceFilter}` + '.*', $options: 'i' }
    let carrierFilter = req.query.carrier
    let carrier = { $regex: `${carrierFilter}`, $options: 'i' }

    const createdAt_start = req.query.start
    const createdAt_end = req.query.end

    // const updateAt_start = req.query.update-start
    // const updateAt_end = req.query.update-end

    const areaCode = req.query.areaCode
    let arrayFilters = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }
    const pageSize = 10
    const page = parseInt(req.query.pageNumber) || 1

    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })

    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    if (
      clicker ||
      hardBounce ||
      revenue ||
      converter ||
      suppressed ||
      carrierFilter ||
      areaCode ||
      createdAt_start ||
      createdAt_end ||
      sourceFilter
      // updateAt_start ||
      // updateAt_end ||
    ) {
      if (hardBounce === 'false') {
        arrayFilters.push({ hardBounce: { $ne: true } })
      } else if (hardBounce === 'true') {
        arrayFilters.push({ hardBounce: hardBounce })
      }

      if (revenue) {
        arrayFilters.push({ revenue: revenue })
      }
      if (clicker || converter) {
        if (converter === 'true' && clicker === 'true') {
          arrayFilters.push({
            $or: [{ converter: converter }, { clicker: clicker }],
          })
        } else if (clicker === 'false') {
          arrayFilters.push({ clicker: { $ne: true } })
        } else if (clicker === 'true') {
          arrayFilters.push({ clicker: clicker })
        } else if (converter === 'false') {
          arrayFilters.push({ converter: { $ne: true } })
        } else if (converter === 'true') {
          arrayFilters.push({ converter: converter })
        }
      }

      if (suppressed) {
        if (suppressed === 'false') {
          arrayFilters.push({ suppressed: { $ne: true } })
        } else if (suppressed === 'true') {
          arrayFilters.push({ suppressed: suppressed })
        }
      }
      if (carrierFilter) {
        arrayFilters.push({ carrier: carrier })
      }
      if (sourceFilter) {
        arrayFilters.push({ source: source })
      }
      // created phone
      if (createdAt_start || createdAt_end) {
        arrayFilters.push({
          createdAt: {
            $gte: new Date(createdAt_start),
            $lt: new Date(createdAt_end),
          },
        })
      }
      // updated phone
      // if (updateAt_start || updateAt_end) {
      //   arrayFilters.push({
      //     createdAt: {
      //       $gte: new Date(updateAt_start),
      //       $lt: new Date(updateAt_end),
      //     },
      //   })
      // }

      if (areaCode) {
        arrayFilters.push({
          phone: {
            $nin: arrayBadArea,
          },
        })
      }

      console.log('Array:', ...arrayFilters)
      if (arrayFilters) {
        console.time()
        const count = await PhoneList.find(
          { $and: arrayFilters },
          { phone: 1, _id: 0 }
        )
          .limit(500000)
          .count()

        const data = await PhoneList.find({
          $and: arrayFilters,
        })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .lean()

        res.status(200).json({
          data,
          clicker,
          revenue,
          suppressed,
          converter,
          hardBounce,
          search,
          page,
          totalPages: Math.ceil(count / pageSize),
        })
      }
    }
    //------------------------------------
    else {
      console.log('no filters')
      const count = await PhoneList.find({}, { phone: 1 }).count().lean()
      const data = await PhoneList.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .lean()

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
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const listPhones = await PhoneList.paginate({}, { page, limit }).lean()

    if (!listPhones) throw Error('Not items')
    res.status(200).json({
      data: listPhones.docs,
      limit: listPhones.limit,
      page: listPhones.page,
      totalDocs: listPhones.totalDocs,
      nextPage: listPhones.nextPage,
      prevPage: listPhones.prevPage,
      hasNextPage: listPhones.hasNextPage,
      hasPrevPage: listPhones.hasPrevPage,
      totalPages: listPhones.totalPages,
      pagingCounter: listPhones.pagingCounter,
    })
  } catch (error) {
    next(error)
  }
})

// FILTER DATA API BLACKLIST ALLIANCE
const temporal = []
// Return Array after filter with BlackList API
export const getPhoneList = asyncHandler(async (req, res, next) => {
  try {
    const listPhones = await PhoneList.find()

    await listPhones.reduce(async (prev, phoneNumber) => {
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
  })
}

// @routes POST /register-data
// Move data th Temporal to PhonesList
// @des Create or Update an Phones List
export const AddPhoneList = asyncHandler(async (req, res, next) => {
  let requestCount = 100000 //parseInt(req.query.count) || 100000
  let count = await ModelTemporal.countDocuments()
  const skipCount = 100000
  const total = Math.ceil(count / requestCount)
  let newPhone = []
  let updatePhone = []

  console.log('count: ', count)

  for (let i = 1; i <= total; i++) {
    console.log('i:', i, total)

    const TemporalData = await ModelTemporal.find({})
      .limit(requestCount)
      .skip(skipCount * (i - 1))

    console.log('TemporalData', TemporalData.length)

    if (TemporalData.length) {
      await TemporalData?.forEach(async (prev, phoneCount) => {
        await prev
        const phoneExists = await PhoneList.findOne({
          phone: TemporalData[phoneCount].phone,
        })
        if (phoneExists) {
          console.log('Phone Exists')
          // Count total update phones
          updatePhone.push(phoneExists)

          phoneExists.burstOptOut =
            phoneExists.burstOptOut === undefined
              ? TemporalData[phoneCount].burstOptOut
              : phoneExists.burstOptOut === TemporalData[phoneCount].burstOptOut
              ? phoneExists.burstOptOut
              : TemporalData[phoneCount].burstOptOut === undefined
              ? phoneExists.burstOptOut
              : TemporalData[phoneCount].burstOptOut
          //--------------------------------------------------------------------
          phoneExists.repliers =
            phoneExists.repliers === undefined
              ? TemporalData[phoneCount].repliers
              : phoneExists.repliers === TemporalData[phoneCount].repliers
              ? phoneExists.repliers
              : TemporalData[phoneCount].repliers === undefined
              ? phoneExists.repliers
              : TemporalData[phoneCount].repliers
          //--------------------------------------------------------------------

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
              : phoneExists.monthlyIncome ===
                TemporalData[phoneCount].monthlyIncome
              ? phoneExists.monthlyIncome
              : TemporalData[phoneCount].monthlyIncome === undefined
              ? phoneExists.monthlyIncome
              : TemporalData[phoneCount].monthlyIncome
          //--------------------------------------------------------------------
          phoneExists.incomeSource =
            phoneExists.incomeSource === undefined
              ? TemporalData[phoneCount].incomeSource
              : phoneExists.incomeSource ===
                TemporalData[phoneCount].incomeSource
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
          } else {
            res.status(404)
            throw new Error('Phone not found')
          }
        } else {
          // count total New Phones
          newPhone.push(TemporalData[phoneCount])

          console.log('New Phone row')
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
            repliers: TemporalData[phoneCount].repliers,
            burstOptOut: TemporalData[phoneCount].burstOptOut,
          })

          if (phoneCreated) {
            console.log('New Phone row')

            const DeletePhoneNew = await ModelTemporal.findOne({
              phone: TemporalData[phoneCount].phone,
            })
            if (DeletePhoneNew) {
              await DeletePhoneNew.remove()
              //console.log('Phone New delete')
            } else {
              res.status(404)
              throw new Error('Phone not found')
            }
          } else {
            res.status(400)
            throw new Error('Invalid Phone data')
          }
        }
      }) // end For
    }
  }
  res.status(201).json({
    message: 'Import Successfully !!!!',
    news: newPhone.length,
    update: updatePhone.length,
    total: count,
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

// @routes POST /register-data
// Move data th Temporal to PhonesList
// @des Create or Update an Phones List
export const RegisterDataList = asyncHandler(async (req, res, next) => {
  const TemporalData = await ModelTemporal.find()

  TemporalData.forEach(async (prev, phoneCount) => {
    await prev
    const phoneExists = await PhoneList.findOne({
      phone: TemporalData[phoneCount].phone,
    })
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
        const DeletePhoneNew = await ModelTemporal.findOne({
          phone: TemporalData[phoneCount].phone,
        })
        if (DeletePhoneNew) {
          await DeletePhoneNew.remove()
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
