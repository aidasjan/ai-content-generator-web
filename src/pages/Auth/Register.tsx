import React, { useState, type ChangeEvent } from 'react'
import { Box, Button, Heading, Input } from '@chakra-ui/react'
import { Container } from 'components'
import { registerUser } from 'api/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const inputs = [
    {
      key: 'name',
      label: 'Name'
    },
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
    await registerUser(form.name, form.email, form.password)
    navigate('/login')
  }

  return (
    <Container maxW="500px">
      <Heading>Register</Heading>
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
      <Button onClick={handleSubmit} mt={5}>
        Submit
      </Button>
    </Container>
  )
}

export default Register
