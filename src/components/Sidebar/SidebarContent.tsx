import React from 'react'
import { Box, CloseButton, Flex, Text, type BoxProps } from '@chakra-ui/react'
import NavItem from './NavItem'
import { useAuth } from 'providers/AuthProvider'
import { ADMIN_ROLE, USER_ROLE } from 'data/constants'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  const { user } = useAuth()

  const items = [
    { title: 'Home', icon: 'fas fa-home', to: '/' },
    {
      title: 'Blog',
      icon: 'fas fa-comment',
      to: '/blog'
    },
    {
      title: 'Dashboard',
      icon: 'fas fa-gauge',
      to: '/dashboard',
      roles: [ADMIN_ROLE, USER_ROLE]
    },
    {
      title: 'Create',
      icon: 'fas fa-plus',
      to: '/create',
      roles: [USER_ROLE]
    },
    {
      title: 'Categories',
      icon: 'fas fa-list',
      to: '/categories',
      roles: [ADMIN_ROLE]
    },
    {
      title: 'Properties',
      icon: 'fas fa-tag',
      to: '/properties',
      roles: [ADMIN_ROLE]
    },
    {
      title: 'Users',
      icon: 'fas fa-user',
      to: '/users',
      roles: [ADMIN_ROLE]
    }
  ]

  return (
    <Box
      w={{ base: 'full', md: 64 }}
      bg="gray.200"
      pos="fixed"
      h="full"
      shadow="lg"
    >
      <Flex h={20} alignItems="center" mx={5} justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold">
          AI Content Generator
        </Text>
        <CloseButton onClick={onClose} display={{ base: 'flex', md: 'none' }} />
      </Flex>
      {items.map((item) => (
        <>
          {(!item.roles || (user && item.roles.includes(user.role))) && (
            <NavItem target={item.to} icon={item.icon}>
              {item.title}
            </NavItem>
          )}
        </>
      ))}
    </Box>
  )
}

export default SidebarContent
