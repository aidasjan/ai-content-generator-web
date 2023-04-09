import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Loader } from 'components'
import { useAuth } from 'providers/AuthProvider'
import { type Content } from 'types/content'
import { deleteContent, getSelfContents } from 'api/contents'

const UserDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [contents, setContents] = useState<Content[] | null>(null)

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    setIsLoading(true)
    const response = await getSelfContents()
    setContents(response)
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    await deleteContent(id)
    await fetchContents()
  }

  if (!user) {
    return null
  }

  return (
    <Container>
      <Heading>Hello {user.name}</Heading>
      <Box bg="gray.200" p={8} mt={12} borderRadius="xl">
        <Heading size="lg">Create Content</Heading>
        <Box mt={4} mb={4}>
          Generate content using AI by choosing categories and properties
        </Box>
        <Link to="/create">
          <Button colorScheme="blue">Create</Button>
        </Link>
      </Box>
      <Heading size="lg" mt={10}>
        My Content
      </Heading>
      {isLoading && <Loader />}
      {!isLoading && contents && contents.length === 0 && (
        <Box mt={6}>
          You have not created any content yet. Saved content will appear here.
        </Box>
      )}
      {!isLoading && contents && contents.length > 0 && (
        <Box mt={6}>
          {contents.map((content) => (
            <Box
              key={content._id}
              backgroundColor="gray.200"
              mt={3}
              p={4}
              borderRadius="xl"
              cursor="pointer"
              onClick={() => {
                navigate(`/blog/${content._id}`)
              }}
            >
              <Flex>
                <Box flex={1}>
                  <Box
                    color={content.isPublic ? 'green.600' : 'blue.400'}
                    fontWeight="bold"
                    fontSize="sm"
                  >
                    {content.isPublic ? 'Published' : 'Draft'}
                  </Box>
                  <Heading size="sm" mt={1}>
                    {content.title ?? content.keywords.join(', ')}
                  </Heading>
                  <Box mt={1} fontSize="sm" color="gray.500">
                    {content.category.title}
                  </Box>
                </Box>
                <Flex gap={3}>
                  {!content.isPublic ? (
                    <Button
                      colorScheme="blue"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/contents/${content._id}/publish`)
                      }}
                    >
                      Publish
                    </Button>
                  ) : null}
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(content._id)
                    }}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  )
}

export default UserDashboard
