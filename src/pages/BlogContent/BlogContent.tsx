import React, { useState, useEffect } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Container, Loader } from 'components'
import { type Content } from 'types/content'
import { useParams } from 'react-router-dom'
import { getContent } from 'api/content'

const BlogContent = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
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

  return (
    <Container maxW="800px">
      {isLoading && <Loader />}
      {!isLoading && content && (
        <Box mt={12}>
          <Box mt={4} fontWeight="bold" color="gray.500">
            {content.category.title}
          </Box>
          <Box backgroundColor="gray.200" p={8}>
            <Heading>{content.title}</Heading>
            <Box mt={2} fontWeight="bold">
              {content.user.name} | {content.user.email}
            </Box>
            <Box mt={2}>
              {content.content.split('\n').map((line) => (
                <Box key={line} mb={3}>
                  {line}
                </Box>
              ))}
            </Box>
          </Box>
          <Box mt={6}>
            <Heading size="sm">Properties</Heading>
            <Flex my={2}>
              {content.properties.map((property) => (
                <Box key={property._id} backgroundColor="gray.200" mr={3} p={2}>
                  {property.title}
                </Box>
              ))}
            </Flex>
          </Box>
          <Box mt={6}>
            <Heading size="sm">Keywords</Heading>
            <Flex my={2}>
              {content.keywords.map((keyword) => (
                <Box key={keyword} backgroundColor="gray.200" mr={3} p={2}>
                  {keyword}
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default BlogContent
