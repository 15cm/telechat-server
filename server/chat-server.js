import UserApi from './api/users'
import MsgApi from './api/msgs'

export default class {
  constructor (io) {
    this.io = io
    this.userSockets = new Map()
    this.userIdToSocketIds = new Map()
  }

  start () {
    this.io.on('connection', (err, socket, session) => {
      console.log(socket.id)
      console.log(session)
      socket.on('login', data => {
        //UserApi.auth(data.email, data.password)
        //.then(user => {
          //this.userSockets.set(socket.id, socket)
          //this.userIdToSocketIds.set(user._id, socket.id)
          //socket.handshake.session.user = user
        //})
        //.catch(err => {
          //console.log(err)
        //})
      })
      socket.on('sendMsg', msg => {
        sendMsg (socket, msg.rid)
      })
      socket.on('disconnect', () => {
        this.broadcastUserDisconnect(socket)
      })
      socket.on('err', err => {
        console.log(err)
      })
    })
  }

  sendMsg (socket, rid) {
    MsgApi.create(msg).then(msg => {
      socket.broadcast.to(userIdToSocketIds.get(rid)).emit('recvMsg', msg)
    })
    .catch(err => {
      socket.emit('err',err)
    })
  }

  broadcastUserDisconnect (socket) {
    return
    this.disconnectUser(socket)
  }

  disconnectUser (socket) {
    this.userIdToSocketIds.delete(this.onlineUsers.get(socket.id).user.id)
    this.userSockets.delete(socket.id)
  }
}
