import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import moment from 'moment'
import fastcsv from 'fast-csv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

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
      (createdAt_start && createdAt_end)
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
          updatedAt: {
            $gte: new Date(createdAt_start),
            $lt: new Date(createdAt_end),
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
            'email',
            'clicker',
            'revenue',
            'converter',
            'status',
            'risky',
            'lineType',
            'createdAt',
            'updatedAt',
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

export const ExportFile = asyncHandler(async (req, res, next) => {
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
    let arrayFilters = []

    let arrayExport = []

    let regex = req.query.q
    let search = { $regex: regex, $options: 'i' }

    const dateTime = moment().format('YYYY-MM-DD')

    const app = express()

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const filePath = path.join(
      __dirname,
      '../../exports',
      'csv-' + dateTime + '.csv'
    )
    const ws = fs.createWriteStream(filePath)

    //const ws = fs.createWriteStream('data' + dateTime + '.csv')

    if (
      clicker ||
      hardBounce ||
      phone ||
      revenue ||
      converter ||
      suppressed ||
      firstNameFilter ||
      carrierFilter ||
      (createdAt_start && createdAt_end)
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
          updatedAt: {
            $gte: new Date(createdAt_start),
            $lt: new Date(createdAt_end),
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
            'clicker',
            'revenue',
            'converter',
            'updatedAt',
          ],
        })
        .on('finish', function () {
          res.download(filePath)
          console.log('Export complete')
        })
        .pipe(ws)

      fs.unlinkSync(filePath)
    }
    //------------------------------------
    else if (regex) {
      const data = await PhoneList.find({ carrier: search })
      fastcsv
        .write(data, { headers: true })
        .on('finish', function () {
          res.send(
            "<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>"
          )
          console.log('Export complete')
        })
        .pipe(ws)

      res.status(200).json({ data })
    } else {
      console.log('no filters')
      const data = await PhoneList.find({})

      fastcsv
        .write(data, { headers: true })
        .on('finish', function () {
          res.send(
            "<a href='/public/data.csv' download='data.csv' id='download-link'></a><script>document.getElementById('download-link').click();</script>"
          )
          console.log('Export complete')
        })
        .pipe(ws)

      res.status(200).json({ data })
    }
  } catch (error) {
    next(error)
  }
})
