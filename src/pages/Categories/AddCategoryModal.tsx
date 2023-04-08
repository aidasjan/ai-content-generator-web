import React, { useState, type ChangeEvent } from 'react'
import { Modal } from 'components'
import { addCategory } from 'api/categories'
import { Box, Button, Input, Select } from '@chakra-ui/react'
import { type Category } from 'types/category'

interface Props {
  categories: Category[]
  isOpen: boolean
  onClose: () => void
  fetch: () => Promise<void>
}

const AddCategoryModal = ({ categories, isOpen, onClose, fetch }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [parent, setParent] = useState<string>('')

  const handleAdd = async () => {
    await addCategory(title, parent === '' ? null : parent)
    await fetch()
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Box>Title</Box>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
        }}
      />
      <Box mt={4}>Parent</Box>
      <Select
        onChange={(e) => {
          setParent(e.target.value)
        }}
      >
        <option value={''}>Select Parent (optional)</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </Select>
      <Button onClick={handleAdd} mt={4}>
        Submit
      </Button>
    </Modal>
  )
}

export default AddCategoryModal
