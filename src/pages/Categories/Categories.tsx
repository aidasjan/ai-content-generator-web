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
import { type Category } from 'types/category'
import { Container, Loader } from 'components'
import { deleteCategory, getCategories } from 'api/categories'
import AddCategoryModal from './AddCategoryModal'

const Categories = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[] | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setIsLoading(true)
    const response = await getCategories()
    setCategories(response)
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    await deleteCategory(id)
    await fetchCategories()
  }

  return (
    <Container>
      <Heading>Categories</Heading>
      <Button onClick={onOpen} mt={6}>
        Add new
      </Button>
      {isLoading && <Loader />}
      {categories && !isLoading && (
        <Table mt={6}>
          {categories.map((category) => (
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
      <AddCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        fetch={fetchCategories}
      />
    </Container>
  )
}

export default Categories