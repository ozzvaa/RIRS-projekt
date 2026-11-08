import { Router } from 'express'
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController'
import { requireAuth } from '../middleware/requireAuth'

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/me', requireAuth, currentUser)
authRouter.post('/logout', logoutUser)

export default authRouter
