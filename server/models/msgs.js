import { mongoose } from '../db'
var Oid = mongoose.Schema.Types.ObjectId

var msgsSchema = mongoose.Schema({
  sid: Oid, // Sender Id
  rid: Oid,// Redver Id
  content: String,
  time: {
    type: Date,
    default: Date.now
  }
})

var Msgs = mongoose.model('msgs',msgsSchema)

export default Msgs
