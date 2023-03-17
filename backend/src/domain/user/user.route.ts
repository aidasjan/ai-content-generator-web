import { Router } from 'express'
import { register, getAll, login } from './user.controller'
import { authenticate, requireUser } from '../../utils/auth'

const router = Router()

router.route('/').get(authenticate(), requireUser(), getAll)
router.route('/register').post(register)
router.route('/login').post(login)

export default router
