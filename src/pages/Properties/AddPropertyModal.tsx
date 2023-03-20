import React, { useState, type ChangeEvent } from 'react'
import { Modal } from 'components'
import { addProperty } from 'api/properties'
import { Box, Button, Input } from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  fetch: () => Promise<void>
}

const AddPropertyModal = ({ isOpen, onClose, fetch }: Props) => {
  const [title, setTitle] = useState<string>('')

  const handleAdd = async () => {
    await addProperty(title)
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
      <Button onClick={handleAdd} mt={4}>
        Submit
      </Button>
    </Modal>
  )
}

export default AddPropertyModal
