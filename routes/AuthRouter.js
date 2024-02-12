const router = require('express').Router()
const middleware = require('../middleware')
const controller = require('../controllers/AuthController')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router