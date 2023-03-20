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
import AddPropertyModal from './AddPropertyModal'
import { deleteProperty, getProperties } from 'api/properties'
import { type Property } from 'types/property'

const Properties = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [properties, setProperties] = useState<Property[] | null>(null)

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
      <Button onClick={onOpen} mt={6}>
        Add new
      </Button>
      {isLoading && <Loader />}
      {properties && !isLoading && (
        <Table mt={6}>
          {properties.map((category) => (
            <Tr key={category.title}>
              <Td>{category.title}</Td>
              <Td>
                <Flex w="full" justifyContent="end">
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleDelete(category._id)
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
        onClose={onClose}
        fetch={fetchProperties}
      />
    </Container>
  )
}

export default Properties
