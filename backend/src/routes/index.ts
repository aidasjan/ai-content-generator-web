import { Router } from 'express'
import { categoryRouter } from '../domain/category'
import { propertyRouter } from '../domain/property'
import { resultRouter } from '../domain/result'
import { userRouter } from '../domain/user'

const router = Router()

router.use('/users', userRouter)
router.use('/results', resultRouter)
router.use('/categories', categoryRouter)
router.use('/properties', propertyRouter)

export default router
