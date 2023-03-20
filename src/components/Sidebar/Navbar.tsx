import React from 'react'
import { Box, Button, Flex, IconButton } from '@chakra-ui/react'
import { useAuth } from 'providers/AuthProvider'
import { Link } from 'react-router-dom'

interface Props {
  onOpen: () => void
}

const Navbar = ({ onOpen }: Props) => {
  const { user, logout } = useAuth()
  return (
    <>
      <Flex
        ml={{ base: 0, md: 64 }}
        px={{ base: 4, md: 24 }}
        height={16}
        alignItems="center"
        bg="gray.200"
        justifyContent="flex-end"
      >
        {user ? (
          <Flex gap={4} alignItems="center">
            <Box>{user.name}</Box>
            <Button onClick={logout}>Logout</Button>
          </Flex>
        ) : (
          <Flex gap={4}>
            <Link to="/login">
              <Button colorScheme="blue">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </Flex>
        )}
        <IconButton
          onClick={onOpen}
          aria-label="menu"
          display={{ base: 'block', lg: 'none' }}
        >
          <Box className="fa fa-bars" />
        </IconButton>
      </Flex>
    </>
  )
}

export default Navbar
