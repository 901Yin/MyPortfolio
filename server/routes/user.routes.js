import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { requireAdmin } from '../middleware/roleAuth.js'

const router = express.Router()

// Public routes
router.route('/api/users')
  .post(userCtrl.create)    // CREATE new user (signup)

// Admin-only routes
router.route('/api/users/admin')
  .get(authCtrl.requireSignin, requireAdmin, userCtrl.list)       // GET all users (admin only)
  .delete(authCtrl.requireSignin, requireAdmin, userCtrl.removeAll) // DELETE all users (admin only)

// Get current user (authenticated users)
router.route('/api/users/me')
  .get(authCtrl.requireSignin, userCtrl.getCurrentUser)

// Individual user routes (admin only for update/delete)
router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)  // Any authenticated user can read user details
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)  // User can update own profile or admin can update any
  .delete(authCtrl.requireSignin, requireAdmin, userCtrl.remove)  // DELETE user (admin only)

router.param('userId', userCtrl.userByID)

export default router