import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import ModelTemporal from '../models/TemporalData.js'

// import data All

export const ImportDataAll = asyncHandler(async (req, res, next) => {
  try {
    let count = await ModelTemporal.countDocuments()

    let newPhone = []
    let updatePhone = []

    const cursor = ModelTemporal.find({}).cursor()
    for (
      let phoneCount = await cursor.next();
      phoneCount != null;
      phoneCount = await cursor.next()
    ) {
      const phoneExists = await PhoneList.findOne({
        phone: phoneCount.phone,
      })

      if (phoneExists) {
        console.log('Phone Exists')
        // Count total update phones
        updatePhone.push(phoneExists)

        phoneExists.burstOptOut =
          phoneExists.burstOptOut === undefined
            ? phoneCount.burstOptOut
            : phoneExists.burstOptOut === phoneCount.burstOptOut
            ? phoneExists.burstOptOut
            : phoneCount.burstOptOut === undefined
            ? phoneExists.burstOptOut
            : phoneCount.burstOptOut
        //--------------------------------------------------------------------
        phoneExists.repliers =
          phoneExists.repliers === undefined
            ? phoneCount.repliers
            : phoneExists.repliers === phoneCount.repliers
            ? phoneExists.repliers
            : phoneCount.repliers === undefined
            ? phoneExists.repliers
            : phoneCount.repliers
        //--------------------------------------------------------------------
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
          vertical2: phoneCount.repliers,
          vertical3: phoneCount.burstOptOut,
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
      //   return Promise.resolve()
      // }, Promise.resolve())

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
      // }
      // }
    }
    // else {
    //   res.status(200).json({
    //     message: `Import Successfully data es empty ${total}!!!!`,
    //   })
    // }
  } catch (error) {
    next(error)
  }
})

// Delete wrong numbers

export const DeleteWrongPhone = asyncHandler(async (req, res, next) => {
  try {
    let requestCount = 10000
    let count = await ModelTemporal.countDocuments()
    // const skipCount = 100000
    // const total = Math.ceil(count / requestCount)
    let deleteArray = []
    //  for (let i = 1; i <= total; i++) {
    //    console.log('i:', i, total)

    const TemporalData = await ModelTemporal.find({}).limit(requestCount)
    console.log('TemporalData', TemporalData.length)
    if (TemporalData.length) {
      console.log('exist')
      await TemporalData.reduce(async (prev, phoneCount) => {
        await prev
        const phoneExists = await PhoneList.findOne({
          phone: phoneCount.phone,
        })

        if (phoneExists) {
          deleteArray.push(phoneExists)
          console.log('Phone Exists', phoneCount.phone)

          const DeletePhone = await PhoneList.findOne({
            phone: phoneCount.phone,
          })

          const DeletePhoneTemp = await ModelTemporal.findOne({
            phone: phoneCount.phone,
          })
          if (DeletePhone) {
            console.log('Phone Exist delete', DeletePhone.phone)

            console.log('Phone Temporal delete', DeletePhoneTemp.phone)
            await DeletePhone.remove()
            await DeletePhoneTemp.remove()
          } else {
            res.status(404)
            throw new Error('Phone not found')
          }
        }
        if (requestCount === deleteArray.length) {
          res.status(200).json({
            message: `Delete Successfully total ${TemporalData.length}!!!!`,
          })
        }
        return Promise.resolve()
      }, Promise.resolve())
    }
    //}
  } catch (error) {
    next(error)
  }
})
