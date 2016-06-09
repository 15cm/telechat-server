import ModelApi from './model'
import Users from '../models/users'

class UserApi extends ModelApi {
  findByEmail (email) {
    return this.model.findOne({
      email: email
    }).exec()
  }
  auth (email,passwd) {
    return this.model.findOne({
      email: email,
      password: passwd
    }).exec()
  }
  updateChat (msg) {
    return Promise.all([
      this.model.findById(msg.sid).exec(),
      this.model.findById(msg.rid).exec()
    ]).then(([suser, ruser]) => {
      // Update send chats
      var sendChat = suser.chats.find(item => item.uid.equals(msg.rid))
      if(!sendChat){
        suser.chats.push({
          uid: msg.rid,
          lastTime: msg.time,
          lastMsg: ''
        })
      }
      // Update recv chats
      var recvChat = ruser.chats.find(item => item.uid.equals(msg.sid))
      if(recvChat){
        recvChat.lastMsg = msg.content,
        recvChat.lastTime = msg.time
      }else {
        ruser.chats.push({
          uid: msg.sid,
          lastTime: msg.time,
          lastMsg: msg.content
        })
      }

      return Promise.all([
        suser.save(),
        ruser.save()
      ])
    }).catch(err => {
       console.log(err)
    })
  }
}
var userApi = new UserApi(Users)
export default userApi
