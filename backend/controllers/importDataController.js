import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import ModelTemporal from '../models/TemporalData.js'

// import data All

export const ImportDataAll = asyncHandler(async (req, res, next) => {
  try {
    let requestCount = 10000 //parseInt(req.query.count) || 100000
    let count = await ModelTemporal.countDocuments()
    const skipCount = 10000
    const size = 10000
    const total = Math.ceil(count / requestCount)
    let newPhone = []
    let updatePhone = []
    let resultTemp = []
    let TemporalData = []

    console.log('total ', total)
    if(total){

    for (let i = 1; i <= total; i++) {
      console.log('next ', i, total)

      await ModelTemporal.find({})
        .limit(requestCount)
        .skip(skipCount * (i - 1))
        .then((result) => {
          resultTemp.push(...result)
        })

      console.log('resultTemp', resultTemp.length)
    }

    if (resultTemp.length !== 0) {
      const chunk = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
          TemporalData.push(arr.slice(i * size, i * size + size))
        )
      console.log('chunk', chunk(resultTemp, size))
      console.log('NewArray', TemporalData.length)

      for (let x = 0; x < TemporalData.length; x++) {
        await TemporalData[x].reduce(async (prev, phoneCount) => {
          await prev
          const phoneExists = await PhoneList.findOne({
            phone: phoneCount.phone,
          })
          console.log('phoneCount', phoneCount.phone)

          if (phoneExists) {
            console.log('Phone Exists')
            // Count total update phones
            updatePhone.push(phoneExists)

            phoneExists.firstName =
              phoneExists.firstName === undefined
                ? phoneCount.firstName
                : phoneExists.firstName === phoneCount.firstName
                ? phoneExists.firstName
                : phoneCount.firstName === undefined
                ? phoneExists.firstName
                : phoneCount.firstName
            //--------------------------------------------------------------------
            phoneExists.lastName =
              phoneExists.lastName === undefined
                ? phoneCount.lastName
                : phoneExists.lastName === phoneCount.lastName
                ? phoneExists.lastName
                : phoneCount.lastName === undefined
                ? phoneExists.lastName
                : phoneCount.lastName
            //--------------------------------------------------------------------
            phoneExists.name =
              phoneExists.name === undefined
                ? phoneCount.name
                : phoneExists.name === phoneCount.name
                ? phoneExists.name
                : phoneCount.name === undefined
                ? phoneExists.name
                : phoneCount.name
            //--------------------------------------------------------------------
            phoneExists.email =
              phoneExists.email === undefined
                ? phoneCount.email
                : phoneExists.email === phoneCount.email
                ? phoneExists.email
                : phoneCount.email === undefined
                ? phoneExists.email
                : phoneCount.email
            //--------------------------------------------------------------------
            phoneExists.state =
              phoneExists.state === undefined
                ? phoneCount.state
                : phoneExists.state === phoneCount.state
                ? phoneExists.state
                : phoneCount.state === undefined
                ? phoneExists.state
                : phoneCount.state
            //--------------------------------------------------------------------
            phoneExists.source =
              phoneExists.source === undefined
                ? phoneCount.source
                : phoneExists.source === phoneCount.source
                ? phoneExists.source
                : phoneCount.source === undefined
                ? phoneExists.source
                : phoneCount.source

            //--------------------------------------------------------------------
            phoneExists.ip =
              phoneExists.ip === undefined
                ? phoneCount.ip
                : phoneExists.ip === phoneCount.ip
                ? phoneExists.ip
                : phoneCount.ip === undefined
                ? phoneExists.ip
                : phoneCount.ip
            //--------------------------------------------------------------------
            phoneExists.site =
              phoneExists.site === undefined
                ? phoneCount.site
                : phoneExists.site === phoneCount.site
                ? phoneExists.site
                : phoneCount.site === undefined
                ? phoneExists.site
                : phoneCount.site
            //--------------------------------------------------------------------
            phoneExists.status =
              phoneExists.status === undefined
                ? phoneCount.status
                : phoneExists.status === phoneCount.status
                ? phoneExists.status
                : phoneCount.status === undefined
                ? phoneExists.status
                : phoneCount.status
            //--------------------------------------------------------------------
            phoneExists.list =
              phoneExists.list === undefined
                ? phoneCount.list
                : phoneExists.list === phoneCount.list
                ? phoneExists.list
                : phoneCount.list === undefined
                ? phoneExists.list
                : phoneCount.list
            //--------------------------------------------------------------------
            phoneExists.revenue =
              phoneExists.revenue === undefined
                ? phoneCount.revenue
                : phoneExists.revenue === phoneCount.revenue
                ? phoneExists.revenue
                : phoneCount.revenue === undefined
                ? phoneExists.revenue
                : phoneCount.revenue
            //--------------------------------------------------------------------
            phoneExists.monthlyIncome =
              phoneExists.monthlyIncome === undefined
                ? phoneCount.monthlyIncome
                : phoneExists.monthlyIncome === phoneCount.monthlyIncome
                ? phoneExists.monthlyIncome
                : phoneCount.monthlyIncome === undefined
                ? phoneExists.monthlyIncome
                : phoneCount.monthlyIncome
            //--------------------------------------------------------------------
            phoneExists.incomeSource =
              phoneExists.incomeSource === undefined
                ? phoneCount.incomeSource
                : phoneExists.incomeSource === phoneCount.incomeSource
                ? phoneExists.incomeSource
                : phoneCount.incomeSource === undefined
                ? phoneExists.incomeSource
                : phoneCount.incomeSource
            //--------------------------------------------------------------------
            phoneExists.carrier =
              phoneExists.carrier === undefined
                ? phoneCount.carrier
                : phoneExists.carrier === phoneCount.carrier
                ? phoneExists.carrier
                : phoneCount.carrier === undefined
                ? phoneExists.carrier
                : phoneCount.carrier
            //--------------------------------------------------------------------
            phoneExists.creditScore =
              phoneExists.creditScore === undefined
                ? phoneCount.creditScore
                : phoneExists.creditScore === phoneCount.creditScore
                ? phoneExists.creditScore
                : phoneCount.creditScore === undefined
                ? phoneExists.creditScore
                : phoneCount.creditScore
            //--------------------------------------------------------------------
            phoneExists.subId =
              phoneExists.subId === undefined
                ? phoneCount.subId
                : phoneExists.subId === phoneCount.subId
                ? phoneExists.subId
                : phoneCount.subId === undefined
                ? phoneExists.subId
                : phoneCount.subId
            //--------------------------------------------------------------------
            phoneExists.countryCode =
              phoneExists.countryCode === undefined
                ? phoneCount.countryCode
                : phoneExists.countryCode === phoneCount.countryCode
                ? phoneExists.countryCode
                : phoneCount.countryCode === undefined
                ? phoneExists.countryCode
                : phoneCount.countryCode
            //--------------------------------------------------------------------
            phoneExists.activePhone =
              phoneExists.activePhone === undefined
                ? phoneCount.activePhone
                : phoneExists.activePhone === phoneCount.activePhone
                ? phoneExists.activePhone
                : phoneCount.activePhone === undefined
                ? phoneExists.activePhone
                : phoneCount.activePhone
            //--------------------------------------------------------------------
            phoneExists.validStatus =
              phoneExists.validStatus === undefined
                ? phoneCount.validStatus
                : phoneExists.validStatus === phoneCount.validStatus
                ? phoneExists.validStatus
                : phoneCount.validStatus === undefined
                ? phoneExists.validStatus
                : phoneCount.validStatus
            //--------------------------------------------------------------------
            phoneExists.recentAbuse =
              phoneExists.recentAbuse === undefined
                ? phoneCount.recentAbuse
                : phoneExists.recentAbuse === phoneCount.recentAbuse
                ? phoneExists.recentAbuse
                : phoneCount.recentAbuse === undefined
                ? phoneExists.recentAbuse
                : phoneCount.recentAbuse
            //--------------------------------------------------------------------
            phoneExists.validMobile =
              phoneExists.validMobile === undefined
                ? phoneCount.validMobile
                : phoneExists.validMobile === phoneCount.validMobile
                ? phoneExists.validMobile
                : phoneCount.validMobile === undefined
                ? phoneExists.validMobile
                : phoneCount.validMobile
            //--------------------------------------------------------------------
            phoneExists.blackListAlliance =
              phoneExists.blackListAlliance === undefined
                ? phoneCount.blackListAlliance
                : phoneExists.blackListAlliance === phoneCount.blackListAlliance
                ? phoneExists.blackListAlliance
                : phoneCount.blackListAlliance === undefined
                ? phoneExists.blackListAlliance
                : phoneCount.blackListAlliance
            //--------------------------------------------------------------------
            phoneExists.clicker =
              phoneExists.clicker === undefined
                ? phoneCount.clicker
                : phoneExists.clicker === phoneCount.clicker
                ? phoneExists.clicker
                : phoneCount.clicker === undefined
                ? phoneExists.clicker
                : phoneCount.clicker
            //--------------------------------------------------------------------
            phoneExists.converter =
              phoneExists.converter === undefined
                ? phoneCount.converter
                : phoneExists.converter === phoneCount.converter
                ? phoneExists.converter
                : phoneCount.converter === undefined
                ? phoneExists.converter
                : phoneCount.converter
            //--------------------------------------------------------------------
            phoneExists.hardBounce =
              phoneExists.hardBounce === undefined
                ? phoneCount.hardBounce
                : phoneExists.hardBounce === phoneCount.hardBounce
                ? phoneExists.hardBounce
                : phoneCount.hardBounce === undefined
                ? phoneExists.hardBounce
                : phoneCount.hardBounce
            //--------------------------------------------------------------------
            phoneExists.suppressed =
              phoneExists.suppressed === undefined
                ? phoneCount.suppressed
                : phoneExists.suppressed === phoneCount.suppressed
                ? phoneExists.suppressed
                : phoneCount.suppressed === undefined
                ? phoneExists.suppressed
                : phoneCount.suppressed
            //--------------------------------------------------------------------
            phoneExists.platform =
              phoneExists.platform === undefined
                ? phoneCount.platform
                : phoneExists.platform === phoneCount.platform
                ? phoneExists.platform
                : phoneCount.platform === undefined
                ? phoneExists.platform
                : phoneCount.platform
            //--------------------------------------------------------------------
            phoneExists.message =
              phoneExists.message === undefined
                ? phoneCount.message
                : phoneExists.message === phoneCount.message
                ? phoneExists.message
                : phoneCount.message === undefined
                ? phoneExists.message
                : phoneCount.message
            //--------------------------------------------------------------------
            phoneExists.fraudScore =
              phoneExists.fraudScore === undefined
                ? phoneCount.fraudScore
                : phoneExists.fraudScore === phoneCount.fraudScore
                ? phoneExists.fraudScore
                : phoneCount.fraudScore === undefined
                ? phoneExists.fraudScore
                : phoneCount.fraudScore
            //--------------------------------------------------------------------
            phoneExists.lineType =
              phoneExists.lineType === undefined
                ? phoneCount.lineType
                : phoneExists.lineType === phoneCount.lineType
                ? phoneExists.lineType
                : phoneCount.lineType === undefined
                ? phoneExists.lineType
                : phoneCount.lineType
            //--------------------------------------------------------------------
            phoneExists.prepaid =
              phoneExists.prepaid === undefined
                ? phoneCount.prepaid
                : phoneExists.prepaid === phoneCount.prepaid
                ? phoneExists.prepaid
                : phoneCount.prepaid === undefined
                ? phoneExists.prepaid
                : phoneCount.prepaid
            //--------------------------------------------------------------------
            phoneExists.risky =
              phoneExists.risky === undefined
                ? phoneCount.risky
                : phoneExists.risky === phoneCount.risky
                ? phoneExists.risky
                : phoneCount.risky === undefined
                ? phoneExists.risky
                : phoneCount.risky
            //--------------------------------------------------------------------
            phoneExists.city =
              phoneExists.city === undefined
                ? phoneCount.city
                : phoneExists.city === phoneCount.city
                ? phoneExists.city
                : phoneCount.city === undefined
                ? phoneExists.city
                : phoneCount.city
            //--------------------------------------------------------------------
            phoneExists.listID =
              phoneExists.listID === undefined
                ? phoneCount.listID
                : phoneExists.listID === phoneCount.listID
                ? phoneExists.listID
                : phoneCount.listID === undefined
                ? phoneExists.listID
                : phoneCount.listID
            //--------------------------------------------------------------------
            phoneExists.birthDate =
              phoneExists.birthDate === undefined
                ? phoneCount.birthDate
                : phoneExists.birthDate === phoneCount.birthDate
                ? phoneExists.birthDate
                : phoneCount.birthDate === undefined
                ? phoneExists.birthDate
                : phoneCount.birthDate
            //--------------------------------------------------------------------
            phoneExists.gender =
              phoneExists.gender === undefined
                ? phoneCount.gender
                : phoneExists.gender === phoneCount.gender
                ? phoneExists.gender
                : phoneCount.gender === undefined
                ? phoneExists.gender
                : phoneCount.gender
            //--------------------------------------------------------------------
            phoneExists.senderID =
              phoneExists.senderID === undefined
                ? phoneCount.senderID
                : phoneExists.senderID === phoneCount.senderID
                ? phoneExists.senderID
                : phoneCount.senderID === undefined
                ? phoneExists.senderID
                : phoneCount.senderID
            //--------------------------------------------------------------------
            phoneExists.sendAt =
              phoneExists.sendAt === undefined
                ? phoneCount.sendAt
                : phoneExists.sendAt === phoneCount.sendAt
                ? phoneExists.sendAt
                : phoneCount.sendAt === undefined
                ? phoneExists.sendAt
                : phoneCount.sendAt
            //--------------------------------------------------------------------
            phoneExists.validity =
              phoneExists.validity === undefined
                ? phoneCount.validity
                : phoneExists.validity === phoneCount.validity
                ? phoneExists.validity
                : phoneCount.validity === undefined
                ? phoneExists.validity
                : phoneCount.validity
            //--------------------------------------------------------------------
            phoneExists.subject =
              phoneExists.subject === undefined
                ? phoneCount.subject
                : phoneExists.subject === phoneCount.subject
                ? phoneExists.subject
                : phoneCount.subject === undefined
                ? phoneExists.subject
                : phoneCount.subject
            //--------------------------------------------------------------------
            phoneExists.vertical =
              phoneExists.vertical === undefined
                ? phoneCount.vertical
                : phoneExists.vertical === phoneCount.vertical
                ? phoneExists.vertical
                : phoneCount.vertical === undefined
                ? phoneExists.vertical
                : phoneCount.vertical
            //--------------------------------------------------------------------
            phoneExists.vertical2 =
              phoneExists.vertical2 === undefined
                ? phoneCount.vertical2
                : phoneExists.vertical2 === phoneCount.vertical2
                ? phoneExists.vertical2
                : phoneCount.vertical2 === undefined
                ? phoneExists.vertical2
                : phoneCount.vertical2
            //--------------------------------------------------------------------
            phoneExists.vertical3 =
              phoneExists.vertical3 === undefined
                ? phoneCount.vertical3
                : phoneExists.vertical3 === phoneCount.vertical3
                ? phoneExists.vertical3
                : phoneCount.vertical3 === undefined
                ? phoneExists.vertical3
                : phoneCount.vertical3
            //--------------------------------------------------------------------

            await phoneExists.save()

            const DeletePhone = await ModelTemporal.findOne({
              phone: phoneCount.phone,
            })
            if (DeletePhone) {
              console.log('Phone Update delete')
              await DeletePhone.remove()
            } else {
              res.status(404)
              throw new Error('Phone not found')
            }
          } else {
            //count total New Phones
            newPhone.push(phoneCount)

            const phoneCreated = await PhoneList.create({
              firstName: phoneCount.firstName,
              lastName: phoneCount.lastName,
              email: phoneCount.email,
              name: phoneCount.name,
              phone: phoneCount.phone,
              state: phoneCount.state,
              carrier:
                phoneCount.carrier === 'unknown_carrier'
                  ? null
                  : phoneCount.carrier,

              source: phoneCount.source,
              ip: phoneCount.ip,
              site: phoneCount.site,
              status: phoneCount.status,
              list: phoneCount.list,
              revenue: phoneCount.revenue,
              monthlyIncome: phoneCount.monthlyIncome,
              incomeSource: phoneCount.incomeSource,
              creditScore: phoneCount.creditScore,
              zipCode: phoneCount.zipCode,
              subId: phoneCount.subId,
              countryCode: phoneCount.countryCode,
              activePhone: phoneCount.activePhone,
              validStatus: phoneCount.validStatus,
              recentAbuse: phoneCount.recentAbuse,
              validMobile: phoneCount.validMobile,
              blackListAlliance: phoneCount.blackListAlliance,
              clicker: phoneCount.clicker,
              converter: phoneCount.converter,
              hardBounce: phoneCount.hardBounce,
              suppressed: phoneCount.suppressed,
              platform: phoneCount.platform,
              message: phoneCount.message,
              fraudScore: phoneCount.fraudScore,
              lineType:
                phoneCount.lineType === 'unknown' ? null : phoneCount.lineType,
              prepaid: phoneCount.prepaid,
              risky: phoneCount.risky,
              city: phoneCount.city,
              listID: phoneCount.listID,
              birthDate: phoneCount.birthDate,
              gender: phoneCount.gender,
              senderID: phoneCount.senderID,
              sendAt: phoneCount.sendAt,
              validity: phoneCount.validity,
              subject: phoneCount.subject,
              vertical: phoneCount.vertical,
              vertical2: phoneCount.vertical2,
              vertical3: phoneCount.vertical3,
            })

            if (phoneCreated) {
              console.log('New Phone row')

              const DeletePhoneNew = await ModelTemporal.findOne({
                phone: phoneCount.phone,
              })
              if (DeletePhoneNew) {
                await DeletePhoneNew.remove()
                console.log('Phone New delete')
              } else {
                res.status(404)
                throw new Error('Phone not found')
              }
            } else {
              res.status(400)
              throw new Error('Invalid Phone data')
            }
          }
          return Promise.resolve()
        }, Promise.resolve())

        let countData = await ModelTemporal.countDocuments()
        if (!countData) {
          console.log('SUCCESS')
        
          resultTemp = []
          res.status(200).json({
            message: 'Import Successfully !!!!',
            news: newPhone.length,
            update: updatePhone.length,
            total: count,
          })
        }
      }
    }
  }else{
    res.status(200).json({
      message: `Import Successfully data es empty ${total}!!!!`,
    })
  }
  } catch (error) {
    next(error)
  }
})

