import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'


const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)       // GET all users
  .post(userCtrl.create)    // CREATE new user
  .delete(userCtrl.removeAll) // DELETE all users

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router