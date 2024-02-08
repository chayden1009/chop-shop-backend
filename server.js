const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();
require('./config/db.connection')

const { PORT } = process.env;

const express = require("express");
const app = express();

app.use(logger('dev'))
app.use(express.json())

const carsRouter = require('./routes/cars')
const AuthRouter = require('./routes/AuthRouter')
app.get('/', (req, res) => {
  res.send('Connected!')
})
app.use('/cars', carsRouter)
app.use('/auth', AuthRouter)




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))