import React, { useState, useEffect } from 'react'
import { Box, Button, Heading, Input } from '@chakra-ui/react'
import { Container, Loader } from 'components'
import { type Content } from 'types/content'
import { useNavigate, useParams } from 'react-router-dom'
import { getContent, publishContent } from 'api/content'

const Publish = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<Content | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    setIsLoading(true)
    const id = params.id
    if (id) {
      const response = await getContent(id)
      setContent(response)
    }
    setIsLoading(false)
  }

  const handleSubmit = async () => {
    if (!content) {
      return
    }
    setIsLoading(true)
    await publishContent(content._id, title)
    navigate('/dashboard')
    setIsLoading(false)
  }

  return (
    <Container>
      <Heading>Publish Post</Heading>
      {isLoading && <Loader />}
      {!isLoading && content && (
        <Box mt={12}>
          <Box my={2}>Title of your post</Box>
          <Input
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            placeholder="Enter title"
          />
          <Box bg="gray.200" p={8} mt={8}>
            {content.content.split('\n').map((line) => (
              <Box key={line} mb={3}>
                {line}
              </Box>
            ))}
          </Box>
          <Button colorScheme="blue" onClick={handleSubmit} mt={8}>
            Publish Content
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default Publish
