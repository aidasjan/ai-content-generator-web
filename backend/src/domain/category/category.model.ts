import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  title: String,
  createdAt: { type: Date, default: Date.now }
})

const CategoryModel = mongoose.model('Category', userSchema)

export default CategoryModel
