import React, { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  Heading,
  Table,
  Td,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { Container, Loader } from 'components'
import AddPropertyModal from './PropertyModal'
import { type Property } from 'types/property'
import { useApi } from 'hooks'

const Properties = () => {
  const { deleteProperty, getProperties } = useApi()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [properties, setProperties] = useState<Property[] | null>(null)
  const [editedProperty, setEditedProperty] = useState<Property | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setIsLoading(true)
    const response = await getProperties()
    setProperties(response)
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    await deleteProperty(id)
    await fetchProperties()
  }

  return (
    <Container>
      <Heading>Properties</Heading>
      <Button
        onClick={() => {
          setEditedProperty(null)
          onOpen()
        }}
        mt={6}
      >
        Add new
      </Button>
      {isLoading && <Loader />}
      {properties && !isLoading && (
        <Table mt={6}>
          {properties.map((property) => (
            <Tr key={property.title}>
              <Td>{property.title}</Td>
              <Td>
                <Flex w="full" justifyContent="end" gap={3}>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      setEditedProperty(property)
                      onOpen()
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleDelete(property._id)
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Table>
      )}
      <AddPropertyModal
        isOpen={isOpen}
        record={editedProperty}
        onClose={onClose}
        fetch={fetchProperties}
      />
    </Container>
  )
}

export default Properties
