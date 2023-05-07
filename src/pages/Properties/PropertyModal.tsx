import React, { useEffect, useState, type ChangeEvent } from 'react'
import { Modal } from 'components'
import { Box, Button, Input } from '@chakra-ui/react'
import { useApi } from 'hooks'
import { type Property } from 'types/property'

interface Props {
  isOpen: boolean
  record: Property | null
  onClose: () => void
  fetch: () => Promise<void>
}

const PropertyModal = ({ isOpen, record, onClose, fetch }: Props) => {
  const { addProperty, editProperty } = useApi()
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    setTitle(record?.title ?? '')
  }, [record])

  const handleAdd = async () => {
    if (record) {
      await editProperty(record._id, title)
    } else {
      await addProperty(title)
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
      <Button onClick={handleAdd} mt={4}>
        Submit
      </Button>
    </Modal>
  )
}

export default PropertyModal
