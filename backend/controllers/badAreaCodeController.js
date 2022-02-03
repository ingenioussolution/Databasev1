import asyncHandler from 'express-async-handler'
import BadAreaCode from '../models/badAreaCode.js'


// @desc     All Bad Area Code
// @route    get /bad-area-code
// @access   Public

export const getAreaCode = asyncHandler(async (req, res, next) => {
  try {
    const badAreaCode = await BadAreaCode.find({})

    if (badAreaCode) {
      res.json(badAreaCode)
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    next(error)
  }
})

// @desc     All Bad Area Code
// @route    get /list-area-code
// @access   Public

export const listAreaCode = asyncHandler(async (req, res, next) => {
  try {
    let arrayBadArea = []
    const areaBadCode = await BadAreaCode.find({},{areaCode:1, _id:0})

    areaBadCode.map(obj => {
      arrayBadArea.push('/^'+obj.areaCode+'/')
    })

    console.log(arrayBadArea);

    if (areaBadCode) {
      res.json(arrayBadArea)
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    next(error)
  }
})


// @desc     Add new Bad Area Code
// @route    POST /bad-area-code
// @access   Private/user
export const registerBadAreaCode = async (req, res, next) => {

  const { nameState, state, areaCode } = req.body
  const badArea = await BadAreaCode.findOne({ areaCode: areaCode })

  if (badArea) {
    res.status(400)
    throw new Error('Bad Area Code already exists')
  }

  const newBadArea = await BadAreaCode.create({
    nameState,
    state,
    areaCode,
  })

  if (newBadArea) {
    res.status(201).json(newBadArea)
  } else {
    res.status(400)
    throw new Error('Invalid Bad Area data')
  }
}

// @desc     Update Bad Area Code
// @route    PUT /bad-area-code:id
// @access   Private/user
export const UpdateBadAreaCode = asyncHandler(async (req, res, next) => {
  try {
    const badArea = await BadAreaCode.findById(req.body._id)
    if (badArea) {
      badArea.state = req.body.state || badArea.state
      badArea.areaCode = req.body.areaCode || user.areaCode

      const updatedBadAreaCode = await badArea.save()

      res.json({
        _id: updatedBadAreaCode._id,
        state: updatedBadAreaCode.state,
        areaCode: updatedBadAreaCode.areaCode,
      })
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})
 
// @desc     Delete Bad Area Code
// @route    DELETE /api/bad-area-code
// @access   Private/user
export const deleteBadAreaCode = asyncHandler(async (req, res, next) => {
  try {
    const badArea = await BadAreaCode.findById(req.params.id)
    if (badArea) {
      await badArea.remove()
      res.json({ message: 'Bad Area Code removed' })
    } else {
      res.status(404)
      throw new Error('Bad Area Code not found')
    }
  } catch (error) {
    next(error)
  }
})
