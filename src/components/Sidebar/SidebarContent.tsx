import React from 'react'
import { Box, CloseButton, Flex, Text, type BoxProps } from '@chakra-ui/react'
import NavItem from './NavItem'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  return (
    <Box w={{ base: 'full', md: 64 }} bg="gray.200" pos="fixed" h="full" shadow="lg">
      <Flex h={20} alignItems="center" mx={5} justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold">
          AI Content Generator
        </Text>
        <CloseButton onClick={onClose} display={{ base: 'flex', md: 'none' }} />
      </Flex>
      <NavItem target="/" icon="fas fa-home">
        Home
      </NavItem>
    </Box>
  )
}

export default SidebarContent
