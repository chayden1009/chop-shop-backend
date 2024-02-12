const express = require('express')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Car = require('./Car')

const userSchema = new Schema(
  {
    username: {type: String, required: true},
    email: {type: String, required: true},
    passwordDigest: {type: String},
    cars: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Car'
      }
    ]
  },
  {timestamps: true}
)


module.exports = mongoose.model('User', userSchema)