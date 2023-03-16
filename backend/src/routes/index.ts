import { Router } from 'express'
import { userRouter } from '../domain/user'

const router = Router()

router.use('/users', userRouter)

export default router
