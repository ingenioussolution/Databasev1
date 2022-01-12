import express from 'express'

import {CleanOldData} from '../controllers/cleanDataController.js'

const router = express.Router()

router.delete('/', CleanOldData)

export default router