require("dotenv").config();

require('./config/db.connection')

const { PORT } = process.env;

const express = require("express");

const app = express();

app.use('/')

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))