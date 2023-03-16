import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