// import data All version2

export const ImportDataAll_V2 = asyncHandler(async (req, res, next) => {
  try {
    let requestCount = 500 //parseInt(req.query.count) || 100000
    let count = await ModelTemporal.countDocuments()
    const skipCount = 500
    const size = 100000
    const total = Math.ceil(count / requestCount)
    let newPhone = []
    let updatePhone = []
    let resultTemp = []
   // let TemporalData = []

   console.log('total ', total)
   if(count){

    for (let i = 1; i <= total; i++) {
      console.log('next ', i, total)

      await ModelTemporal.find({})
        .limit(requestCount)
        .skip(skipCount * (i - 1))
        .then((result) => {
          resultTemp.push(...result)
        })

      console.log('resultTemp', resultTemp.length)
    }

    if (resultTemp.length !== 0) {
      // const chunk = (arr, size) =>
      //   Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      //     TemporalData.push(arr.slice(i * size, i * size + size))
      //   )
      // console.log('chunk', chunk(resultTemp, size))
      // console.log('NewArray', TemporalData.length)
      // for (let x = 0; x < TemporalData.length; x++) {
        
      await resultTemp.forEach(async (prev, phoneCount) => {
        await prev
        const phoneExists = await PhoneList.findOne({
          phone: resultTemp[phoneCount].phone,
        })
        console.log('phoneCount', resultTemp[phoneCount].phone)

        if (phoneExists) {
          console.log('Phone Exists')
          // Count total update phones
          updatePhone.push(phoneExists)

          phoneExists.firstName =
            phoneExists.firstName === undefined
              ? resultTemp[phoneCount].firstName
              : phoneExists.firstName === resultTemp[phoneCount].firstName
              ? phoneExists.firstName
              : resultTemp[phoneCount].firstName === undefined
              ? phoneExists.firstName
              : resultTemp[phoneCount].firstName
          //--------------------------------------------------------------------
          phoneExists.lastName =
            phoneExists.lastName === undefined
              ? resultTemp[phoneCount].lastName
              : phoneExists.lastName === resultTemp[phoneCount].lastName
              ? phoneExists.lastName
              : resultTemp[phoneCount].lastName === undefined
              ? phoneExists.lastName
              : resultTemp[phoneCount].lastName
          //--------------------------------------------------------------------
          phoneExists.name =
            phoneExists.name === undefined
              ? resultTemp[phoneCount].name
              : phoneExists.name === resultTemp[phoneCount].name
              ? phoneExists.name
              : resultTemp[phoneCount].name === undefined
              ? phoneExists.name
              : resultTemp[phoneCount].name
          //--------------------------------------------------------------------
          phoneExists.email =
            phoneExists.email === undefined
              ? resultTemp[phoneCount].email
              : phoneExists.email === resultTemp[phoneCount].email
              ? phoneExists.email
              : resultTemp[phoneCount].email === undefined
              ? phoneExists.email
              : resultTemp[phoneCount].email
          //--------------------------------------------------------------------
          phoneExists.state =
            phoneExists.state === undefined
              ? resultTemp[phoneCount].state
              : phoneExists.state === resultTemp[phoneCount].state
              ? phoneExists.state
              : resultTemp[phoneCount].state === undefined
              ? phoneExists.state
              : resultTemp[phoneCount].state
          //--------------------------------------------------------------------
          phoneExists.source =
            phoneExists.source === undefined
              ? resultTemp[phoneCount].source
              : phoneExists.source === resultTemp[phoneCount].source
              ? phoneExists.source
              : resultTemp[phoneCount].source === undefined
              ? phoneExists.source
              : resultTemp[phoneCount].source

          //--------------------------------------------------------------------
          phoneExists.ip =
            phoneExists.ip === undefined
              ? resultTemp[phoneCount].ip
              : phoneExists.ip === resultTemp[phoneCount].ip
              ? phoneExists.ip
              : resultTemp[phoneCount].ip === undefined
              ? phoneExists.ip
              : resultTemp[phoneCount].ip
          //--------------------------------------------------------------------
          phoneExists.site =
            phoneExists.site === undefined
              ? resultTemp[phoneCount].site
              : phoneExists.site === resultTemp[phoneCount].site
              ? phoneExists.site
              : resultTemp[phoneCount].site === undefined
              ? phoneExists.site
              : resultTemp[phoneCount].site
          //--------------------------------------------------------------------
          phoneExists.status =
            phoneExists.status === undefined
              ? resultTemp[phoneCount].status
              : phoneExists.status === resultTemp[phoneCount].status
              ? phoneExists.status
              : resultTemp[phoneCount].status === undefined
              ? phoneExists.status
              : resultTemp[phoneCount].status
          //--------------------------------------------------------------------
          phoneExists.list =
            phoneExists.list === undefined
              ? resultTemp[phoneCount].list
              : phoneExists.list === resultTemp[phoneCount].list
              ? phoneExists.list
              : resultTemp[phoneCount].list === undefined
              ? phoneExists.list
              : resultTemp[phoneCount].list
          //--------------------------------------------------------------------
          phoneExists.revenue =
            phoneExists.revenue === undefined
              ? resultTemp[phoneCount].revenue
              : phoneExists.revenue === resultTemp[phoneCount].revenue
              ? phoneExists.revenue
              : resultTemp[phoneCount].revenue === undefined
              ? phoneExists.revenue
              : resultTemp[phoneCount].revenue
          //--------------------------------------------------------------------
          phoneExists.monthlyIncome =
            phoneExists.monthlyIncome === undefined
              ? resultTemp[phoneCount].monthlyIncome
              : phoneExists.monthlyIncome === resultTemp[phoneCount].monthlyIncome
              ? phoneExists.monthlyIncome
              : resultTemp[phoneCount].monthlyIncome === undefined
              ? phoneExists.monthlyIncome
              : resultTemp[phoneCount].monthlyIncome
          //--------------------------------------------------------------------
          phoneExists.incomeSource =
            phoneExists.incomeSource === undefined
              ? resultTemp[phoneCount].incomeSource
              : phoneExists.incomeSource === resultTemp[phoneCount].incomeSource
              ? phoneExists.incomeSource
              : resultTemp[phoneCount].incomeSource === undefined
              ? phoneExists.incomeSource
              : resultTemp[phoneCount].incomeSource
          //--------------------------------------------------------------------
          phoneExists.carrier =
            phoneExists.carrier === undefined
              ? resultTemp[phoneCount].carrier
              : phoneExists.carrier === resultTemp[phoneCount].carrier
              ? phoneExists.carrier
              : resultTemp[phoneCount].carrier === undefined
              ? phoneExists.carrier
              : resultTemp[phoneCount].carrier
          //--------------------------------------------------------------------
          phoneExists.creditScore =
            phoneExists.creditScore === undefined
              ? resultTemp[phoneCount].creditScore
              : phoneExists.creditScore === resultTemp[phoneCount].creditScore
              ? phoneExists.creditScore
              : resultTemp[phoneCount].creditScore === undefined
              ? phoneExists.creditScore
              : resultTemp[phoneCount].creditScore
          //--------------------------------------------------------------------
          phoneExists.subId =
            phoneExists.subId === undefined
              ? resultTemp[phoneCount].subId
              : phoneExists.subId === resultTemp[phoneCount].subId
              ? phoneExists.subId
              : resultTemp[phoneCount].subId === undefined
              ? phoneExists.subId
              : resultTemp[phoneCount].subId
          //--------------------------------------------------------------------
          phoneExists.countryCode =
            phoneExists.countryCode === undefined
              ? resultTemp[phoneCount].countryCode
              : phoneExists.countryCode === resultTemp[phoneCount].countryCode
              ? phoneExists.countryCode
              : resultTemp[phoneCount].countryCode === undefined
              ? phoneExists.countryCode
              : resultTemp[phoneCount].countryCode
          //--------------------------------------------------------------------
          phoneExists.activePhone =
            phoneExists.activePhone === undefined
              ? resultTemp[phoneCount].activePhone
              : phoneExists.activePhone === resultTemp[phoneCount].activePhone
              ? phoneExists.activePhone
              : resultTemp[phoneCount].activePhone === undefined
              ? phoneExists.activePhone
              : resultTemp[phoneCount].activePhone
          //--------------------------------------------------------------------
          phoneExists.validStatus =
            phoneExists.validStatus === undefined
              ? resultTemp[phoneCount].validStatus
              : phoneExists.validStatus === resultTemp[phoneCount].validStatus
              ? phoneExists.validStatus
              : resultTemp[phoneCount].validStatus === undefined
              ? phoneExists.validStatus
              : resultTemp[phoneCount].validStatus
          //--------------------------------------------------------------------
          phoneExists.recentAbuse =
            phoneExists.recentAbuse === undefined
              ? resultTemp[phoneCount].recentAbuse
              : phoneExists.recentAbuse === resultTemp[phoneCount].recentAbuse
              ? phoneExists.recentAbuse
              : resultTemp[phoneCount].recentAbuse === undefined
              ? phoneExists.recentAbuse
              : resultTemp[phoneCount].recentAbuse
          //--------------------------------------------------------------------
          phoneExists.validMobile =
            phoneExists.validMobile === undefined
              ? resultTemp[phoneCount].validMobile
              : phoneExists.validMobile === resultTemp[phoneCount].validMobile
              ? phoneExists.validMobile
              : resultTemp[phoneCount].validMobile === undefined
              ? phoneExists.validMobile
              : resultTemp[phoneCount].validMobile
          //--------------------------------------------------------------------
          phoneExists.blackListAlliance =
            phoneExists.blackListAlliance === undefined
              ? resultTemp[phoneCount].blackListAlliance
              : phoneExists.blackListAlliance === resultTemp[phoneCount].blackListAlliance
              ? phoneExists.blackListAlliance
              : resultTemp[phoneCount].blackListAlliance === undefined
              ? phoneExists.blackListAlliance
              : resultTemp[phoneCount].blackListAlliance
          //--------------------------------------------------------------------
          phoneExists.clicker =
            phoneExists.clicker === undefined
              ? resultTemp[phoneCount].clicker
              : phoneExists.clicker === resultTemp[phoneCount].clicker
              ? phoneExists.clicker
              : resultTemp[phoneCount].clicker === undefined
              ? phoneExists.clicker
              : resultTemp[phoneCount].clicker
          //--------------------------------------------------------------------
          phoneExists.converter =
            phoneExists.converter === undefined
              ? resultTemp[phoneCount].converter
              : phoneExists.converter === resultTemp[phoneCount].converter
              ? phoneExists.converter
              : resultTemp[phoneCount].converter === undefined
              ? phoneExists.converter
              : resultTemp[phoneCount].converter
          //--------------------------------------------------------------------
          phoneExists.hardBounce =
            phoneExists.hardBounce === undefined
              ? resultTemp[phoneCount].hardBounce
              : phoneExists.hardBounce === resultTemp[phoneCount].hardBounce
              ? phoneExists.hardBounce
              : resultTemp[phoneCount].hardBounce === undefined
              ? phoneExists.hardBounce
              : resultTemp[phoneCount].hardBounce
          //--------------------------------------------------------------------
          phoneExists.suppressed =
            phoneExists.suppressed === undefined
              ? resultTemp[phoneCount].suppressed
              : phoneExists.suppressed === resultTemp[phoneCount].suppressed
              ? phoneExists.suppressed
              : resultTemp[phoneCount].suppressed === undefined
              ? phoneExists.suppressed
              : resultTemp[phoneCount].suppressed
          //--------------------------------------------------------------------
          phoneExists.platform =
            phoneExists.platform === undefined
              ? resultTemp[phoneCount].platform
              : phoneExists.platform === resultTemp[phoneCount].platform
              ? phoneExists.platform
              : resultTemp[phoneCount].platform === undefined
              ? phoneExists.platform
              : resultTemp[phoneCount].platform
          //--------------------------------------------------------------------
          phoneExists.message =
            phoneExists.message === undefined
              ? resultTemp[phoneCount].message
              : phoneExists.message === resultTemp[phoneCount].message
              ? phoneExists.message
              : resultTemp[phoneCount].message === undefined
              ? phoneExists.message
              : resultTemp[phoneCount].message
          //--------------------------------------------------------------------
          phoneExists.fraudScore =
            phoneExists.fraudScore === undefined
              ? resultTemp[phoneCount].fraudScore
              : phoneExists.fraudScore === resultTemp[phoneCount].fraudScore
              ? phoneExists.fraudScore
              : resultTemp[phoneCount].fraudScore === undefined
              ? phoneExists.fraudScore
              : resultTemp[phoneCount].fraudScore
          //--------------------------------------------------------------------
          phoneExists.lineType =
            phoneExists.lineType === undefined
              ? resultTemp[phoneCount].lineType
              : phoneExists.lineType === resultTemp[phoneCount].lineType
              ? phoneExists.lineType
              : resultTemp[phoneCount].lineType === undefined
              ? phoneExists.lineType
              : resultTemp[phoneCount].lineType
          //--------------------------------------------------------------------
          phoneExists.prepaid =
            phoneExists.prepaid === undefined
              ? resultTemp[phoneCount].prepaid
              : phoneExists.prepaid === resultTemp[phoneCount].prepaid
              ? phoneExists.prepaid
              : resultTemp[phoneCount].prepaid === undefined
              ? phoneExists.prepaid
              : resultTemp[phoneCount].prepaid
          //--------------------------------------------------------------------
          phoneExists.risky =
            phoneExists.risky === undefined
              ? resultTemp[phoneCount].risky
              : phoneExists.risky === resultTemp[phoneCount].risky
              ? phoneExists.risky
              : resultTemp[phoneCount].risky === undefined
              ? phoneExists.risky
              : resultTemp[phoneCount].risky
          //--------------------------------------------------------------------
          phoneExists.city =
            phoneExists.city === undefined
              ? resultTemp[phoneCount].city
              : phoneExists.city === resultTemp[phoneCount].city
              ? phoneExists.city
              : resultTemp[phoneCount].city === undefined
              ? phoneExists.city
              : resultTemp[phoneCount].city
          //--------------------------------------------------------------------
          phoneExists.listID =
            phoneExists.listID === undefined
              ? resultTemp[phoneCount].listID
              : phoneExists.listID === resultTemp[phoneCount].listID
              ? phoneExists.listID
              : resultTemp[phoneCount].listID === undefined
              ? phoneExists.listID
              : resultTemp[phoneCount].listID
          //--------------------------------------------------------------------
          phoneExists.birthDate =
            phoneExists.birthDate === undefined
              ? resultTemp[phoneCount].birthDate
              : phoneExists.birthDate === resultTemp[phoneCount].birthDate
              ? phoneExists.birthDate
              : resultTemp[phoneCount].birthDate === undefined
              ? phoneExists.birthDate
              : resultTemp[phoneCount].birthDate
          //--------------------------------------------------------------------
          phoneExists.gender =
            phoneExists.gender === undefined
              ? resultTemp[phoneCount].gender
              : phoneExists.gender === resultTemp[phoneCount].gender
              ? phoneExists.gender
              : resultTemp[phoneCount].gender === undefined
              ? phoneExists.gender
              : resultTemp[phoneCount].gender
          //--------------------------------------------------------------------
          phoneExists.senderID =
            phoneExists.senderID === undefined
              ? resultTemp[phoneCount].senderID
              : phoneExists.senderID === resultTemp[phoneCount].senderID
              ? phoneExists.senderID
              : resultTemp[phoneCount].senderID === undefined
              ? phoneExists.senderID
              : resultTemp[phoneCount].senderID
          //--------------------------------------------------------------------
          phoneExists.sendAt =
            phoneExists.sendAt === undefined
              ? resultTemp[phoneCount].sendAt
              : phoneExists.sendAt === resultTemp[phoneCount].sendAt
              ? phoneExists.sendAt
              : resultTemp[phoneCount].sendAt === undefined
              ? phoneExists.sendAt
              : resultTemp[phoneCount].sendAt
          //--------------------------------------------------------------------
          phoneExists.validity =
            phoneExists.validity === undefined
              ? resultTemp[phoneCount].validity
              : phoneExists.validity === resultTemp[phoneCount].validity
              ? phoneExists.validity
              : resultTemp[phoneCount].validity === undefined
              ? phoneExists.validity
              : resultTemp[phoneCount].validity
          //--------------------------------------------------------------------
          phoneExists.subject =
            phoneExists.subject === undefined
              ? resultTemp[phoneCount].subject
              : phoneExists.subject === resultTemp[phoneCount].subject
              ? phoneExists.subject
              : resultTemp[phoneCount].subject === undefined
              ? phoneExists.subject
              : resultTemp[phoneCount].subject
          //--------------------------------------------------------------------
          phoneExists.vertical =
            phoneExists.vertical === undefined
              ? resultTemp[phoneCount].vertical
              : phoneExists.vertical === resultTemp[phoneCount].vertical
              ? phoneExists.vertical
              : resultTemp[phoneCount].vertical === undefined
              ? phoneExists.vertical
              : resultTemp[phoneCount].vertical
          //--------------------------------------------------------------------
          phoneExists.vertical2 =
            phoneExists.vertical2 === undefined
              ? resultTemp[phoneCount].vertical2
              : phoneExists.vertical2 === resultTemp[phoneCount].vertical2
              ? phoneExists.vertical2
              : resultTemp[phoneCount].vertical2 === undefined
              ? phoneExists.vertical2
              : resultTemp[phoneCount].vertical2
          //--------------------------------------------------------------------
          phoneExists.vertical3 =
            phoneExists.vertical3 === undefined
              ? resultTemp[phoneCount].vertical3
              : phoneExists.vertical3 === resultTemp[phoneCount].vertical3
              ? phoneExists.vertical3
              : resultTemp[phoneCount].vertical3 === undefined
              ? phoneExists.vertical3
              : resultTemp[phoneCount].vertical3
          //--------------------------------------------------------------------

          await phoneExists.save()

          const DeletePhone = await ModelTemporal.findOne({
            phone: resultTemp[phoneCount].phone,
          })
          if (DeletePhone) {
            console.log('Phone Update delete')
            await DeletePhone.remove()
          } else {
            res.status(404)
            throw new Error('Phone not found')
          }
        } else {
          //count total New Phones
          newPhone.push(resultTemp[phoneCount])

          const phoneCreated = await PhoneList.create({
            firstName: resultTemp[phoneCount].firstName,
            lastName: resultTemp[phoneCount].lastName,
            email: resultTemp[phoneCount].email,
            name: resultTemp[phoneCount].name,
            phone: resultTemp[phoneCount].phone,
            state: resultTemp[phoneCount].state,
            carrier:
              resultTemp[phoneCount].carrier === 'unknown_carrier'
                ? null
                : resultTemp[phoneCount].carrier,

            source: resultTemp[phoneCount].source,
            ip: resultTemp[phoneCount].ip,
            site: resultTemp[phoneCount].site,
            status: resultTemp[phoneCount].status,
            list: resultTemp[phoneCount].list,
            revenue: resultTemp[phoneCount].revenue,
            monthlyIncome: resultTemp[phoneCount].monthlyIncome,
            incomeSource: resultTemp[phoneCount].incomeSource,
            creditScore: resultTemp[phoneCount].creditScore,
            zipCode: resultTemp[phoneCount].zipCode,
            subId: resultTemp[phoneCount].subId,
            countryCode: resultTemp[phoneCount].countryCode,
            activePhone: resultTemp[phoneCount].activePhone,
            validStatus: resultTemp[phoneCount].validStatus,
            recentAbuse: resultTemp[phoneCount].recentAbuse,
            validMobile: resultTemp[phoneCount].validMobile,
            blackListAlliance: resultTemp[phoneCount].blackListAlliance,
            clicker: resultTemp[phoneCount].clicker,
            converter: resultTemp[phoneCount].converter,
            hardBounce: resultTemp[phoneCount].hardBounce,
            suppressed: resultTemp[phoneCount].suppressed,
            platform: resultTemp[phoneCount].platform,
            message: resultTemp[phoneCount].message,
            fraudScore: resultTemp[phoneCount].fraudScore,
            lineType:
              resultTemp[phoneCount].lineType === 'unknown' ? null : resultTemp[phoneCount].lineType,
            prepaid: resultTemp[phoneCount].prepaid,
            risky: resultTemp[phoneCount].risky,
            city: resultTemp[phoneCount].city,
            listID: resultTemp[phoneCount].listID,
            birthDate: resultTemp[phoneCount].birthDate,
            gender: resultTemp[phoneCount].gender,
            senderID: resultTemp[phoneCount].senderID,
            sendAt: resultTemp[phoneCount].sendAt,
            validity: resultTemp[phoneCount].validity,
            subject: resultTemp[phoneCount].subject,
            vertical: resultTemp[phoneCount].vertical,
            vertical2: resultTemp[phoneCount].vertical2,
            vertical3: resultTemp[phoneCount].vertical3,
          })

          if (phoneCreated) {
            console.log('New Phone row')

            const DeletePhoneNew = await ModelTemporal.findOne({
              phone: resultTemp[phoneCount].phone,
            })
            if (DeletePhoneNew) {
              await DeletePhoneNew.remove()
              console.log('Phone New delete')
            } else {
              res.status(404)
              throw new Error('Phone not found')
            }
          } else {
            res.status(400)
            throw new Error('Invalid Phone data')
          }
        }
        //return Promise.resolve()
      })//, Promise.resolve())

      let countData = await ModelTemporal.countDocuments()
      if (!countData) {
        console.log('SUCCESS')
        resultTemp = []
        res.status(200).json({
          message: 'Import Successfully !!!!',
          news: newPhone.length,
          update: updatePhone.length,
          //total: count,
        })
      }
      // }
    }
  }else{
    res.status(200).json({
      message: `Import Successfully data es empty ${total}!!!!`,
    })
  }
  } catch (error) {
    next(error)
  }
})