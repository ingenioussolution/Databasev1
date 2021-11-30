import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
//import moment from 'moment'
import fastcsv from 'fast-csv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import TemporalData from '../models/TemporalData.js'


// @routes GET /phoneslist/export-csv
// @des GET Export csv
// @access  Private/User

export const ExportCSV = asyncHandler(async (req, res, next) => {
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
    const createdAt_start = req.query.start
    const createdAt_end = req.query.end
    const areaCode = req.query.areaCode

    console.log('start', createdAt_start)

    let arrayFilters = []
    let arrayExport = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    //const dateTime = moment().format('YYYY-MM-DD')
    //const app = express()
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const filePath = path.join(__dirname, '../../exports', 'csv-data.csv')
    // create route for csv file
    const ws = fs.createWriteStream(filePath)

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
      createdAt_end
    ) {
      if (clicker) {
        arrayFilters.push({ clicker: clicker })
      }
      if (hardBounce) {
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
        arrayFilters.push({ suppressed: suppressed })
      }
      if (carrierFilter) {
        arrayFilters.push({ carrier: carrier })
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
            $nin: [
              /^1808/,
              /^1203/,
              /^1475/,
              /^1860/,
              /^1959/,
              /^1276/,
              /^1434/,
              /^1540/,
              /^1571/,
              /^1703/,
              /^1757/,
              /^1804/,
              /^1215/,
              /^1223/,
              /^1267/,
              /^1272/,
              /^1412/,
              /^1484/,
              /^16570/,
              /^1610/,
              /^1717/,
              /^1724/,
              /^1814/,
              /^1878/,
              /^1802/,
              /^1202/,
              /^1304/,
              /^1681/,
              /^1801/,
              /^1385/,
              /^1435/,
              /^1204/,
              /^1226/,
              /^1236/,
              /^1249/,
              /^1250/,
              /^1289/,
              /^1306/,
              /^1343/,
              /^1365/,
              /^1367/,
              /^1403/,
              /^1416/,
              /^1418/,
              /^1431/,
              /^1437/,
              /^1438/,
              /^1450/,
              /^1506/,
              /^1514/,
              /^1519/,
              /^1548/,
              /^1579/,
              /^1581/,
              /^1587/,
              /^1604/,
              /^1613/,
              /^1639/,
              /^1647/,
              /^1705/,
              /^1709/,
              /^1778/,
              /^1780/,
              /^1782/,
              /^1807/,
              /^1819/,
              /^1825/,
              /^1867/,
              /^1873/,
              /^1902/,
              /^1905/,
              /^1684/,
              /^1671/,
              /^1670/,
              /^1787/,
              /^1340/,
              /^1931/,
            ],
          },
        })
      }
      console.log('arrayFilters', arrayFilters)

      let requestCount = 10000
      let count = await PhoneList.countDocuments({ $and: arrayFilters })

      const skipSize = 10000

      const total = Math.ceil(count / requestCount)
      console.log('total: ', total)
      console.log('count: ', count)
      console.log('requestCount Origin value: ', requestCount)

      for (let i = 1; i <= total; i++) {
        console.log('i:', i)

        if (arrayFilters) {
          const data = await PhoneList.find({
            $and: arrayFilters,
          })
            .limit(requestCount)
            .skip(skipSize * (i - 1))

          await arrayExport.push(...data)

          console.log('arrayExport All: ', arrayExport.length)
        }
      }
      console.log('Create CSV...', arrayExport.length)

      await fastcsv
        .write(arrayExport, {
          headers: [
            'phone',
            'carrier',
            'firstName',
            'lastName',
            'email',
            'clicker',
            'revenue',
            'converter',
            'status',
            'risky',
            'lineType',
            'createdAt',
            'updatedAt',
            'list',
            'source',
            'name',
            'ip',
            'site',
            'status',
            'zipCode',
            'state',
            'monthlyIncome',
            'incomeSource',
            'creditScore',
            'subId',
            'vertical',
            'countryCode',
            'platform',
            'message',
            'recentAbuse',
            'fraudScore',
            'validMobile',
            'blackListAlliance',
            'prepaid',
            'city',
            'listID',
            'birthDate',
            'gender',
            'senderID',
            'sendAt',
            'validity',
            'subject',
            'vertical2',
            'vertical3',
          ],
        })
        .pipe(ws)
        .on('finish', function () {
          res.download(filePath)
          //.on('finish', function (err) {
          // if (err) {
          //   return res.json(err).status(500)
          // } else {
          //   setTimeout(function () {
          //     fs.unlink(filePath, function (err) {
          //       // delete this file after 30 seconds
          //       if (err) {
          //         console.error(err)
          //       }
          //       console.log('File has been Deleted')
          //     })
          //   }, 10000)
          // }
        })
      console.log('Write to CSV successfully!')
    }
    //------------------------------------
    else if (regex) {
      const data = await PhoneList.find({ carrier: search })
      fastcsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', function (err) {
          res.download(filePath)
          console.log('Export complete')
        })
    } else {
      console.log('no filters')
      const data = await PhoneList.find({})

      fastcsv
        .write(data, { headers: true })
        .pipe(ws)
        .on('finish', function (err) {
          res.download(filePath)
          console.log('Export complete')
        })
    }
  } catch (error) {
    next(error)
  }
})


