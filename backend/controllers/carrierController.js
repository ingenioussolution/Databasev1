// carrier Model
import Carrier from '../models/carrier.js'

// @routes GET /carrier
// @des GET All PhoneCarrier
export const getPhoneCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.find({})
    if (!carrier) throw Error('Not items')
    res.status(200).json(carrier)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

// @routes POST /carrier
// @des Register an PhoneCarrier
export const registerPhoneCarrier = async (req, res) => {
  const newPhoneCarrier = new Carrier(req.body)
  try {
    const carrier = await newPhoneCarrier.save()
    if (!carrier) throw Error('Something went wrong saving the phoneCarrier')

    res.status(200).json(carrier)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}
