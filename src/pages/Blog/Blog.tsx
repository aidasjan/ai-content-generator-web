import React, { useState, useEffect } from 'react'
import { Box, Heading, Input, SimpleGrid } from '@chakra-ui/react'
import { Container, Loader } from 'components'
import { type Content } from 'types/content'
import { useNavigate } from 'react-router-dom'
import { getContents } from 'api/contents'

const Blog = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [contents, setContents] = useState<Content[] | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    fetchContents()
  }, [])

  const fetchContents = async () => {
    setIsLoading(true)
    const response = await getContents()
    setContents(response)
    setIsLoading(false)
  }

  const filteredContents = contents?.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm) ||
      content.content.toLowerCase().includes(searchTerm)
  )

  return (
    <Container>
      <Heading>Blog</Heading>
      <Box my={2}>Content created by users, generated by AI</Box>
      <Input
        placeholder="Search for content..."
        maxW="lg"
        mt={6}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />
      {isLoading && <Loader />}
      {!isLoading && filteredContents && (
        <SimpleGrid columns={{ base: 1, lg: 3 }} mt={12} gap={3}>
          {filteredContents.map((content) => (
            <Box
              p={6}
              backgroundColor="gray.200"
              borderRadius="xl"
              key={content._id}
              cursor="pointer"
              onClick={() => {
                navigate(`/blog/${content._id}`)
              }}
            >
              <Box fontSize="lg" fontWeight="bold">
                {content.title}
              </Box>
              <Box fontSize="sm" fontWeight="bold" color="gray.500">
                {content.category.title}
              </Box>
              <Box mt={2}>{content.content.slice(0, 128)}...</Box>
              <Box fontSize="sm" fontWeight="bold" mt={4}>
                By {content.user.name}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}

export default Blog