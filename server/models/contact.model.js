import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'First name is required'
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Last name is required'
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

ContactSchema.path('email').validate(async function(value) {
  const contact = await this.constructor.findOne({ email: value })
  if (contact) {
    if (this.id === contact.id) return true
    return false
  }
  return true
}, 'Email already exists')

export default mongoose.model('Contact', ContactSchema)