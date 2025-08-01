import Contact from '../models/contact.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  const contact = new Contact(req.body)
  try {
    await contact.save()
    return res.status(200).json({
      message: "Contact added successfully!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let contacts = await Contact.find().select('firstname lastname email')
    res.json(contacts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id)
    if (!contact)
      return res.status(400).json({
        error: "No contact found"
      })
    req.profile = contact
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Unable to obtain contact information"
    })
  }
}

const read = (req, res) => {
  return res.json(req.profile)
}

const update = async (req, res) => {
  try {
    let contact = req.profile
    contact = extend(contact, req.body)
    await contact.save()
    res.json(contact)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let contact = req.profile
    let deletedContact = await contact.deleteOne()
    res.json(deletedContact)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({}) // Delete all contacts
    res.json({
      message: `${result.deletedCount} contacts deleted successfully`
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { 
  create, 
  contactByID, 
  read, list, 
  remove, 
  update,
  removeAll
}