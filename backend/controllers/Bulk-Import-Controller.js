import PhoneList from '../models/phoneslist.js'
import asyncHandler from 'express-async-handler'
import BadAreaCode from '../models/badAreaCode.js'

export const getShowPhones = asyncHandler(async (req, res, next) => {
    try {
      // FILTERS QUERY
  
      const hardBounce = req.query.hardBounce
      const clicker = req.query.clicker
      const phone = req.query.phone
      const revenue = req.query.revenue
      const converter = req.query.converter
      const suppressed = req.query.suppressed
      let sourceFilter = req.query.source
      let source = { $regex: `${sourceFilter}`, $options: 'i' }
      let carrierFilter = req.query.carrier
      let carrier = { $regex: `${carrierFilter}`, $options: 'i' }
      const firstNameFilter = req.query.firstName
      let firstName = { $regex: `${firstNameFilter}`, $options: 'i' }
  
      const createdAt_start = req.query.start
      const createdAt_end = req.query.end
      const areaCode = req.query.areaCode
      let arrayFilters = []
  
      let regex = req.query.q
      let search = { $regex: regex, $options: 'i' }

      // new version
      const limit = 10
      //const page = parseInt(req.query.pageNumber) || 1
      const page = parseInt(req.query.page) || 1


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
          const data = await PhoneList.paginate({$and: arrayFilters}, { page, limit})
          console.timeEnd()
          if (!data) throw Error('Not items')

          res.status(200).json({
            data: data.docs,
            page : data.page,
            totalPages: data.totalPages,
          })
        }
      }
      //------------------------------------
       else {
        console.log('no filters')
  
        const data = await PhoneList.paginate({}, { page, limit})
        res.status(200).json({
          data: data.docs,
          search,
          hardBounce,
          page : data.page,
          totalPages: data.totalPages,
        })
      }
    } catch (error) {
      next(error)
    }
  })