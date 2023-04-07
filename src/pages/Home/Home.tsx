import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Container } from 'components'

const Home = () => {
  return (
    <Container>
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        my={20}
      >
        <Heading
          as="h1"
          size="3xl"
          fontWeight="extrabold"
          letterSpacing="tight"
        >
          AI Content Generator
        </Heading>
        <Text fontSize="xl" mt={8}>
          Automatically generate high-quality content for your blogs, articles,
          and social media posts with AI-powered content generator
        </Text>
      </Flex>
      <Box my={12}>
        <Flex align="center">
          <Box textAlign="center">
            <Box
              className="fas fa-brain"
              fontSize="6xl"
              w="100px"
              color="gray.500"
            />
          </Box>
          <Box>
            <Heading
              as="h3"
              size="lg"
              fontWeight="semibold"
              letterSpacing="tight"
            >
              AI-powered content generation
            </Heading>
            <Text fontSize="md" mt={4}>
              Advanced machine learning algorithms analyze millions of articles
              and documents to generate unique and high-quality content tailored
              to your needs
            </Text>
          </Box>
        </Flex>
        <Flex align="center" mt={8}>
          <Box textAlign="center">
            <Box
              className="fas fa-file-alt"
              fontSize="6xl"
              w="100px"
              color="gray.500"
            />
          </Box>
          <Box>
            <Heading
              as="h3"
              size="lg"
              fontWeight="semibold"
              letterSpacing="tight"
            >
              Customizable content types
            </Heading>
            <Text fontSize="md" mt={4}>
              Choose from a variety of content types and customize them to fit
              your style. AI technology will do the rest, generating unique and
              engaging content every time
            </Text>
          </Box>
        </Flex>
        <Flex align="center" mt={8}>
          <Box textAlign="center">
            <Box
              className="fas fa-cog"
              fontSize="6xl"
              w="100px"
              color="gray.500"
            />
          </Box>
          <Box>
            <Heading
              as="h3"
              size="lg"
              fontWeight="semibold"
              letterSpacing="tight"
            >
              Easy usage
            </Heading>
            <Text fontSize="md" mt={4}>
              AI Content Generator is easy to understand and use, saving you
              time and effort
            </Text>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
}

export default Home
