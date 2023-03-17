import { Router } from 'express'
import { addNew, deleteSingle, getAllByUser, getAllPublic, getSingle } from './result.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/:id').get(authenticate(), requireUser(), getSingle)
router.route('/').get(getAllPublic)
router.route('/user').post(authenticate(), requireUser(), getAllByUser)
router.route('/').post(authenticate(), requireUser(), addNew)
router.route('/:id').delete(authenticate(), requireUser(), deleteSingle)

export default router
