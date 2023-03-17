import React from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/react'

interface Props {
  onOpen: () => void
}

const Navbar = ({ onOpen }: Props) => {
  return (
    <>
      <Flex
        ml={{ base: 0, md: 64 }}
        px={{ base: 4, md: 24 }}
        height={20}
        alignItems="center"
        bg="gray.200"
        justifyContent="flex-end"
        shadow="lg"
      >
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
