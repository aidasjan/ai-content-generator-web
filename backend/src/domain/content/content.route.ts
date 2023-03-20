import { Router } from 'express'
import {
  addNew,
  create,
  deleteSingle,
  getAllByUser,
  getAllPublic,
  getSingle
} from './content.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/:id').get(authenticate(), requireUser(), getSingle)
router.route('/').get(getAllPublic)
router.route('/user').post(authenticate(), requireUser(), getAllByUser)
router.route('/').post(authenticate(), requireUser(), addNew)
router.route('/:id').delete(authenticate(), requireUser(), deleteSingle)
router.route('/create').post(authenticate(), requireUser(), create)

export default router
