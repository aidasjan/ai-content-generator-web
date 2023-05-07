import React, { useEffect, useState, type ChangeEvent } from 'react'
import { Modal } from 'components'
import { Box, Button, Input, Select } from '@chakra-ui/react'
import { type Category } from 'types/category'
import { useApi } from 'hooks'

interface Props {
  categories: Category[]
  isOpen: boolean
  record: Category | null
  onClose: () => void
  fetch: () => Promise<void>
}

const CategoryModal = ({
  categories,
  record,
  isOpen,
  onClose,
  fetch
}: Props) => {
  const { addCategory, editCategory } = useApi()
  const [title, setTitle] = useState<string>('')
  const [parent, setParent] = useState<string>('')

  useEffect(() => {
    setTitle(record?.title ?? '')
    setParent(record?.parent?._id ?? '')
  }, [record])

  const handleAdd = async () => {
    if (record) {
      await editCategory(record._id, title, parent)
    } else {
      await addCategory(title, parent === '' ? null : parent)
    }
    await fetch()
    onClose()
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Box>Title</Box>
      <Input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
        }}
      />
      <Box mt={4}>Parent</Box>
      <Select
        value={parent}
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

export default CategoryModal
