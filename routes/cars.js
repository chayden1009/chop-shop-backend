const express = require('express')
const router = express.Router();
const carsCtrl = require('../controllers/cars')
const middleware = require('../middleware/index')

router.get('/',
  middleware.stripToken,
  middleware.verifyToken,
  carsCtrl.index
)

router.get('/:id',
  middleware.stripToken,
  middleware.verifyToken,
  carsCtrl.detail
)

router.post('/:id/issues', 
  carsCtrl.addIssue,
)


router.post('/',
  middleware.stripToken,
  middleware.verifyToken,
  carsCtrl.create
)

router.delete('/:id', 
  middleware.stripToken,
  middleware.verifyToken,
  carsCtrl.delete
)













module.exports = router;