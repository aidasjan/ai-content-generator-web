import { Router } from 'express'
import { register, getAll, login, deleteSingle } from './user.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/').get(authenticate(), requireUser(), getAll)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/:id').delete(deleteSingle)

export default router
