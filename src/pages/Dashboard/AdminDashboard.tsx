import React from 'react'
import { Box, Button, Heading, SimpleGrid } from '@chakra-ui/react'
import { useAuth } from 'providers/AuthProvider'
import { Container } from 'components'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const items = [
    { title: 'Users', to: '/users' },
    { title: 'Categories', to: '/categories' },
    { title: 'Properties', to: '/properties' }
  ]

  return (
    <Container>
      <Heading>Hello {user.name}</Heading>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4} mt={12}>
        {items.map((item) => (
          <Box bg="gray.200" p={8} key={item.title} borderRadius="xl">
            <Box fontSize="xl" fontWeight="bold" mb={4}>
              {item.title}
            </Box>
            <Link to={item.to}>
              <Button colorScheme="blue">Manage</Button>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default AdminDashboard
