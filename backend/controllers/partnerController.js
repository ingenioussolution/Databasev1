import Carrier from '../models/carrierModel.js'
import Partner from '../models/partnersModel.js'

// @route GET /partners

export const getPartner = async(req,res,next) =>{
  try {
    const partners = await Partner.find({}).populate('carrier')
   
    if (!partners) throw Error('Not items')
    res.status(200).json(partners)
  } catch (error) {next(error)}
}

// @route POST /partners

export const registerPartner = async (req, res, next) => {  
  try {
    const { partnerName, carrier } = req.body
    const partnerOne = await Partner.findOne({
      partnerName: { $regex: `${partnerName}`, $options: 'i' },
    })
    if (partnerOne) throw Error('Partner already exists')

    const newPartner = { partnerName }

    const carrierItem = carrier ? await Carrier.findById(carrier) : undefined
    if (carrier && !carrierItem) {
      res.status(400)
      throw new Error('carrier media not found')
    } else if (carrierItem !== ' ') {
      newPartner.carrier = carrierItem
    }
    const partners = await Partner.create(newPartner)
    if (partners) {
      res.status(201).json({ partnerName: partnerName })
    } else {
      res.status(400)
      throw new Error('Invalid partner')
    }
  } catch (error) {next(error)}
}
