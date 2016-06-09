import UserApi from './api/users'
import MsgApi from './api/msgs'

export default class {
  constructor (io) {
    this.io = io
    //this.userSockets = new Map()
    //this.userIdToSocketIds = new Map()
  }

  start () {
    this.io.on('connection', socket => {
      //socket.on('login', data => {
        //this.userSockets.set(socket.id, socket)
        //this.userIdToSocketIds.set(data.id, socket.id)
        //console.log(this.userSockets)
        //console.log(this.userIdToSocketIds)
      //})
      socket.on('sendMsg', msg => {
        this.sendMsg (socket, msg)
      })
      socket.on('disconnect', () => {
        this.broadcastUserDisconnect(socket)
      })
      socket.on('err', err => {
        console.log(err)
      })
    })
  }

  sendMsg (socket, msg) {
    MsgApi.create(msg).then(msg => {
      UserApi.updateChat(msg).then(users => {
        this.io.emit('recvMsg', msg)
      })
      //socket.broadcast.to(userIdToSocketIds.get(msg.rid)).emit('recvMsg', msg)
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
