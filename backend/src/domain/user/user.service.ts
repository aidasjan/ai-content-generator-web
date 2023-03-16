import jwt from 'jsonwebtoken'
import { type User } from './types'
import UserModel from './user.model'

export const getAllUsers = () => {
  return UserModel.find()
}

export const addNewUser = async (user: User) => {
  const newUser = new UserModel(user)
  return await newUser.save()
}

export const loginUser = (name: string, password: string) => {
  const secret = process.env.JWT_SECRET
  const validityMinutes = process.env.JWT_VALIDITY_MINUTES

  if (!secret || !validityMinutes) {
    return null
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * parseFloat(validityMinutes),
      sub: '1'
    },
    secret
  )

  return token
}
