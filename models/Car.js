const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Issue = require('./Issue')


const carSchema = new Schema (
  {
    year: {type: String, required: true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    engine: {type: String, required: true},
    trim: {type: String, required: true},
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
      }
    ]
  }
)


module.exports = mongoose.model('Car', carSchema)