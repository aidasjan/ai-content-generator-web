import { type Errback, type Request, type Response } from 'express'
import { addNewUser, getAllUsers, loginUser } from './user.service'

export const getAll = (req: Request, res: Response, next: Errback) => {
  getAllUsers()
    .then(users => res.json(users))
    .catch(err => {
      next(err)
    })
}

export const addNew = (req: Request, res: Response, next: Errback) => {
  addNewUser(req.body)
    .then(() => res.json({ message: 'User Added' }))
    .catch(err => {
      next(err)
    })
}

export const login = (req: Request, res: Response) => {
  const token = loginUser(req.body.name, req.body.password)
  res.json({ result: token })
}
