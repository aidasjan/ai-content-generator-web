import React, { useState, useEffect } from 'react'
import { Button, Flex, Heading, Table, Td, Tr } from '@chakra-ui/react'
import { type User } from 'types/user'
import { Container, Loader } from 'components'
import { useApi } from 'hooks'

const Users = () => {
  const { deleteUser, getUsers } = useApi()
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[] | null>(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    const response = await getUsers()
    setUsers(response)
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    await fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container>
      <Heading>Users</Heading>
      {isLoading && <Loader />}
      {users && !isLoading && (
        <Table mt={6}>
          {users.map((user) => (
            <Tr key={user.name}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Flex w="full" justifyContent="end">
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleDelete(user._id)
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
    </Container>
  )
}

export default Users
