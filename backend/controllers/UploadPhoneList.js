import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import BadAreaCode from '../models/badAreaCode.js'
import fastcsv from 'fast-csv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { uploadExportFile } from '../controllers/ExportController.js'

// @routes GET /phoneslist/export-csv
// @des GET Export csv
// @access  Private/User
let arrayHeader = [
  'phone',
  'carrier',
  'firstName',
  'lastName',
  'email',
  'lineType',
  'createdAt',
  'source',
  'name',
  'zipCode',
  'state',
  'monthlyIncome',
  'incomeSource',
  'creditScore',
  'fraudScore',
  'prepaid',
  'repliers',
  'city',
  'birthDate',
  'gender',
]

export const ExportCSV = asyncHandler(async (req, res, next) => {
  try {
    // BODY
    const user = req.query.user
    console.log('user', user)
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
    let sourceFilter = req.query.source
    let source = { $regex: '^' + `${sourceFilter}` + '.*', $options: 'i' }
    const repliers = req.query.repliers

    let arrayFilters = []
    let arrayExport = []

    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
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
        console.log('hard bounce FALSE', hardBounce)
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

      console.log('Array Export: ', arrayFilters)
      const cursor = await PhoneList.find(
        {
          $and: arrayFilters,
        },
        {
          phone: 1,
          carrier: 1,
          firstName: 1,
          lastName: 1,
          name: 1,
          source: 1,
          email: 1,
          lineType: 1,
          fraudScore: 1,
          monthlyIncome: 1,
          state: 1,
          city: 1,
          gender: 1,
          createdAt: 1,
          birthDate: 1,
          repliers: 1,
          _id: 0,
        }
      )
        .lean()
        .cursor()

      for (let ex = await cursor.next(); ex != null; ex = await cursor.next()) {
        await arrayExport.push(ex)
        console.log('arrayExport: ', ex.phone)
      }

      console.log('arrayExport: ', arrayExport.length)

      await fastcsv
        .write(arrayExport, {
          headers: arrayHeader,
        })
        .pipe(ws)
        .on('finish', function () {
          uploadExportFile(filePath, user)
          console.log('Write to CSV successfully!')
          res.status(200).json('Write to CSV successfully!')
        })
    }
  } catch (error) {
    next(error)
  }
})

export const Export_Master_CCC_CSV = asyncHandler(async (req, res, next) => {
  try {
    // FILTERS QUERY
    const user = req.query.user
    console.log('user', user)
    //-----
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
    let sourceFilter = req.query.source
    let source = { $regex: '^' + `${sourceFilter}` + '.*', $options: 'i' }

    let arrayFilters = []
    let arrayExport = []

    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

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
      createdAt_end ||
      sourceFilter
    ) {
      if (hardBounce === 'false') {
        console.log('hard bounce FALSE', hardBounce)
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

      if (sourceFilter) {
        arrayFilters.push({ source: source })
      }

      console.log('Export Master CCC: ', arrayFilters)

      const cursor = await PhoneList.find({
        $and: arrayFilters,
      })
        .lean()
        .cursor()

      for (let ex = await cursor.next(); ex != null; ex = await cursor.next()) {
        await arrayExport.push(ex)
      }
      console.log('cursor: ', arrayExport.length)
      await fastcsv
        .write(arrayExport, {
          headers: arrayHeader,
        })
        .pipe(ws)
        .on('finish', function () {
          uploadExportFile(filePath, user)
          console.log('Write to CSV successfully!')
          res.status(200).json('Write to CSV successfully!')
        })

      //   let requestCount = 100000
      //   let count = await PhoneList.countDocuments({ $and: arrayFilters })

      //   const skipSize = 100000

      //   const total = Math.ceil(count / requestCount)
      //   console.log('total: ', total)
      //   console.log('count: ', count)

      //   for (let i = 1; i <= total; i++) {
      //     console.log('i:', i)

      //     if (arrayFilters) {
      //       const data = await PhoneList.find({
      //         $and: arrayFilters,
      //       })
      //         .limit(requestCount)
      //         .skip(skipSize * (i - 1))

      //       await arrayExport.push(...data)

      //       console.log('arrayExport All: ', arrayExport.length)
      //     }
      //   }
      //   console.log('Create CSV...', arrayExport.length)

      //   await fastcsv
      //     .write(arrayExport, {
      //       ignoreEmpty: true,
      //       headers: arrayHeader,
      //     })
      //     .on('finish', function () {
      //       uploadExportFile(filePath, user)
      //       console.log('Write to CSV successfully!')
      //       res.download(filePath)
      //     })
      //     .pipe(ws)
      // }
      // //------------------------------------
      // else {
      //   console.log('no filters')
      //   const data = await PhoneList.find({})

      //   fastcsv
      //     .write(data, { headers: true })
      //     .pipe(ws)
      //     .on('finish', function () {
      //       uploadExportFile(filePath, user)
      //       res.download(filePath)
      //       console.log('Write to CSV successfully!')
      //     })
      // }
    }
  } catch (error) {
    next(error)
  }
})
