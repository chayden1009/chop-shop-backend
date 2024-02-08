const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const issueSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    resolved: {type: Boolean, default: false, required: true}
  }
)


module.exports = mongoose.model('Issue', issueSchema)