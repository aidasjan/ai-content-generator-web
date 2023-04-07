import { Router } from 'express'
import {
  create,
  deleteSingle,
  getAllByUser,
  getAllPublic,
  getSingle,
  publish
} from './content.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/:id').get(getSingle)
router.route('/').get(getAllPublic)
router.route('/user').post(authenticate(), requireUser(), getAllByUser)
router.route('/:id/publish').post(authenticate(), requireUser(), publish)
router.route('/:id').delete(authenticate(), requireUser(), deleteSingle)
router.route('/create').post(authenticate(), requireUser(), create)

export default router
