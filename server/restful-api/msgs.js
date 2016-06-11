import restfulMongoose from '../lib/restful-mongoose'
import { toRes } from '../lib/util'
import Msgs from '../models/msgs'


var router = restfulMongoose(Msgs)
// Get msg by sender_id and recver_id
router.get('/and/:sid/:rid', (req, res) => {
  Msgs.find({
    sid: req.params.sid,
    rid: req.params.rid
  }).sort('time').exec(toRes(res))
})

// Get msg by sender_id or recver_id
router.get('/or/:sid/:rid', (req, res) => {
  Msgs.find({
    $or: [
      {
        sid: req.params.sid,
        rid: req.params.rid
      },
      {
        sid: req.params.rid,
        rid: req.params.sid
      }
    ]
  }).sort('time').exec(toRes(res))
})

// Delete msg by sender_id
router.delete('/sid/:id', (req, res) => {
  Msgs.findAndRemove({
    sid: req.params.id
  }, toRes(res))
})

export default router
