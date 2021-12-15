import express from 'express'
import {
    countClicker,
    countConverter,
    countCCC,
    countBadStates,
    countHardBounce,
    countSupressed,
    countVerizon,
    countAtt,
    countSprint,
    countTMobile,
    countUsCellular,
} from '../controllers/homeFiltersController.js'

const router = express.Router() 

router.get('/clicker', countClicker)
router.get('/converter', countConverter)
router.get('/ccc', countCCC)
router.get('/bad-states-code', countBadStates)
router.get('/hard-bounce', countHardBounce)
router.get('/suppressed', countSupressed)
router.get('/verizon', countVerizon)
router.get('/att', countAtt)
router.get('/sprint', countSprint)
router.get('/t-mobile', countTMobile)
router.get('/us-cellular', countUsCellular)


export default router