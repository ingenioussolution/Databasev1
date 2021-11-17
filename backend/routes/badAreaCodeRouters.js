import express from 'express'
import {
  getAreaCode,
  registerBadAreaCode,
  deleteBadAreaCode,
  UpdateBadAreaCode,
} from '../controllers/badAreaCodeController.js'
import { protect } from '../middlewere/authMiddlewere.js'

const router = express.Router()

router.get('/', protect, getAreaCode)
router.post('/', protect, registerBadAreaCode)
router.put('/:id', protect, UpdateBadAreaCode)
router.delete('/:id', protect, deleteBadAreaCode)

export default router