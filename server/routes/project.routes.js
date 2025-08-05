import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import { requireAdmin } from '../middleware/roleAuth.js'

const router = express.Router()

// Public route for viewing projects
router.route('/api/projects')
  .get(projectCtrl.list)       // GET all projects (public)

// Admin-only routes for project management
router.route('/api/projects/admin')
  .post(authCtrl.requireSignin, requireAdmin, projectCtrl.create)    // CREATE new project (admin only)
  .delete(authCtrl.requireSignin, requireAdmin, projectCtrl.removeAll) // DELETE all projects (admin only)

// Individual project routes
router.route('/api/projects/:projectId')
  .get(projectCtrl.read)       // GET single project (public)
  .put(authCtrl.requireSignin, requireAdmin, projectCtrl.update)     // UPDATE project (admin only)
  .delete(authCtrl.requireSignin, requireAdmin, projectCtrl.remove)  // DELETE project (admin only)

router.param('projectId', projectCtrl.projectByID)

export default router