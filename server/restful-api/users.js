import restfulMongoose from '../lib/restful-mongoose'
import { toRes } from '../lib/util'
import Users from '../models/users'

var router = restfulMongoose(Users)

// Get user by email
router.get('/email/:email', (req, res) => {
  Users.findOne({ email: req.params.email }, toRes(res))
})

// Authentication by {email,password}
router.post('/auth', (req, res) => {
  var auth = {
    email: req.body.email,
    password: req.body.password
  }
  Users.findOne(auth).exec()
  .then(user => {
    res.status(200).json(user._id)
  }).catch(err => {
    res.status(404).send(err)
  })
})

export default router
