const mongoose = require('mongoose')
const Car = require('../models/Car')
const Issue = require('../models/Issue')
const User = require('../models/User')

const carsIndex = async (req, res, next) => {
  try {
    const { payload } = res.locals
    const { id } = payload
    const user = await User.findById(id)
      .populate('cars')

    res.send(user.cars)
  } catch (error) {
    throw error
  }
}


const carDetail = async (req, res, next) => {
  try {
    const car = await Car.find({_id: req.params.id})
    .populate('issues')
    
    res.send(car)
  } catch (error) {
    throw error
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

const removeCar = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const car = await Car.findOneAndDelete({_id: req.params.id})
    res.send(car)
  } catch (error) {
    console.log(error)
  }
}

const addIssue = async (req, res, next) => {
  try {
    const issue = await Issue.create({ ...req.body })
    const car = await Car.findById(req.params.id)
    if (!car.issues) {
      car.issues = []
    }
    await car.issues.push(issue)
    await car.save()

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
  delete: removeCar
}