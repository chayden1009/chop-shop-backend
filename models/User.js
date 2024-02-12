const express = require('express')
const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    username: {type: String, required: true},
    email: {type: String, required: true},
    passwordDigest: {type: String}
  },
  {timestamps: true}
)


module.exports = mongoose.model('User', userSchema)