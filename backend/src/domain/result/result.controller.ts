import { type Errback, type Request, type Response } from 'express'
import {
  getResult,
  getPublicResults,
  getUserResults,
  addResult,
  deleteResult
} from './result.service'

export const getSingle = (req: Request, res: Response, next: Errback) => {
  getResult(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const getAllPublic = (req: Request, res: Response, next: Errback) => {
  getPublicResults()
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const getAllByUser = (req: Request, res: Response, next: Errback) => {
  getUserResults(req.user?.id)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const addNew = (req: Request, res: Response, next: Errback) => {
  addResult(req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const deleteSingle = (req: Request, res: Response, next: Errback) => {
  deleteResult(req.params.id)
    .then(() => res.json({ message: 'Deleted' }))
    .catch((err) => {
      next(err)
    })
}
