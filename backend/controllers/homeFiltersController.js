import PhoneList from '../models/phoneslist.js'
import BadAreaCode from '../models/badAreaCode.js'
import asyncHandler from 'express-async-handler'

//@routes GET total true Clicker
//@des GET/ filters/clicker

export const countClicker = asyncHandler(async (req, res) => {
  try {
    const countClicker = await PhoneList.find({ clicker: true }).lean().count()
    //const countClicker = await PhoneList.countDocuments({ clicker: true })
    if (!countClicker) throw Error('Not clickers')
    res.status(200).json(countClicker)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total true Converter
//@des GET/ filters/converter
export const countConverter = asyncHandler(async (req, res) => {
  try {
    const countConverter = await PhoneList.find({ converter: true }).lean().count()
    //    const countConverter = await PhoneList.countDocuments({ converter: true })

    if (!countConverter) throw Error('Not converter')
    res.status(200).json(countConverter)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET combined  Converter  Converter
//@des GET/ filters/ccc
export const countCCC = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    const countCCC = await PhoneList.find({
      $and: [
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        { $or: [{ clicker: true }, { converter: true }] },{ phone: {
            $nin: arrayBadArea,
          },}
      ],
    }).lean().count()
    if (!countCCC) throw Error('Not converter clicker combined')
    res.status(200).json(countCCC)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET bad states codes
//@des GET/ filters/bad-states-code
export const countBadStates = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    const countBadArea = await PhoneList.find({
      phone: {
        $in: arrayBadArea,
      },
    }).lean().count()
    if (!countBadArea) throw Error('Not Bad Area Code')
    res.status(200).json(countBadArea)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total true Hard Bounces
//@des GET/ filters/hard-bounce

export const countHardBounce = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countHardBounce = await PhoneList.find({
      $and: [
        { hardBounce: true },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    }).lean().count()
    if (!countHardBounce) throw Error('Not Hard Bounces')
    res.status(200).json(countHardBounce)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total true Supressed
//@des GET/ filters/suppressed

export const countSupressed = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countSupressed = await PhoneList.find({
      $and: [
        { suppressed: true },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    }).lean().count()
    if (!countSupressed) throw Error('Not Suppressed')
    res.status(200).json(countSupressed)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total Verizon
//@des GET/ filters/verizon

export const countVerizon = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countVerizon = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'Verizon', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    }).lean().count()
    if (!countVerizon) throw Error('Not Verizon')
    res.status(200).json(countVerizon)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total AT&T
//@des GET/ filters/att

export const countAtt = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countHardBounce = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'AT&T', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    }).lean().count()
    if (!countHardBounce) throw Error('Not AT&T')
    res.status(200).json(countHardBounce)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total Sprint
//@des GET/ filters/sprint

export const countSprint = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countHardBounce = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'Sprint', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    }).lean().count()
    if (!countHardBounce) throw Error('Not Sprint')
    res.status(200).json(countHardBounce)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total T-Mobile
//@des GET/ filters/t-mobile

export const countTMobile = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 }).lean()
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countHardBounce = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'T-Mobile', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    }).lean().count()
    if (!countHardBounce) throw Error('Not T-Mobile')
    res.status(200).json(countHardBounce)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

//@routes GET total Us Cellular
//@des GET/ filters/us-cellular

export const countUsCellular = asyncHandler(async (req, res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })
    const countHardBounce = await PhoneList.countDocuments({
      $and: [
        { carrier: { $regex: 'Us Cellular', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
      ],
    })
    if (!countHardBounce) throw Error('Not Us Cellular')
    res.status(200).json(countHardBounce)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
})

// Master CCC Verizon 

export const master_CCC_Verizon = asyncHandler(async(req,res) =>{
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    const masterCCCVerizon = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'Verizon', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
        { $or: [{ converter: true }, { clicker: true }]}
      ],
    })

    if (!masterCCCVerizon) throw Error('Not exist Master CCC Verizon')
    res.status(200).json(masterCCCVerizon)
  } catch (error) {
    res.status(400).json({ msg: err })
  }
})


// Master CCC At&t 

export const master_CCC_Att = asyncHandler(async(req,res) =>{
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    const masterCCCAtt = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'At&t', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
        { $or: [{ converter: true }, { clicker: true }]}
      ],
    })

    console.log("masterCCCAtt",masterCCCAtt.length);

    if (!masterCCCAtt) throw Error('Not exist Master CCC At&t')
    res.status(200).json(masterCCCAtt)
  } catch (error) {
    res.status(400).json({ msg: err })
  }
})

// Master CCC Sprint

export const master_CCC_Sprint = asyncHandler(async(res) =>{
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    const masterCCCSprint = await PhoneList.find({
      $and: [
        { carrier: { $regex: 'Sprint', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
        { $or: [{ converter: true }, { clicker: true }]}
      ],
    })

    if (!masterCCCSprint) throw Error('Not exist Master CCC Sprint')
    res.status(200).json(masterCCCSprint)
  } catch (error) {
    res.status(400).json({ msg: err })
  }
})

// Master CCC T-Mobile

export const master_CCC_TMobile = asyncHandler(async(res) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({}, { areaCode: 1, _id: 0 })
    areaBadCode.map((obj) => {
      arrayBadArea.push(new RegExp('^' + obj.areaCode))
    })

    const masterTMobile = await PhoneList.find({
      $and: [
        { carrier: { $regex: 't-mobile', $options: 'i' } },
        { hardBounce: { $ne: true } },
        { suppressed: { $ne: true } },
        {
          phone: {
            $nin: arrayBadArea,
          },
        },
        { $or: [{ converter: true }, { clicker: true }]}  
      ],
    })

    if (!masterTMobile) throw Error('Not exist Master CCC T-Mobile')
    res.status(200).json(masterTMobile)
  } catch (error) {
    res.status(400).json({ msg: err })
  }
})




