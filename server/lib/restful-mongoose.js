import { Router } from 'express'
import { toRes } from './util'

export default (model) => {
  var router = Router()

  router.get('/:id', (req, res) => {
    model.findById(req.params.id, toRes(res))
  })

  // Create
  router.post('/', (req, res) => {
    model.create(req.body, toRes(res))
  })

  // Update
  router.put('/:id', (req, res) => {
    delete req.body.id
    model.findByIdAndUpdate(req.params.id, req.body, toRes(res))
  })

  // Delete
  router.delete('/:id', (req, res) => {
    model.findByIdAndRemove(req.params.id, toRes(res))
  })

  return router
}
