import React from 'react'
import { Box } from '@chakra-ui/react'
import { useAuth } from 'providers/AuthProvider'

interface Props {
  roles: string[]
  element: any
}

const RequireAuth = ({ roles, element }: Props) => {
  const { user } = useAuth()
  if (user?.role && roles.includes(user?.role)) {
    return <>{element}</>
  } else {
    return <Box>You do not have permission to view this page</Box>
  }
}

export default RequireAuth
