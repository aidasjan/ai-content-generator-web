import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { type Category } from 'types/category'
import { type Property } from 'types/property'
import { getCategories } from 'api/categories'
import { getProperties } from 'api/properties'
import { Container, Loader } from 'components'
import { createContent, saveContent } from 'api/contents'
import { Link } from 'react-router-dom'

const Create = () => {
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [properties, setProperties] = useState<Property[] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProperties, setSelectedProperties] = useState<string[] | null>(
    null
  )
  const [selectedKeywords, setSelecetedKeywords] = useState<string[] | null>(
    null
  )
  const [isContentLoading, setIsContentLoading] = useState(false)
  const [contentId, setContentId] = useState<string | null>(null)
  const [contentLines, setContentLines] = useState<string[] | null>(null)

  const getCategoryTitle = (categoryId: string) => {
    if (!categories) {
      return null
    }
    for (const category of categories) {
      if (category._id === categoryId) {
        return category.title
      }
      if (category.subcategories && category.subcategories.length > 0) {
        const subcategory = category.subcategories.find(
          (s) => s._id === categoryId
        )
        if (subcategory) {
          return subcategory.title
        }
      }
    }
  }

  const fetchData = async () => {
    setIsDataLoading(true)
    const categoriesResult = await getCategories()
    const propertiesResult = await getProperties()
    if (categoriesResult && propertiesResult) {
      setCategories(categoriesResult)
      setProperties(propertiesResult)
    }
    setIsDataLoading(false)
  }

  const handlePropertyClick = (property: string) => {
    if (!selectedProperties) {
      setSelectedProperties([property])
      return
    }
    if (selectedProperties.includes(property)) {
      setSelectedProperties(selectedProperties.filter((p) => p !== property))
    } else {
      setSelectedProperties([...selectedProperties, property])
    }
  }

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',')
    setSelecetedKeywords(keywords)
  }

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedProperties || !selectedKeywords) {
      return
    }
    setIsContentLoading(true)
    const contentResponse = await createContent(
      selectedCategory,
      selectedProperties,
      selectedKeywords
    )
    setContentId(contentResponse.result._id)
    setContentLines(contentResponse.result.content.split('\n'))
    setIsContentLoading(false)
  }

  const handleSave = async () => {
    if (!contentId) {
      return
    }
    await saveContent(contentId)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container>
      {isDataLoading && <Loader />}
      {categories && properties && !isDataLoading && (
        <>
          <Heading>1. Choose Content Type</Heading>
          <Menu>
            <MenuButton
              mt={10}
              w="full"
              maxW="md"
              as={Button}
              rightIcon={<Box className="fas fa-chevron-down" />}
            >
              <>
                {selectedCategory
                  ? getCategoryTitle(selectedCategory)
                  : 'Select Category'}
              </>
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <React.Fragment key={category._id}>
                  {category.subcategories?.length === 0 && (
                    <MenuItem
                      onClick={() => {
                        setSelectedCategory(category._id)
                      }}
                    >
                      {category.title}
                    </MenuItem>
                  )}
                  {category.subcategories?.length !== 0 && (
                    <MenuGroup title={category.title}>
                      {category.subcategories?.map((subcategory) => (
                        <MenuItem
                          key={subcategory._id}
                          pl={6}
                          onClick={() => {
                            setSelectedCategory(subcategory._id)
                          }}
                        >
                          {subcategory.title}
                        </MenuItem>
                      ))}
                    </MenuGroup>
                  )}
                </React.Fragment>
              ))}
            </MenuList>
          </Menu>
          {selectedCategory && (
            <>
              <Box mt={12}>
                <Heading mb={6}>2. Choose Properties</Heading>
                {properties.map((property) => (
                  <Box key={property._id}>
                    <Checkbox
                      onChange={() => {
                        handlePropertyClick(property._id)
                      }}
                    >
                      {property.title}
                    </Checkbox>
                  </Box>
                ))}
              </Box>
              <Box mt={12}>
                <Heading>3. Add Keywords</Heading>
                <Box my={6}>Type keywords (separated by commas)</Box>
                <Input
                  onChange={(e) => {
                    handleKeywordsChange(e.target.value)
                  }}
                  placeholder="artificial intelligence, programming"
                />
                <Button colorScheme="blue" onClick={handleSubmit} mt={8}>
                  Generate Content
                </Button>
              </Box>
            </>
          )}
          {isContentLoading && (
            <Loader label="Your content is being generated. It might take up to 1 minute." />
          )}
          {contentLines && !isContentLoading && (
            <Box my={8}>
              <Box bg="gray.200" p={8}>
                {contentLines.map((line) => (
                  <Box key={line} mb={3}>
                    {line}
                  </Box>
                ))}
                <Flex justify="center" gap={3}>
                  <Button colorScheme="blue" mt={4} onClick={handleSave}>
                    Save
                  </Button>
                  <Link to={`/contents/${contentId}/publish`}>
                    <Button colorScheme="blue" mt={4}>
                      Publish
                    </Button>
                  </Link>
                </Flex>
              </Box>
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default Create
