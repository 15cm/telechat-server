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
  avatar: {
    type: String,
    default: 'http://o8idiuwvl.bkt.clouddn.com/default_avatar.jpg?imageView2/3/w/64/h/64/q/100/format/png'
  },
  sign: String,
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
usersSchema.plugin(uniqueValidator)

usersSchema.path('groups').default(()=>[
  {
    name: '默认分组',
    members: []
  }
])
var Users = mongoose.model('user',usersSchema)

export default Users
