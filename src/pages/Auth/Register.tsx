import React, { useState, type ChangeEvent } from 'react'
import { Box, Button, Checkbox, Heading, Input } from '@chakra-ui/react'
import { Container } from 'components'
import { useNavigate } from 'react-router-dom'
import { useApi } from 'hooks'

const Register = () => {
  const navigate = useNavigate()
  const { registerUser } = useApi()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isChecked, setIsChecked] = useState(false)

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
    const registerResult = await registerUser(
      form.name,
      form.email,
      form.password
    )
    if (registerResult) {
      navigate('/login')
    }
  }

  return (
    <Container maxW="600px">
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
      <Box mt={6} fontSize="sm">
        This application is intended only for beta testing. Please do not
        register and do not provide any personal information if you cannot
        directly contact the developer of this application in order to request
        for removal of your personal data. Upon registration your personal data
        might be available to other users of this application.
      </Box>
      <Box>
        <Checkbox
          mt={6}
          onChange={() => {
            setIsChecked(!isChecked)
          }}
        >
          <Box fontSize="sm" fontWeight="bold">
            I am able to contact the developer of this application and I
            understand that my personal information might be publicly available.
          </Box>
        </Checkbox>
      </Box>
      <Button onClick={handleSubmit} isDisabled={!isChecked} mt={5}>
        Register
      </Button>
    </Container>
  )
}

export default Register
