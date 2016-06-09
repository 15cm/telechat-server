import { mongoose } from '../db'
import uniqueValidator from 'mongoose-unique-validator'

var Oid = mongoose.Schema.Types.ObjectId

var usersSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  password: String,
  avatar: String,
  groups: [
    {
      name: String,
      members: [
        { uid: Oid }
      ]
    }
  ],
  chats: [
    {
      uid: Oid,
      lastTime: {
        type: Date,
        default: Date.now
      },
      lastMsg: String
    }
  ]
})

usersSchema.path('groups').default(()=>[
  {
    name: 'default',
    members: []
  }
])
var Users = mongoose.model('user',usersSchema)

export default Users
