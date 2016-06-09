export default class {
  constructor (model) {
    this.model = model
  }

  find (id) {
    return this.model.findById(id).exec()
  }
  create (data) {
    return this.model.create(data)
  }
  update (id,data) {
    return this.model.findByIdAndUpdate(id, data).exec()
  }
  remove (id) {
    return this.model.findByIdAndRemove(id).exec()
  }
}
