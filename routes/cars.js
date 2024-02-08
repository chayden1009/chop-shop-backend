const express = require('express')
const router = express.Router();
const carsCtrl = require('../controllers/cars')
const middleware = require('../middleware/index')

router.get('/',
  middleware.stripToken,
  middleware.verifyToken,
  carsCtrl.index
)
router.post('/', 
  carsCtrl.create
)











module.exports = router;