import express from 'express'
import {getPartner,registerPartner} from '../controllers/partnerController.js'

const router = express.Router()

router.get('/', getPartner)
router.post('/', registerPartner)


export default router