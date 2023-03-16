import { Router } from 'express'
import { addNew, getAll, login } from './user.controller'
import { authenticate } from '../../utils/auth'

const router = Router()

router.route('/').get(authenticate(), getAll)
router.route('/').post(addNew)
router.route('/login').post(login)

export default router
