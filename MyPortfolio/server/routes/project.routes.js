import express from 'express'
import projectCtrl from '../controllers/project.controller.js'

const router = express.Router()

router.route('/api/projects')
  .get(projectCtrl.list)       // GET all projects
  .post(projectCtrl.create)    // CREATE new project
  .delete(projectCtrl.removeAll) // DELETE all projects

router.route('/api/projects/:projectId')
  .get(projectCtrl.read)       // GET single project
  .put(projectCtrl.update)     // UPDATE project
  .delete(projectCtrl.remove)  // DELETE project

router.param('projectId', projectCtrl.projectByID)

export default router