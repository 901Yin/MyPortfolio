import express from 'express'
import qualificationCtrl from '../controllers/educationsorqualifications.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { requireAdmin } from '../middleware/roleAuth.js'

const router = express.Router()

// Public route for viewing qualifications
router.route('/api/educationsorqualifications')
  .get(qualificationCtrl.list)       // GET all qualifications (public)

// Admin-only routes for qualification management
router.route('/api/educationsorqualifications/admin')
  .post(authCtrl.requireSignin, requireAdmin, qualificationCtrl.create)    // CREATE new qualification (admin only)
  .delete(authCtrl.requireSignin, requireAdmin, qualificationCtrl.removeAll) // DELETE all qualifications (admin only)

// Individual qualification routes
router.route('/api/educationsorqualifications/:qualificationId')
  .get(qualificationCtrl.read)       // GET single qualification (public)
  .put(authCtrl.requireSignin, requireAdmin, qualificationCtrl.update)     // UPDATE qualification (admin only)
  .delete(authCtrl.requireSignin, requireAdmin, qualificationCtrl.remove)  // DELETE qualification (admin only)

router.param('qualificationId', qualificationCtrl.educationByID)

export default router