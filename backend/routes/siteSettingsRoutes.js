import express from 'express'
import {
  getSettings,
  updateSettings,
  getEmailJsService,
} from '../controllers/siteSettingsControllers.js'

import { protect, admin } from '../middlewere/authMiddlewere.js'

const router = express.Router()

router.get('/', getSettings)
router.get('/emailjs-key', getEmailJsService)
router.put('/:id', protect, admin, updateSettings)

export default router
