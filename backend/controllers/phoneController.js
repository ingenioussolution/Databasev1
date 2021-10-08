// phone list Model
import Phone from '../models/phone.js'

// @routes GET /phone
// @des GET All Phone
export const getPhone = async (req, res) =>{
    try {
        const phone = await Phone.find()
        if (!phone) throw Error('Not items')
        res.status(200).json(phone)
      } catch (err) {
        res.status(400).json({ msg: err })
      }

}

// @routes POST /phone
// @des Register an Phone
export const registerPhone = async (req, res)=>{
    const newPhone = new Phone(req.body)
    try {
      const phone = await newPhone.save()
      if (!phone) throw Error('Something went wrong saving the phone')
  
      res.status(200).json(phone)
    } catch (err) {
      res.status(400).json({ msg: err })
    }
}

