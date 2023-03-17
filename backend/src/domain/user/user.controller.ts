import { type Errback, type Request, type Response } from 'express'
import { registerUser, getAllUsers, loginUser } from './user.service'

export const getAll = (req: Request, res: Response, next: Errback) => {
  getAllUsers()
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const register = (req: Request, res: Response, next: Errback) => {
  registerUser(req.body, req.body.password)
    .then(() => res.json({ message: 'User Added' }))
    .catch((err) => {
      next(err)
    })
}

export const login = (req: Request, res: Response, next: Errback) => {
  loginUser(req.body.email, req.body.password)
    .then((token) => {
      if (token) {
        res.json({ token })
      } else {
        res.status(401)
        res.json({ error: 'Authentication failed' })
      }
    })
    .catch((err) => {
      next(err)
    })
}
