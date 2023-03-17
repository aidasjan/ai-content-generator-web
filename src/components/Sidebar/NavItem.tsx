import React, { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, type FlexProps, Text } from '@chakra-ui/react'

interface NavItemProps extends FlexProps {
  target: string
  icon: string
  children: ReactNode
}

const NavItem = ({ children, icon, target }: NavItemProps) => {
  return (
    <NavLink to={target}>
      <Flex
        align="center"
        p={4}
        mx={4}
        role="group"
        cursor="pointer"
        color="gray.500"
        _hover={{
          color: 'orange.600'
        }}
      >
        <Text className={icon} w={8}></Text>
        {children}
      </Flex>
    </NavLink>
  )
}

export default NavItem
