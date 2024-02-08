const mongoose = require('mongoose')
const Car = require('../models/Car')

const carsIndex = async (req, res, next) => {
  try {
    res.json(await Car.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
}

const createCar = async (req, res, next) => {
  try {
    const car = await Car.create({ ...req.body })
    res.send(car)
  } catch (error) {
    throw error
  }
}


module.exports = {
  index: carsIndex,
  create: createCar,
}