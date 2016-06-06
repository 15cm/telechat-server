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
}
var userApi = new UserApi(Users)
export default userApi
