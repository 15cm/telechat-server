import ModelApi from './model'
import Msgs from '../models/msgs'

class MsgApi extends ModelApi {
  findBySenderAndRecverId (sid, rid) {
    return this.model.findOne({
      sid: sid,
      rid: rid
    }).exec()
  }

  removeBySenderId (sid) {
    return this.model.findOneAndRemove({
      sid: sid
    }).exec()
  }
}
var msgApi = new MsgApi(Msgs)
export default msgApi
