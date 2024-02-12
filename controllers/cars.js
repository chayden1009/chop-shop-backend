const mongoose = require('mongoose')
const Car = require('../models/Car')
const Issue = require('../models/Issue')
const User = require('../models/User')

const carsIndex = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userID)
    await user.populate('cars')
    res.send(user.cars)
  } catch (error) {
    res.status(400).json(error)
  }
}

const createCar = async (req, res, next) => {
  try {
    const car = await Car.create({ ...req.body })
    const user = await User.findById(req.body.user)
    if (!user.cars) {
      user.cars = []
    }
    await user.cars.push(car)
    await user.save()
    res.send(car)
    
  } catch (error) {
    throw error
  }
}

const carDetail = async (req, res, next) => {
  try {
    const car = await Car.find({_id: req.params.id})
    res.send(car)
  } catch (error) {
    throw error
  }
}

const addIssue = async (req, res, next) => {
  try {
    const issue = await Issue.create({ ...req.body })
    const car = await Car.findById(`${req.params.id}`)
    if (!car.issues) {
      car.issues = []
    }
    car.issues.push(issue)
    car.save()
    res.send(issue)
  } catch(error) {
    throw error
  }
}


module.exports = {
  index: carsIndex,
  create: createCar,
  detail: carDetail,
  addIssue,
}