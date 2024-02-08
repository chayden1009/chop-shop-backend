const User = require('../models/User')
const middleware = require('../middleware/index')

const Register = async (req, res) => {
  try {
    const {email, password, name} = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).send("A user with that email already exists")
    } else {
      const user = await User.create({email, passwordDigest, name})
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    if (matched) {
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({user: payload, token})
    }
    res.status(401).send({status: 'Error', msg: 'Unauthorized'})
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'Error', msg: 'An error occurred at login'})
  }
}

module.exports = {
  Register,
  Login
}