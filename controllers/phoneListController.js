// phone list Model
import PhoneList from '../models/phoneslist.js'

// @routes GET /phoneslist
// @des GET All Phone List
export const getPhoneList = async (req, res) => {
  try {
    const phones = await PhoneList.find()
    if (!phones) throw Error('Not items')
    res.status(200).json(phones)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

// @routes POST /phoneslist
// @des Create an Phones List
export const registerPhoneList = async (req, res) => {
  const newPhone = new PhoneList(req.body)
  try {
    const phones = await newPhone.save()
    if (!phones) throw Error('Something went wrong saving the phone')

    res.status(200).json(phones)
  } catch (err) {
    res.status(400).json({ msg: err })
  }
}

// @routes PUT /phoneslist:phone
// @des Update an Phones List
export const updatePhoneList = async (req, res) => {
  try {
    const updatedPhone = await PhoneList.findOne({ phone: req.params.phone })
    const { name, carrier, wireless } = req.body

    if (updatedPhone) {
      updatedPhone.name = name || updatedPhone.name
      updatedPhone.carrier = carrier || updatedPhone.carrier
      updatedPhone.wireless = wireless || updatedPhone.wireless

      const updatedPhonesList = await updatedPhone.save()

      res.status(200).json({
        _id: updatedPhonesList._id,
        name: updatedPhonesList.name,
        carrier: updatedPhonesList.carrier,
        wireless: updatedPhonesList.wireless,
      })
    } else {
      res.status(404)
      throw new Error('Phone List not found')
    }
  } catch (error) {
    res.status(400).json({ msg: error })
  }
}
