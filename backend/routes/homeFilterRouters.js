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
    master_CCC_Verizon,
    master_CCC_Att,
    master_CCC_Sprint,
    master_CCC_TMobile,
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
router.get('/master-verizon', master_CCC_Verizon)
router.get('/master-att', master_CCC_Att)
router.get('/master-sprint', master_CCC_Sprint)
router.get('/master-t-mobile', master_CCC_TMobile)


export default router