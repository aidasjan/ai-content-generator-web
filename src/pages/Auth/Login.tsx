import React, { useState, type ChangeEvent } from 'react'
import { Box, Button, Heading, Input } from '@chakra-ui/react'
import { Container } from 'components'
import { useAuth } from 'providers/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const inputs = [
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password'
    }
  ]

  const handleSubmit = async () => {
    const isLoginSuccessful = await login(form.email, form.password)
    if (isLoginSuccessful) {
      navigate('/dashboard')
    }
  }

  return (
    <Container maxW="500px">
      <Heading>Login</Heading>
      {inputs.map((input) => (
        <Box key={input.label} mt={4}>
          <Box>{input.label}</Box>
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, [input.key]: e.target.value })
            }}
            type={input.type}
          />
        </Box>
      ))}
      <Button colorScheme="blue" onClick={handleSubmit} mt={5}>
        Login
      </Button>
    </Container>
  )
}

export default Login
