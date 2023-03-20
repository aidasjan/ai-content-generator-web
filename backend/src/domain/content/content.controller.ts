import { type Errback, type Request, type Response } from 'express'
import {
  getContent,
  getPublicContents,
  getUserContents,
  addContents,
  deleteContent,
  createContent
} from './content.service'

export const getSingle = (req: Request, res: Response, next: Errback) => {
  getContent(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const getAllPublic = (req: Request, res: Response, next: Errback) => {
  getPublicContents()
    .then((users) => res.json(users))
    .catch((err) => {
      next(err)
    })
}

export const getAllByUser = (req: Request, res: Response, next: Errback) => {
  getUserContents(req.user?.id)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const addNew = (req: Request, res: Response, next: Errback) => {
  addContents(req.body)
    .then((result) => res.json(result))
    .catch((err) => {
      next(err)
    })
}

export const deleteSingle = (req: Request, res: Response, next: Errback) => {
  deleteContent(req.params.id)
    .then(() => res.json({ message: 'Deleted' }))
    .catch((err) => {
      next(err)
    })
}

export const create = (req: Request, res: Response, next: Errback) => {
  createContent(req.body.category, req.body.properties, req.body.keywords)
    .then((result) => res.json({ result }))
    .catch((err) => {
      next(err)
    })
}
