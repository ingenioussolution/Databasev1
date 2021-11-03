import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import ModelTemporal from '../models/TemporalData.js'
import moment from 'moment'


// @routes POST /register-data-temporal
// Move data th Temporal to PhonesList
// @des Create or Update an Phones List
export const UploadData = asyncHandler(async (req, res, next) => {
  const TemporalData = await ModelTemporal.find().limit(1)
  console.log('TemporalData Count:', TemporalData.length)

  TemporalData.forEach(async (prev, phoneCount) => {
    await prev
    const phoneExists = await PhoneList.findOne({
      phone: TemporalData[phoneCount].phone,
    })

    console.log('TemporalData:', TemporalData[phoneCount])

    if (phoneExists) {
      console.log('Phone Exists:', phoneExists)

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
      phoneExists.vertical2 =
        phoneExists.vertical2 === undefined
          ? TemporalData[phoneCount].vertical2
          : phoneExists.vertical2
      phoneExists.vertical3 =
        phoneExists.vertical3 === undefined
          ? TemporalData[phoneCount].vertical3
          : phoneExists.vertical3

      // await phoneExists.save()

      console.log('Phone List Update:', phoneExists)

      // const DeletePhone = await ModelTemporal.findOne({
      //   phone: TemporalData[phoneCount].phone,
      // })
      // if (DeletePhone) {
      //   console.log('Phone Update delete')
      //   await DeletePhone.remove()
      // } else {
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
        vertical2: TemporalData[phoneCount].vertical2,
        vertical3: TemporalData[phoneCount].vertical3,
      })

      if (phoneCreated) {
        console.log('Creating new row')

        //   const DeletePhoneNew = await ModelTemporal.findOne({
        //     phone: TemporalData[phoneCount].phone,
        //   })
        //   if (DeletePhoneNew) {
        //     await DeletePhoneNew.remove()
        //     console.log('Phone New delete')
        //   } else {
        //     res.status(404)
        //     throw new Error('Phone not found')
        //   }
      } else {
        res.status(400)
        throw new Error('Invalid Phone data')
      }
    }
  })
})

export const getPhoneListPagination = asyncHandler(async (req, res, next) => {
  let aggregate_options = []
  let search = !!req.query.q
  let match_regex = { $regex: req.query.q, $options: 'i' } //use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.

  //PAGINATION -- set the options for pagination
  const options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    
  }

  //1
  //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
  //if (search) aggregate_options.push({ $match: { carrier: match_regex } })

  //FILTER BY DATE -- FOURTH STAGE
  // if (req.query.start) {
  //   let start = moment(req.query.start).startOf('day')
  //   let end = moment(req.query.start).endOf('day') // add 1 day

  //   if (req.query.end) end = req.query.end

  //   aggregate_options.push({
  //     $match: { updatedAt: { $gte: new Date(start), $lte: new Date(end) } },
  //   })
  // } else if (req.query.end) {
  //   aggregate_options.push({
  //     $match: { updatedAt: { $lte: new Date(req.query.end) } },
  //   })
  // } else if (!search) {
  //   aggregate_options.push({
  //     $match: { updatedAt: { $gte: new Date() } },
  //   })
  // }

  //SELECT FIELDS
  aggregate_options.push({
    $project: {
      clicker:1,
      hardBounce: 1,
      phone:1,
      revenue:1,
      converter:1,
      suppressed:1,
    },
  })

  // Set up the aggregation
  const myAggregate = PhoneList.aggregate()
  const result = await PhoneList.aggregatePaginate(myAggregate, options) 

  res.status(200).json(result)
})
