import React from 'react'
import { Box, Button, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Container } from 'components'
import { useAuth } from 'providers/AuthProvider'

const UserDashboard = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <Container>
      <Heading>Hello {user.name}</Heading>
      <Box bg="gray.200" p={8} mt={12} borderRadius="xl">
        <Box fontSize="xl" fontWeight="bold">
          Create Content
        </Box>
        <Box mt={4} mb={4}>
          Generate content using AI by choosing categories and properties
        </Box>
        <Link to="/create">
          <Button colorScheme="blue">Create</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default UserDashboard
