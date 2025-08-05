import express from 'express'
import contactCtrl from '../controllers/contact.controller.js'

const router = express.Router()

router.route('/api/contacts')
  .get(contactCtrl.list)       // GET all contacts
  .post(contactCtrl.create)    // CREATE new contact
  .delete(contactCtrl.removeAll) // DELETE all contacts

router.route('/api/contacts/:contactId')
  .get(contactCtrl.read)       // GET single contact
  .put(contactCtrl.update)     // UPDATE contact
  .delete(contactCtrl.remove)  // DELETE contact

router.param('contactId', contactCtrl.contactByID)

export default router