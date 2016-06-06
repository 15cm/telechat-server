import restfulMongoose from '../lib/restful-mongoose'
import { toRes } from '../lib/util'
import Msgs from '../models/msgs'


var router = restfulMongoose(Msgs)
// Get msg by sender_id and recver_id
router.get('/:sid/:rid', (req, res) => {
  Msgs.findOne({
    sid: req.params.sid,
    rid: req.params.rid
  })
})

// Delete msg by sender_id
router.delete('/sid/:id', (req, res) => {
  Msgs.findOneAndRemove(req.params.id, toRes(res))
})

export default router
