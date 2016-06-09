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

// Search users by key word
router.get('/search/:query', (req, res) => {
  var query = req.params.query
  Users.find({
    $or: [
      {
        name: new RegExp(query, 'i')
      },
      {
        email: new RegExp(query, 'i')
      }
    ]
  }, toRes(res))
})

// Add contacts
router.post('/addcontacts/:uid', (req, res) => {
    Users.findById(req.params.uid, (err, user) => {
        if(err) console.log(err)
        var idSet = new Set()
        for(let group of user.groups){
            for(let member of group.members){
                idSet.add(member.uid.toString())
            }
        }
        for(let id of req.body.ids){
            if(!idSet.has(id) && id != user._id){
                user.groups[0].members.push({uid: id})
            }
        }
        user.save((err, user, numAffected) => {
            if(err){
                console.log(err)
            }else{
                res.status(200).json(user)
            }
        })
    })
})

// Record chat
router.post('/recordchat/:uid', (req, res) => {
    Users.findById(req.params.uid, (err, user) => {
        if(err) console.log(err)
        var flag = true
        var nChat = req.body
        for(let chat of user.chats){
            if(req.body.rid == chat.rid){
                chat.lastTime = new Date()
                chat.lastMsg = nChat.lastMsg
                flag = false
                break
            }
        }
        if(flag){
            user.chats.push({
                rid: req.body.id,
                lastTime: new Date(),
                lastMsg: ''
            })
        }
        user.save(toRes(res))
    })
})

export default router
