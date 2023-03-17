import { Router } from 'express'
import { addNew, deleteSingle, getAll } from './category.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/').get(getAll)
router.route('/').post(authenticate(), requireUser(), addNew)
router.route('/:id').delete(authenticate(), requireUser(), deleteSingle)

export default router
