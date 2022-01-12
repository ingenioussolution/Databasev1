import express from 'express'
import {
    registerExport,
    getExport
} from '../controllers/ExportController.js'
const router = express.Router()

router.get('/', getExport)
router.post('/', registerExport)


export default router