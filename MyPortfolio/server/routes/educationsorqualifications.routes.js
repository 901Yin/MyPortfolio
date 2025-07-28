import express from 'express'
import qualificationCtrl from '../controllers/educationsorqualifications.controller.js'  // Fix this import

const router = express.Router()

router.route('/api/qualifications')
  .get(qualificationCtrl.list)       // GET all qualifications
  .post(qualificationCtrl.create)    // CREATE new qualification
  .delete(qualificationCtrl.removeAll) // DELETE all qualifications

router.route('/api/qualifications/:qualificationId')
  .get(qualificationCtrl.read)       // GET single qualification
  .put(qualificationCtrl.update)     // UPDATE qualification
  .delete(qualificationCtrl.remove)  // DELETE qualification

router.param('qualificationId', qualificationCtrl.educationByID)

export default router