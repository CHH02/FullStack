const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)